// src/entities/User.ts
import {
  Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany,
  UpdateDateColumn, ValueTransformer
} from "typeorm";
import {IsDate, IsInt, IsString} from 'class-validator';
import { Audit } from "../models/audit.model";
import { UserType } from "../types/user.type";
import Role from "./role.entity";
import Status from "./status.entity";
import { SuspensionDetails } from "../types/suspension-details.type";
import { RBACPermission } from "../types/rbac.type";
import { Contact } from "./contact.entity";
import moment from 'moment';
import {Transform} from "node:stream";

export const MomentDateTransformer: ValueTransformer = {
  // Before saving to DB: Keep it as a Date object or ISO string for the database
  to: (value: any) => (value ? moment(value).toDate() : value),

  // After retrieving from DB: Format it to the desired string type
  from: (value: Date) => (value ? moment(value).format("DD-MM-YYYY") : null),
};

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

  @Column({
    type: "datetime",
    transformer: MomentDateTransformer,
    nullable: true, default: null
  })
  @IsDate()
  lastLogin: Date

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

  // A user can have multiple contacts (one-to-many)
  @OneToMany(() => Contact, (contact) => contact.user, { cascade: true })
  contacts: Contact[];

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



