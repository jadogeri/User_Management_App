import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import Role from './role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., 'edit_posts'

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
