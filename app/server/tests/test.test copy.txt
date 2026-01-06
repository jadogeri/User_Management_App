import { DataSource } from "typeorm";
import { User } from "../src/entities/user.entity";
import { SQLiteTestContainer } from "./__configurations__/SQLiteTestContainer";
import request from "supertest"
import { buildApp } from "../src/app";
import { bindDataSource, iocContainer } from "../src/configs/ioc.config";
import path from "path";
import PermissionSeeder from "../src/database/seeds/permission.seed";
import RoleSeeder from "../src/database/seeds/role.seed";
import StatusSeeder from "../src/database/seeds/status.seed";
import { TYPES } from "../src/types/binding.type";
import { Role } from "../src/entities/role.entity";
describe("User Entity with MariaDB Testcontainer", () => {

  const sqliteContainer = new SQLiteTestContainer();
  let dataSource: DataSource ;
  const app = buildApp();

  beforeAll(async () => {
    iocContainer.snapshot(); // Saves current state before rebinding


    await sqliteContainer.startTestConatiner();
    dataSource = sqliteContainer.getDataSource();


  // 2. Clear old bindings and force-inject the new instance
  if (iocContainer.isBound(TYPES.DataSource)) {
    (await iocContainer.rebind<DataSource>(TYPES.DataSource)).toConstantValue(dataSource);
  } else {
    iocContainer.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
  }
    // Run seeders

    await sqliteContainer.runSeeders();

  }, 6000); // Generous timeout for image pull

  afterAll(async () => {
      iocContainer.restore(); // Restores the previous state before the last snapshot

    await sqliteContainer.stopTestConatiner();
        // 2. Delete the local file (Manual cleanup for the file)
    const fs = require('fs');
    const localDbPath = path.join(process.cwd(), './tests/__database__/testdb.sqlite');
    if (fs.existsSync(localDbPath)) {
      fs.unlinkSync(localDbPath);
    }
  });

  it("should save user with JSON and enums successfully", async () => {
    const userRepository = dataSource.getRepository(User);
    
    const user = userRepository.create({
      fullname: "Test User",
      username: "testuser",
      email: "test@example.com",
      password: "password",
      isEnabled: true,
      failedLogins: 0,
    });

    const savedUser = await userRepository.save(user);
    console.log("Saved User:", savedUser);
    expect(savedUser.id).toBeDefined();
    expect(savedUser.password).toBe("password");
  });

    it('should create a new user via TSOA endpoint', async () => {
    const payload = {
      fullname: "Supertest User",
      username: "supertest_user",
      email: "tester@example.com",
      password: "@securePassword123",
      phone:"12412348901",
      
    };

    const response = await request(app)
      .post('/auths/register') // The route defined in your @Route('/users') decorator
      .send(payload)
      .set('Accept', 'application/json');

      console.log("Response Body:", response.body);

    expect(response.status).toBe(201);
    expect(response.body.username).toBe(payload.username);
    expect(response.body.id).toBeDefined();

    const roleRepository = dataSource.getRepository(Role);
    const roles = await roleRepository.find();
    console.log("Available Roles in DB:", roles);
    expect(roles.length).toBeGreaterThan(0);
  });

  it('should return 422 for invalid tsoa validation', async () => {
    // tsoa automatically returns 422 for missing fields/validation errors
    const response = await request(app)
      .post('/users')
      .send({ fullname: "Incomplete User" });
      console.log("Response Body for Invalid Request:", response.body);

    expect(response.status).toBe(404);
  });
});
