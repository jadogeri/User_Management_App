// Role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Check } from 'typeorm';
import { RoleEnum } from '../types/role.type';

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

}

export default Role;



