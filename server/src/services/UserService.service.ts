import { Service } from "../decorators";
import { IUserService } from "../interfaces/IUserService.interface";

@Service()
export class UserService implements IUserService{
    private users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];

    public async login(): Promise<any> {
        return this.users;
    }
    public async logout(): Promise<any> {
        return this.users;
    }
    public async forgot(): Promise<any> {
        return this.users;
    }
    public async reset(): Promise<any> {
        return this.users;
    }
    public async delete(): Promise<any> {
        return this.users;
    }
    public async create(): Promise<any> {
        return this.users;
    }


  //constructor(@inject(TYPES.IUserRepository) private userRepository: UserRepository) {}   


}

