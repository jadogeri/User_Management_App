import { Repository } from "typeorm/repository/Repository";
import { Auth } from "../entities/auth.entity";

export interface CustomAuthRepositoryMethodsInterface {
  login(): Promise<any>;
  logout(): Promise<any>;
  forgot(): Promise<any>;
  reset(): Promise<any>;
  refresh(): Promise<any>;
}

export interface AuthRepositoryInterface extends Repository<Auth>, CustomAuthRepositoryMethodsInterface {};