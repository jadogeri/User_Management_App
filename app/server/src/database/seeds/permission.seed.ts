// src/database/seeds/RoleSeeder.ts
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Permission } from '../../entities/permission.entity';
import { permissions} from '../../data/permission.data';

export default class PermissionSeeder implements Seeder {
/**
   * Checks for the existence of predefined status entities in the database 
   * and saves them if they do not already exist. 
   * 
   * @param dataSource - The data source used to access the repository.
   * @returns A promise that resolves to void.
   * @throws Any errors thrown by the repository methods during execution.
   */
  public async run(dataSource: DataSource): Promise<void> {
    const permissionRepository = dataSource.getRepository(Permission);

    for (const permission of permissions) {
      // Check if the role already exists by ID
      // const existingPermission = await permissionRepository.findOneBy({ id: permission.id });
      
      // if (!existingPermission) {
      //   await permissionRepository.upsert(permissions, {
      //       conflictPaths: ["action", "resource","id"], // Columns that trigger the conflict
      //       upsertType: "on-conflict-do-update",
      //       overwriteCondition: { where: { description: () => "EXCLUDED.description" } }, // 👈 ONLY update description, keep ID and Foreign Keys safe
      //   });
      // }

          // Use upsert for the Role itself to prevent ID conflicts
    await permissionRepository.upsert(
      permission,
      ["id"]
    );

    // Re-fetch the role to establish relations safely
    const savedPermission = await permissionRepository.findOneBy({ id: permission.id });
    if (savedPermission) {
      await permissionRepository.save(savedPermission); // TypeORM handles role_permission automatically
    }
    }
  }
}
