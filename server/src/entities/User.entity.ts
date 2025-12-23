// src/entities/User.ts
import { Entity,  Column, ObjectIdColumn, ObjectId, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Min, IsInt, IsString, IsDate } from 'class-validator';
import { UserType as IUser } from "../types/userType.type";

// Assuming a MongoDB setup from earlier context
@Entity()
export class User implements IUser{
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({type: "varchar", length: 40, nullable: false, unique: true })
  @IsString()
  fullname: string;

  @Column({type: "varchar", length: 40, nullable: false, unique: true })
  @IsString()
  username: string;

  @Column()
  @IsString()
  email: string;

  @Column({type: "number",default: 0, nullable: false, unsigned: true})
  @IsInt() // Optional: ensures it's an integer
  @Min(0, { message: 'Quantity cannot be a negative number' })
  age: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date
}