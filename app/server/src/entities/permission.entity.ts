import { Entity, PrimaryGeneratedColumn, Column, ManyToMany , Index, Unique } from 'typeorm';
import Role from './role.entity';
import { IsEnum } from 'class-validator';
import { PermissionType } from '../types/permission.type';
import { Action, RBACPermission, Resource } from '../types/rbac.type';

@Entity()
@Unique(["action", "resource"])
export class Permission implements PermissionType{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
  
  @Column({
    type: "simple-enum",
    nullable: false,
    enum: Resource,
    default: Resource.ALL,
  })
  @IsEnum(Resource, { message: 'resource must be a valid enum value (user, product, order, system, *).' })
  resource: Resource;

  @Column({
    type: "simple-enum",
    nullable: false,
    enum: Action,
    default: Action.READ,
  })
  @IsEnum(Action, { message: 'action must be a valid enum value (create, read, update, delete, manage, *).' })
  action: Action;

  rbacPermission(): RBACPermission {
    return `${this.resource}:${this.action}`;
  }
}

