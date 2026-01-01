import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import Role from './role.entity';
import { PermissionNamesEnum } from '../types/permission-names.type';
import { IsEnum } from 'class-validator';
import { PermissionType } from '../types/permission.type';

@Entity()
export class Permission implements PermissionType{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'simple-enum',  
    enum: PermissionNamesEnum,  
    unique: true,
    //length: 20,
  })
  @IsEnum(PermissionNamesEnum, { message: 'name must be a valid enum value (DELETE_USER, READ_USER).' })
  name: PermissionNamesEnum;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
