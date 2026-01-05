import { Repository } from "typeorm/repository/Repository";
import Contact from "../entities/contact.entity";

export interface CustomContactRepositoryMethodsInterface {

  getContact(): Promise<any>;

  createContact(): Promise<any>;
  
  updateContact(): Promise<any>;

  replaceContact(): Promise<any> ;

  deleteContact(): Promise<any> ;
  
}

export interface ContactRepositoryInterface extends Repository<Contact>, CustomContactRepositoryMethodsInterface {};