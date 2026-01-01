 /**
 * @version 1.0
 * @since 29-DEC-2025
 * @description class representing Role entity;
 */

import { Entity, PrimaryGeneratedColumn, Column, Check, JoinTable, ManyToMany } from 'typeorm';
import { RoleNamesEnum } from '../types/role-names.type';
import User from './user.entity';
import { Permission } from './permission.entity';
import { Group } from './group.entity';

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

  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable({
    name: 'role_permissions', // Custom name for the join table
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @ManyToMany(() => User, user => user.roles)
  users: User[];

  @ManyToMany(() => Group, group => group.roles)
  groups: Group[];

}

export default Role;





