// src/config/typeorm.config.ts
  import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Status } from '../entities/status.entity';
import { Auth } from '../entities/auth.entity';
import { NodeEnvironment } from '../types/node-environment.type';
import { Permission } from '../entities/permission.entity';
import Profile from '../entities/profile.entity';

const env : NodeEnvironment = process.env.NODE_ENV || 'development';
console.log(`Current Environment: ${env}`);

const options: DataSourceOptions & SeederOptions = {
  type: "better-sqlite3",
  database: "user-management-app.sqlite", // Name of the SQLite database file
  synchronize: process.env.NODE_ENV === env, // Automatically creates database schema in development. Use migrations in production.
  //logging: true, // Set to true to log generated SQL queries to the console
  entities: [User, Role, Status, Auth, Permission, Profile], // List your entity classes or use a glob pattern
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
  // These belong to SeederOptions
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

export const AppDataSource = new DataSource(options);
