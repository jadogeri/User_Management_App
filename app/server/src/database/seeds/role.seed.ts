// src/database/seeds/RoleSeeder.ts
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../../entities/role.entity';
import { AdminRole, UserRole, ViewerRole, EditorRole } from '../../data/role.data';
export default class RoleSeeder implements Seeder {
/**
   * Checks for the existence of predefined status entities in the database 
   * and saves them if they do not already exist. 
   * 
   * @param dataSource - The data source used to access the repository.
   * @returns A promise that resolves to void.
   * @throws Any errors thrown by the repository methods during execution.
   */
  public async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);
    const roles = [AdminRole, UserRole, ViewerRole, EditorRole];

    for (const role of roles) {
      // // Check if the role already exists by ID
      // const existingRole = await roleRepository.findOneBy({ id: role.id });
      
      // if (!existingRole) {
      //   await roleRepository.upsert(role, ["id"]);
      // }
    // Use upsert for the Role itself to prevent ID conflicts
    await roleRepository.upsert(
      role,
      ["id"]
    );

    // Re-fetch the role to establish relations safely
    const savedRole = await roleRepository.findOneBy({ id: role.id });
    if (savedRole) {
      savedRole.permissions = role.permissions;
      await roleRepository.save(savedRole); // TypeORM handles role_permission automatically
    }
    }
  }
}
