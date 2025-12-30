import { Repository } from "typeorm/repository/Repository";
import User from "../entities/user.entity";

export interface CustomUserRepositoryMethodsInterface {
  getOne(): Promise<any>;
  getAll(): Promise<any>;
  modify(): Promise<any>;
  reactivate(): Promise<any>;
  deactivate( ): Promise<any> ;
}

export interface UserRepositoryInterface extends Repository<User>, CustomUserRepositoryMethodsInterface {};