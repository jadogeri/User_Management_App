import { IsDate } from "class-validator";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Audit {
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date
}