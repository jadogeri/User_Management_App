 /**
 * @version 1.0
 * @since 29-DEC-2025
 * @description class representing Role entity;
 */

import { Entity, PrimaryGeneratedColumn, Column, Check, JoinTable, ManyToMany } from 'typeorm';
import { RoleNamesEnum } from '../types/role-names.type';
import User from './user.entity';
import { Permission } from './permission.entity';
import { PermissionNamesEnum } from '../types/permission-names.type';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  @Check(`"name" IN ('ADMIN', 'USER', 'VIEWER', 'EDITOR')`)
  id: number;

  @Column({
    type: 'simple-enum',    
    unique: true,
    length: 20,
    nullable: false,
    enum: RoleNamesEnum,
    default: RoleNamesEnum.USER,
  })
  name: RoleNamesEnum;  

   @Column({
    type: 'varchar',    
    unique: true,
    length: 40,
    nullable: false    
  })  
  description: string;  

  @ManyToMany(() => Permission, permission => permission.roles,{ cascade: true })
  @JoinTable({
    name: 'role_permissions', // Custom name for the join table
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @ManyToMany(() => User, user => user.roles)
  users: User[];

  /**
   * Check if the role has a specific permission.
   * @param permission The permission to check.
   * @returns boolean
   */
  hasRequiredPermission(scopes: string[]): boolean {

    let permissionGranted: boolean = false;

    for (let permission of this.permissions) {
      permissionGranted = scopes.includes(PermissionNamesEnum[permission.name]);
    }   

    return permissionGranted;
  }

}

export default Role;





/**
 * 
 // Create a Set to store unique strings
const uniqueStrings: Set<string> = new Set();

// Add elements to the Set
uniqueStrings.add("apple"); // Added
uniqueStrings.add("banana"); // Added
uniqueStrings.add("apple"); // Ignored (duplicate)

console.log(uniqueStrings);
// Output: Set(2) { 'apple', 'banana' }

// Convert the Set back to an Array using the spread operator or Array.from()
const uniqueArray: string[] = [...uniqueStrings];
console.log(uniqueArray);
// Output: [ 'apple', 'banana' ]

 */