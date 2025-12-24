// src/entities/User.ts
import { Entity,  Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { Min, IsInt, IsString, IsDate } from 'class-validator';

// Assuming a MongoDB setup from earlier context
@Entity()
export class SQLUser {
  @PrimaryGeneratedColumn() // SQLite uses auto-increment integers by default
  id: number;

  @Column({type: "varchar", length: 40, nullable: false, unique: true })
  @IsString()
  fullname: string;

  @Column({type: "varchar", length: 40, nullable: false, unique: true })
  @IsString()
  username: string;

  @Column()
  @IsString()
  email: string;

  // @Column({type: "integer",default: 0, nullable: false, unsigned: true})
  // @IsInt() // Optional: ensures it's an integer
  // @Min(0, { message: 'Quantity cannot be a negative number' })
  // age: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date
}