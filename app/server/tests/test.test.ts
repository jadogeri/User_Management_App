import { DataSource } from "typeorm";
import { User } from "../src/entities/user.entity";
import { SQLiteTestContainer } from "./__configurations__/SQLiteTestContainer";

describe("User Entity with MariaDB Testcontainer", () => {

  const sqliteContainer = new SQLiteTestContainer();
  let dataSource: DataSource ;

  beforeAll(async () => {

    await sqliteContainer.startTestConatiner();
    dataSource = sqliteContainer.getDataSource();
  }, 120000); // Generous timeout for image pull

  afterAll(async () => {
    await sqliteContainer.stopTestConatiner();
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
});
