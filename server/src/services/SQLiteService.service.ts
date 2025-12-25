import { injectable } from "inversify";
import { DataSource } from "typeorm";
import { IDatabaseService } from "../interfaces/IDatabaseService.interface";
import { User } from "../entities/User.entity";

@injectable()
export class SQLiteService implements IDatabaseService{
  
  private readonly dataSource: DataSource;
    
  constructor() {
    this.dataSource = new DataSource({
      type: "better-sqlite3",
      database: "user-management-app.sqlite", // Name of the SQLite database file
      synchronize: true, // Automatically creates database schema. Use migrations in production.
      logging: true, // Set to true to log generated SQL queries to the console
      entities: [User], // List your entity classes or use a glob pattern
      migrations: [],
      subscribers: [],
    });
  }
  
  public async connect(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      console.log("🛢️ SQLite3 Database connected and DataSource bound.");
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}