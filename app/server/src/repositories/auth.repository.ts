import { DataSource, Repository as BaseRepository } from "typeorm";
import { Repository } from "../decorators";
import { inject } from "inversify";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/user.entity";
import { Auth } from "../entities/auth.entity";
import { AuthRepositoryInterface } from "../interfaces/auth-repository.interface";

@Repository()
export class AuthRepository extends BaseRepository<Auth> implements AuthRepositoryInterface {
    

    constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
        console.log("Registered Entities:", dataSource.entityMetadatas.map(m => m.name));
        super(Auth, dataSource.createEntityManager());
        
    }
    login(): any {
        return {message: "Login user endpoint from repository" };
      
    }
    logout(): any {
        return {message: "Logout user endpoint from repository" };
    }
    forgot(): any {
        return {message: "Forgot password endpoint from repository" };
    }
    reset(): any {
        return {message: "Reset password endpoint from repository" };
    }

    refresh(): any {
        return {message: "Refresh token endpoint from repository" };
    }
    findActiveAuths(): Promise<Auth[]> {
        throw new Error("Method not implemented.");
    }

    findByUser(user: User): Promise<Auth | null> {
        throw new Error("Method not implemented.");
    }
    findByUserId(userId: number): Promise<Auth | null> {

        return this.findOne({ 
            where: { user: { id: userId } }, 
            relations: ["user", "user.roles","user.roles.permissions"], // Specify nested relations
        });
        
    }
    findByRefreshToken(token: string): Promise<Auth | null> {
        return this.findOne({
            where: { refreshToken: token },
            relations: ["user", "user.roles","user.roles.permissions"], // Specify nested relations
        });    
    }
    
}


