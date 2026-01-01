 /**
 * @version 1.0
 * @since 29-DEC-2025
 * @description class representing Status entity;
 */
import { Entity, PrimaryColumn, Column, Check, OneToMany } from 'typeorm';
import { StatusEnum } from '../types/status.type';
import User from './user.entity';

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

  @OneToMany(() => User, (user) => user.status)
  users: User[];

}

export default Status;