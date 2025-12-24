import { DataSource, Repository as BaseRepository } from "typeorm";
import { Repository } from "../decorators";
import { IUserRepository } from "../interfaces/IUserRepository.interface";
import { inject } from "inversify";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/MongoUser.entity";
import { SQLUser } from "../entities/SqliteUser.entity";


@Repository()
export class UserRepository extends BaseRepository<SQLUser> implements IUserRepository {
    

    constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
        //console.log("Registered Entities:", dataSource.entityMetadatas.map(m => m.name));
        super(SQLUser, dataSource.createEntityManager());
        
    }
    findActiveUsers(): Promise<SQLUser[]> {
        throw new Error("Method not implemented.");
    }


    async findByEmail(email: string): Promise<any> {                
        
        return {message: "found by email: " + email};
    }



    async findByUsername(name: string): Promise<any> {
        return {message: "found by username: " + name};
    }


    async findById(id: any) {
        return {message: "found by id: " + id};
    }
}


