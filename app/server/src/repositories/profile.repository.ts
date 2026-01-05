import { DataSource, Repository as BaseRepository } from "typeorm";
import { Repository } from "../decorators";
import { inject } from "inversify";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/user.entity";
import { Auth } from "../entities/auth.entity";
import { AuthRepositoryInterface } from "../interfaces/auth-repository.interface";
import { ProfileRepositoryInterface } from "../interfaces/profile-repository.interface";
import { Profile } from "../entities/profile.entity";
    
@Repository()
export class ProfileRepository extends BaseRepository<Profile> implements ProfileRepositoryInterface {
    

    constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
        //console.log("Registered Entities:", dataSource.entityMetadatas.map(m => m.name));
        super(Profile, dataSource.createEntityManager());
        
    }
    getProfile(): any {
        return {message: "Get profile endpoint from repository" };
    }
    createProfile(): any {
        return {message: "Create profile endpoint from repository" };
    }
    updateProfile(): any {
        return {message: "Update profile endpoint from repository" };
    }
    replaceProfile(): any {
        return {message: "Replace profile endpoint from repository" };
    }
    deleteProfile(): any {
        return {message: "Delete profile endpoint from repository" };
    }  
    
}


