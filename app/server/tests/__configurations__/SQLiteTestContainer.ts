// tests/test-environment.ts
import 'reflect-metadata'; // Required by TypeORM
import { GenericContainer, StartedTestContainer } from "testcontainers";
import { DataSource } from "typeorm";
import { Auth } from '../../src/entities/auth.entity';
import Contact from '../../src/entities/contact.entity';
import { Permission } from '../../src/entities/permission.entity';
import Profile from '../../src/entities/profile.entity';
import Role from '../../src/entities/role.entity';
import Status from '../../src/entities/status.entity';
import User from '../../src/entities/user.entity';



const SQLITE_IMAGE = "keinos/sqlite3:latest"; // Use a specific version in production code

// Define the container (e.g., in a test utility file)

export class SQLiteTestContainer {
  private sqliteContainer: StartedTestContainer | null = null;
  private dataSource: DataSource;

 private createSqliteContainer = async () => {
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


    this.dataSource = new DataSource({
      type: "sqlite",
      database: "./tests/__database__/testdb.sqlite", // Even in a container, in-memory is fastest for tests
      entities: [User, Role, Status, Permission, Profile, Contact, Auth],
      synchronize: true,
    });

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

}

