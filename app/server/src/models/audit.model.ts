import { IsDate } from "class-validator";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AuditType } from "../types/audit.type";

export class Audit implements AuditType {
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date
}