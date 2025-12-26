// Role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RoleEnum } from '../types/role.type';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    unique: true,
  })
  name: RoleEnum;
}
