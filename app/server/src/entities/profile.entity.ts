// src/entities/User.ts
import { Entity,  Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import { Min, IsInt, IsString } from 'class-validator';
import { Audit } from "../models/audit.model";
import { ProfileType } from "../types/profile.type";
import User from "./user.entity";

@Entity()
export class Profile extends Audit implements ProfileType {

  @PrimaryGeneratedColumn() // SQLite uses auto-increment integers by default
  id: number;

  @Column({type: "varchar", length: 40, nullable: true, unique: false })
  @IsString()
  firstName?: string;

  @Column({type: "varchar", length: 40, nullable: true, unique: false })
  @IsString()
  lastName?: string;

  @Column({type: "varchar", length: 40, nullable: true, unique: true })
  @IsString()
  displayName: string;

  @Column({type: "varchar", length: 100, nullable: true, unique: false })
  @IsString()
  bio?: string;

  @Column({type: "varchar", length: 100, nullable: true, unique: true })
  @IsString()
  avatarUrl: string;

  @Column({type: "integer",default: 0, nullable: false, unsigned: true})
  @IsInt() // Optional: ensures it's an integer
  @Min(0, { message: 'Quantity cannot be a negative number' })
  age: number;

  @OneToOne(()=> User, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn() 
  user: User;

}

export default Profile;



