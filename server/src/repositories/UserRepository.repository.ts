import { DataSource, Repository as BaseRepository } from "typeorm";
import { Repository } from "../decorators";
import { IUserRepository } from "../interfaces/IUserRepository.interface";
//import { User } from "../entities/User.entity";
import { inject } from "inversify";
import { TYPES } from "../types/binding.type";


@Repository()
export class UserRepository extends BaseRepository<any> implements IUserRepository {

    constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    // constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    //     super(User, dataSource.createEntityManager());
    // }


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