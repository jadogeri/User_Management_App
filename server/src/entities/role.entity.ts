// Role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Check, OneToMany } from 'typeorm';
import { RoleEnum } from '../types/role.type';
import User from './user.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  @Check(`"name" IN ('ADMIN', 'USER')`)
  id: number;

  @Column({
    type: 'simple-enum',    
    unique: true,
    length: 20,
    default: RoleEnum.USER,
  })
  name: RoleEnum;  

  @OneToMany(() => User, (user) => user.role)
  users: User[];

}

export default Role;



