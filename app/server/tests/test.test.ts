import { DataSource } from "typeorm";
import { User } from "../src/entities/user.entity"; // Note: Use  for ESM compatibility
import { SQLiteTestContainer } from "./__configurations__/SQLiteTestContainer";
import request from "supertest";
import { buildApp } from "../src/app";
import { bindDataSource, iocContainer } from "../src/configs/ioc.config";
import path from "path";
import fs from "fs";
import { TYPES } from "../src/types/binding.type";
import { Role } from "../src/entities/role.entity";
import { AuthService } from "../src/services/auth.service";
import { Application } from "express";
import { AuthRepository } from "../src/repositories/auth.repository";
import { AuthRepositoryInterface } from "../src/interfaces/auth-repository.interface";
import Status from "../src/entities/status.entity";
import { Permission } from "../src/entities/permission.entity";
import Contact from "../src/entities/contact.entity";
import Profile from "../src/entities/profile.entity";
import { Auth } from "../src/entities/auth.entity";

describe("TSOA Integration with SQLite Testcontainer", () => {
  const sqliteContainer = new SQLiteTestContainer();
  let dataSource: DataSource;
  let app: Application ;

  beforeAll(async () => {
    // 1. Snapshot the container to ensure cleanup after tests
    iocContainer.snapshot();

    // 2. Start container and get the initialized DataSource
    await sqliteContainer.startTestConatiner();
    dataSource = sqliteContainer.getDataSource();
    if (!dataSource.isInitialized) {
      console.log("Initializing Test DataSource... not yet initialized.");
      dataSource.setOptions({
        entities: [User, Role, Status, Permission, Contact, Profile, Auth],
        migrations: [path.join(__dirname, '../src/migrations/*.{ts,js}')],
      });
      dataSource = await dataSource.initialize();
    }
    console.log("Test DataSource initialized:", dataSource.isInitialized);
    
    // 3. REBIND (Sync): Inversify rebind is synchronous
    // We use toConstantValue to force the app to use our live test instance

    // 4. Seed the database
    await bindDataSource(dataSource);

    // if (iocContainer.isBound(TYPES.AuthServiceInterface)) {
    // await iocContainer.unbind(TYPES.AuthServiceInterface);
    // iocContainer.bind(TYPES.AuthServiceInterface).to(AuthService).inSingletonScope();
    //iocContainer.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
  //}
      app = buildApp();

    // Ensure all tables (Role, Status, etc.) are populated before tests run
    await sqliteContainer.runSeeders(dataSource);

    
  }, 120000); // 2026 Recommended: 60s timeout for container pull + seeding

  afterAll(async () => {
    // Revert container to production state
   iocContainer.restore();

    await sqliteContainer.stopTestConatiner();
    
    // Clean up local sqlite file
    const localDbPath = path.join(process.cwd(), './tests/__database__/testdb.sqlite');
    if (fs.existsSync(localDbPath)) {
      fs.unlinkSync(localDbPath);
    }
  });

  it('should create a new user via TSOA endpoint', async () => {
    const payload = {
      fullname: "Supertest User",
      username: "supertest_user",
      email: "tester@example.com",
      password: "@securePassword123",
      phone: "12412348901",
    };

    const response = await request(app)
      .post('/auths/register')
      .send(payload)
      .set('Accept', 'application/json');

    // If roles were seeded correctly, status will be 201
    expect(response.status).toBe(201);
    expect(response.body.username).toBe(payload.username);
    
    // Verify Role persistence in Test DB
    const roleRepository = dataSource.getRepository(Role);
    const roles = await roleRepository.find();
    expect(roles.length).toBeGreaterThan(0);
  });
});
