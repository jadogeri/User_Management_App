/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 28-DEC-2025
 * @description class representing Auth entity;
 */

import { Entity, PrimaryGeneratedColumn, OneToOne, Column, JoinColumn } from "typeorm";
import User from "./user.entity";
import { AuthType } from "../types/auth.type";
import { Audit } from "../models/audit.model";
@Entity()
export class Auth extends Audit implements AuthType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true, nullable: true })
    refreshToken: string;

    @OneToOne(()=> User, { onDelete: 'CASCADE', cascade: true })
    @JoinColumn() 
    user: User;

}

