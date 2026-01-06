// tests/test-environment.ts
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
import { DatabaseServiceInterface } from '../../src/interfaces/database-service.interface';

const options: DataSourceOptions & SeederOptions = {
  database: "./tests/__database__/testdb.sqlite", // Even in a container, in-memory is fastest for tests
  synchronize: true,
   type: "better-sqlite3",
   //logging: true, // Set to true to log generated SQL queries to the console
   entities: [User, Role, Status, Auth, Permission, Profile, Contact], // List your entity classes or use a glob pattern
   migrations: ["src/migrations/**/*.ts"],
   subscribers: [],
   // These belong to SeederOptions
   seeds: [ 'src/database/seeds/**/*{.ts,.js}'],
   //   StatusSeeder,     // Runs 1st
   //   PermissionSeeder, // Runs 2nd
   //   RoleSeeder,       // Runs 3rd
   //  UserSeeder,       // Runs 4th


  factories: ['src/database/factories/**/*{.ts,.js}'],
};

const SQLITE_IMAGE = "keinos/sqlite3:latest"; // Use a specific version in production code

// Define the container (e.g., in a test utility file)

export class SQLiteTestContainer implements DatabaseServiceInterface{

  private sqliteContainer: StartedTestContainer | null = null;
  private dataSource: DataSource;

  async connect(): Promise<void> {
    console.log("Starting SQLite Test Container...");
    const details = await this.createSqliteContainer();
    this.sqliteContainer = details.container;
  }


 private readonly createSqliteContainer = async () => {
  const container : StartedTestContainer= await new GenericContainer(SQLITE_IMAGE)
    .withCommand(["tail", "-f", "/dev/null"]) // Keep the container alive
    .start();


  // Return connection details or a connection string
  return { container };
};

  public startTestConatiner  = async ()=>{
    console.log("Starting SQLite Test Container...");
    await this.connect();

    this.dataSource = new DataSource(options);

    this.dataSource = await this.dataSource.initialize();

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

  public runSeeders = async (dataSource: DataSource) => {

    console.log("Running Seeders...");

  const statusSeeder = new StatusSeeder();
  await statusSeeder.run(dataSource);

  const roleSeeder = new RoleSeeder();
  await roleSeeder.run(dataSource);

  const permissionSeeder = new PermissionSeeder();
  await permissionSeeder.run(dataSource);

  console.log("Seeders completed.");

  }
}

