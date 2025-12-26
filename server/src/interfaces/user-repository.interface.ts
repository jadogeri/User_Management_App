import { Repository } from "typeorm/repository/Repository";
import { User } from "../entities/user.entity";

export interface ICustomUserRepositoryMethods {
    findActiveUsers(): Promise<User[]>;
    findByUsername(name: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: any): Promise<User | null>;
}

export interface IUserRepository extends Repository<User>, ICustomUserRepositoryMethods {};