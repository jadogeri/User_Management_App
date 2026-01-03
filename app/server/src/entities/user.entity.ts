// src/entities/User.ts
import { Entity,  Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Min, IsInt, IsString } from 'class-validator';
import { Audit } from "../models/audit.model";
import { UserType } from "../types/user.type";
import Role from "./role.entity";
import Status from "./status.entity";
import { SuspensionDetails } from "../types/suspension-details.type";
import { RBACPermission } from "../types/rbac.type";

@Entity()
export class User extends Audit implements UserType {
  @PrimaryGeneratedColumn() // SQLite uses auto-increment integers by default
  id: number;

  @Column({type: "varchar", length: 40, nullable: false, unique: false })
  @IsString()
  fullname: string;

  @Column({type: "varchar", length: 40, nullable: false, unique: true })
  @IsString()
  username: string;

  @Column()
  @IsString()
  email: string;

  @Column({type: "integer",default: 0, nullable: false, unsigned: true})
  @IsInt() // Optional: ensures it's an integer
  @Min(0, { message: 'Quantity cannot be a negative number' })
  age: number;

  @Column({type: "varchar", length: 15, nullable: true })
  @IsString()
  phone: string;

  @Column({type: "varchar", length: 100, nullable: false, //select: false 

   })
  @IsString()
  password: string;

  @Column({type: "integer", default: 0, nullable: false, unsigned: true })
  @IsInt()
  failedLogins: number;

  @Column({type: "boolean", default: true, nullable: false })
  @IsInt()
  isEnabled: boolean; 

    @Column({
    type: "json", 
    nullable: true,
    default: null
  })
  suspension: SuspensionDetails | null;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status; // This will hold the Status object when loaded

  // ManyToMany relationship with Role, managed by a join table
  @ManyToMany(() => Role, role => role.users,{ cascade: true })
  @JoinTable({
    name: 'user_roles', // Custom name for the join table
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    
  })
  roles: Role[];

  getPermissionNames(): Array<RBACPermission> {

    const uniquePermissions: Set<RBACPermission> = new Set();

    for (let role of this.roles) {
      for(let permission of role.permissions)
        uniquePermissions.add(permission.rbacPermission());
    }   
    console.log("unique permissions: ", uniquePermissions);
    const permissionList: RBACPermission[] = [...uniquePermissions];

    return permissionList;
  }


}

export default User;



