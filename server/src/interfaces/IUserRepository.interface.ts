import { Repository } from "typeorm/repository/Repository";
//import { User } from "../entities/MongoUser.entity";
import { User } from "../entities/User.entity";

export interface ICustomUserRepositoryMethods {
    findActiveUsers(): Promise<User[]>;
    findByUsername(name: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findById(id: any): Promise<any>;
}

export interface IUserRepository extends Repository<User>, ICustomUserRepositoryMethods {};