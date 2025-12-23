import { Service } from "../decorators";
import { IUserService } from "../interfaces/IUserService.interface";

@Service()
export class UserService implements IUserService{
    private users = [
        { code: 200, message: "login user" }, 
        { code: 200, message: "logout user" }, 
        { code: 200, message: "forgot user" }, 
        { code: 200, message: "reset user" }, 
        { code: 200, message: "delete user" }, 
        { code: 201, message: "create user" }
    ];

    public async login(): Promise<any> {
        return this.users[0];
    }
    public async logout(): Promise<any> {
        return this.users[1];
    }
    public async forgot(): Promise<any> {
        return this.users[2];
    }
    public async reset(): Promise<any> {
        return this.users[3];
    }
    public async delete(): Promise<any> {
        return this.users[4];
    }
    public async create(): Promise<any> {
        return this.users[5];
    }


  //constructor(@inject(TYPES.IUserRepository) private userRepository: UserRepository) {}   


}

