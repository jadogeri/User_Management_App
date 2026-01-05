import { DataSource, Repository as BaseRepository } from "typeorm";
import { Repository } from "../decorators";
import { inject } from "inversify";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/user.entity";
import { Auth } from "../entities/auth.entity";
import { AuthRepositoryInterface } from "../interfaces/auth-repository.interface";
import { ContactRepositoryInterface } from "../interfaces/contact-repository.interface";
import { Contact } from "../entities/contact.entity";
    
@Repository()
export class ContactRepository extends BaseRepository<Contact> implements ContactRepositoryInterface {
    

    constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
        //console.log("Registered Entities:", dataSource.entityMetadatas.map(m => m.name));
        super(Contact, dataSource.createEntityManager());
        
    }
    getContact(): any {
        return {message: "Get contact endpoint from repository" };
    }
    createContact(): any {
        return {message: "Create contact endpoint from repository" };
    }
    updateContact(): any {
        return {message: "Update contact endpoint from repository" };
    }
    replaceContact(): any {
        return {message: "Replace contact endpoint from repository" };
    }
    deleteContact(): any {
        return {message: "Delete contact endpoint from repository" };
    }  
    
}


