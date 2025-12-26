// src/entities/User.ts
import { Entity,  Column, PrimaryGeneratedColumn } from "typeorm";
import { Min, IsInt, IsString } from 'class-validator';
import { Audit } from "../models/audit.model";
import { UserType } from "../types/user.type";

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

  @Column({type: "varchar", length: 100, nullable: false })
  @IsString()
  password: string;

  @Column({type: "integer", default: 0, nullable: false, unsigned: true })
  @IsInt()
  failedLogins: number;

  @Column({type: "boolean", default: true, nullable: false })
  @IsInt()
  isEnabled: boolean; 
}

export default User;