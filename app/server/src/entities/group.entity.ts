// src/entities/Group.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import User from './user.entity';
import Role from './role.entity';


@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, user => user.groups)
  users: User[];

  // Assign roles to the group, which are inherited by all group members
  @ManyToMany(() => Role, role => role.groups)
  @JoinTable({
    name: 'group_roles',
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
