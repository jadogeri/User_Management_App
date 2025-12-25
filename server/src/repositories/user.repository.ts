import { DataSource, Repository as BaseRepository } from "typeorm";
import { Repository } from "../decorators";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { inject } from "inversify";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/user.entity";


@Repository()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
    

    constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
        //console.log("Registered Entities:", dataSource.entityMetadatas.map(m => m.name));
        super(User, dataSource.createEntityManager());
        
    }
    findActiveUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }


    async findByEmail(email: string): Promise<any> {                
        
        return this.findOne({ where: { email } });
    }



    async findByUsername(username: string): Promise<any> {
        return this.findOne({ where: { username: username } });
    }


    async findById(id: any) {
        return {message: "found by id: " + id};
    }
}


