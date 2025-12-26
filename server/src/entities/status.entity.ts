// status.entity.ts
import { Entity, PrimaryColumn, Column, Check } from 'typeorm';
import { StatusEnum } from '../types/status.type';

@Entity('status') // Ensure table name matches what you use in the migration
export class Status {
  @PrimaryColumn()
  @Check(`"name" IN ('ENABLED', 'LOCKED', 'DISABLED')`)
  id: number;

  @Column({
    type: 'simple-enum',
    unique: true,
    default: StatusEnum.ENABLED,
  })
  name: StatusEnum;

}

export default Status;