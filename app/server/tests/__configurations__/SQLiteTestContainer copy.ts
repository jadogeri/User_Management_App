// tests/test-environment.ts
import 'reflect-metadata'; // Required by TypeORM
import { GenericContainer, StartedTestContainer } from "testcontainers";
import { DataSource, DataSourceOptions } from "typeorm";
import { Auth } from '../../src/entities/auth.entity';
import Contact from '../../src/entities/contact.entity';
import { Permission } from '../../src/entities/permission.entity';
import Profile from '../../src/entities/profile.entity';
import Role from '../../src/entities/role.entity';
import Status from '../../src/entities/status.entity';
import User from '../../src/entities/user.entity';
import {SeederOptions } from 'typeorm-extension';
import PermissionSeeder from '../../src/database/seeds/permission.seed';
import RoleSeeder from '../../src/database/seeds/role.seed';
import StatusSeeder from '../../src/database/seeds/status.seed';

const options: DataSourceOptions & SeederOptions = {
  type: "sqlite",
  database: "./tests/__database__/testdb.sqlite", // Even in a container, in-memory is fastest for tests
  entities: [User, Role, Status, Permission, Profile, Contact, Auth],
  synchronize: true,
  // These belong to SeederOptions
 //seeds: ['./src/database/seeds/**/*{.ts,.js}'],


  factories: ['src/database/factories/**/*{.ts,.js}'],
};

const SQLITE_IMAGE = "keinos/sqlite3:latest"; // Use a specific version in production code

// Define the container (e.g., in a test utility file)

export class SQLiteTestContainer {
  private sqliteContainer: StartedTestContainer | null = null;
  private dataSource: DataSource;

 private readonly createSqliteContainer = async () => {
  const container : StartedTestContainer= await new GenericContainer(SQLITE_IMAGE)
    .withCommand(["tail", "-f", "/dev/null"]) // Keep the container alive
    .start();


  // Return connection details or a connection string
  return { container };
};

  public startTestConatiner  = async ()=>{
    console.log("Starting SQLite Test Container...");
    const details = await this.createSqliteContainer();
    this.sqliteContainer = details.container;


    this.dataSource = new DataSource(options);

    await this.dataSource.initialize();

  }

  public stopTestConatiner  = async ()=>{
    console.log("Stopping SQLite Test Container...");  
    if (this.dataSource.isInitialized){
      await this.dataSource.destroy()
    };
    if (this.sqliteContainer){ 
      await this.sqliteContainer.stop();
    };
  }

  public getDataSource =()=>{
    return this.dataSource;
  }

  public runSeeders = async () => {
    if (!this.dataSource.isInitialized) {
      throw new Error("DataSource is not initialized.");
    }

  const statusSeeder = new StatusSeeder();
  await statusSeeder.run(this.getDataSource());

  const roleSeeder = new RoleSeeder();
  await roleSeeder.run(this.getDataSource());

  const permissionSeeder = new PermissionSeeder();
  await permissionSeeder.run(this.getDataSource());

  }
}

