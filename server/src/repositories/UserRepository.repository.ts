import { DataSource, Repository as BaseRepository } from "typeorm";
import { Repository } from "../decorators";
import { IUserRepository } from "../interfaces/IUserRepository.interface";
//import { User } from "../entities/User.entity";
import { inject } from "inversify";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/User.entity";
import { IDatabaseService } from "../interfaces/IDatabaseService.interface";


@Repository()
export class UserRepository extends BaseRepository<User> implements IUserRepository {

    constructor(@inject(TYPES.IDatabaseService) private readonly databaseService: IDatabaseService) {
        super(User, databaseService.connect().getDataSource().createEntityManager());
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