import { Repository } from "typeorm/repository/Repository";
import User from "../entities/user.entity";

export interface CustomUserRepositoryMethodsInterface {

  findActiveUsers(): Promise<User[]>;

  findByEmail(email: string): Promise<User | null>;
  
  findByUsername(username: string): Promise<User | null>;

  findById(id: number): Promise<User | null> ;
  
}

export interface UserRepositoryInterface extends Repository<User>, CustomUserRepositoryMethodsInterface {};