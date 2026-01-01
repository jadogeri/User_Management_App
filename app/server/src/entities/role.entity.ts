 /**
 * @version 1.0
 * @since 29-DEC-2025
 * @description class representing Role entity;
 */

import { Entity, PrimaryGeneratedColumn, Column, Check, OneToMany } from 'typeorm';
import { RoleNamesEnum } from '../types/role-names.type';
import User from './user.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  @Check(`"name" IN ('ADMIN', 'USER', 'VIEWER', 'EDITOR')`)
  id: number;

  @Column({
    type: 'simple-enum',    
    unique: true,
    length: 20,
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

  @OneToMany(() => User, (user) => user.role)
  users: User[];

}

export default Role;



