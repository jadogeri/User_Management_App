// src/db/seeds/main.seeder.ts
import { DataSource } from 'typeorm';
import  RoleSeeder from './role.seed';
import  PermissionSeeder  from './permission.seed';
import  StatusSeeder  from './status.seed';
import { Seeder, runSeeder } from 'typeorm-extension';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // Execute seeders in the specific order required by your database constraints
    await runSeeder(dataSource, StatusSeeder);
    await runSeeder(dataSource, RoleSeeder);
    await runSeeder(dataSource, PermissionSeeder);
  }
}
