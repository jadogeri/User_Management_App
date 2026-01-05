// src/entities/User.ts
import { Entity,  Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { IsInt, IsString } from 'class-validator';
import { Audit } from "../models/audit.model";
import Role from "./role.entity";
import Status from "./status.entity";
import { SuspensionDetails } from "../types/suspension-details.type";
import { RBACPermission } from "../types/rbac.type";
import { ContactType } from "../types/contact.type";
import { User } from "./user.entity";

@Entity()
export class Contact extends Audit implements ContactType {
  @PrimaryGeneratedColumn() // SQLite uses auto-increment integers by default
  id: number;

  @Column({type: "varchar", length: 40, nullable: false, unique: false })
  @IsString()
  fullname: string;

  @Column({type: "varchar", length: 40, nullable: true, default: null })
  @IsString()
  email: string;

  @Column({type: "varchar", length: 15, nullable: true, default: null })
  @IsString()
  phone: string;

  @Column({type: "varchar", length: 15, nullable: true, default: null })
  @IsString()
  fax: string;

  // Many contacts can belong to one user (many-to-one)
  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

}

export default Contact;



