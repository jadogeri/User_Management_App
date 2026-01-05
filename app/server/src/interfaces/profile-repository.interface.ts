import { Repository } from "typeorm/repository/Repository";
import Profile from "../entities/profile.entity";

export interface CustomProfileRepositoryMethodsInterface {

  getProfile(): Promise<any>;

  createProfile(): Promise<any>;
  
  updateProfile(): Promise<any>;

  replaceProfile(): Promise<any> ;

  deleteProfile(): Promise<any> ;
  
}

export interface ProfileRepositoryInterface extends Repository<Profile>, CustomProfileRepositoryMethodsInterface {};