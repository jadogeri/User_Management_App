import { Repository } from "typeorm/repository/Repository";
//import { User } from "../entities/MongoUser.entity";
import { SQLUser } from "../entities/SqliteUser.entity";

export interface ICustomUserRepositoryMethods {
    findActiveUsers(): Promise<SQLUser[]>;
    findByUsername(name: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findById(id: any): Promise<any>;
}

export interface IUserRepository extends Repository<SQLUser>, ICustomUserRepositoryMethods {};