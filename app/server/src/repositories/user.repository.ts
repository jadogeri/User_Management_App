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

    findActiveUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }


    async findByEmail(email: string): Promise<User | null> {                
        
        return this.findOne({
            where: { email: email },
            relations: {
                status: true,
                roles: {
                    permissions: true // This drills down into the Role -> Permission link
                }
            }
        });
    }



    async findByUsername(username: string): Promise<User | null> {
        return this.findOne({ where: { username: username } });
    }


    async findById(id: number): Promise<User | null> {
        return this.findOne({ where: { id: id } });
    }
}


