// src/config/typeorm.config.ts
import { DataSource } from 'typeorm';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Status } from '../entities/status.entity';

// ... other necessary imports (dotenv, entities)

export const AppDataSource =  new DataSource({
      type: "better-sqlite3",
      database: "user-management-app.sqlite", // Name of the SQLite database file
      synchronize: false, // Automatically creates database schema. Use migrations in production.
      logging: true, // Set to true to log generated SQL queries to the console
      entities: [User, Role, Status], // List your entity classes or use a glob pattern
      migrations: ["src/migrations/**/*.ts"],
      subscribers: [],
    });


  