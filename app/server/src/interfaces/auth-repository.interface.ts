import { Repository } from "typeorm/repository/Repository";
import { Auth } from "../entities/auth.entity";
import User from "../entities/user.entity";

export interface CustomAuthRepositoryMethodsInterface {
  findActiveAuths(): Promise<Auth[]>;
  findByRefreshToken(refreshToken: string): Promise<Auth | null>;
  findByUser(user: User): Promise<Auth | null>;
  findByUserId(userId: number): Promise<Auth | null>;
  findByRefreshToken(token: string): Promise<Auth | null>;

}

export interface AuthRepositoryInterface extends Repository<Auth>, CustomAuthRepositoryMethodsInterface {};




