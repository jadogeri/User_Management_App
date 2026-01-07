// src/database/seeds/RoleSeeder.ts
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../../entities/role.entity';
import { AdminRole, UserRole, ViewerRole, EditorRole } from '../../data/role.data';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);
    const roles = [AdminRole, UserRole, ViewerRole, EditorRole];

    for (const roleData of roles) {
      // 1. Fetch the existing role with its current permissions
      const existingRole = await roleRepository.findOne({
        where: { id: roleData.id },
        relations: ['permissions']
      });

      // 2. Local Deduplication: Ensure roleData itself doesn't have duplicate permissions
      if (roleData.permissions) {
        const uniqueMap = new Map();
        roleData.permissions.forEach(p => uniqueMap.set(p.id, p));
        roleData.permissions = Array.from(uniqueMap.values());
      }

      if (!existingRole) {
        // 3. New Role: Save the role with its unique permissions
        await roleRepository.save(roleData);
      } else {
        // 4. Existing Role: Only add permissions that are not already in the database
        const existingPermIds = new Set(existingRole.permissions.map(p => p.id));
        const newPerms = (roleData.permissions || []).filter(p => !existingPermIds.has(p.id));

        if (newPerms.length > 0) {
          existingRole.permissions = [...existingRole.permissions, ...newPerms];
          await roleRepository.save(existingRole);
        }
      }
    }
  }
}
