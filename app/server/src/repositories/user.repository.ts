import { DataSource, Repository as BaseRepository } from "typeorm";
import { Repository } from "../decorators";
import { inject } from "inversify";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../interfaces/user-repository.interface";

@Repository()
export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
    

    constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
        //console.log("Registered Entities:", dataSource.entityMetadatas.map(m => m.name));
        super(User, dataSource.createEntityManager());
        
    }
    getOne(): any {
        return {message: "Get one user endpoint from repository" };
    }
    getAll(): any {
        return {message: "Get all users endpoint from repository" };
    }
    modify(): any {
        return {message: "Modify user endpoint from repository" };
    }
    reactivate(): any {
        return {message: "Reactivate user endpoint from repository" };
    }
    deactivate( ): any {
        return {message: "Deactivate user endpoint from repository" };
    }

}


