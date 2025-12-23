import { AutoWired, Service } from "../decorators";
import { IUserRepository } from "../interfaces/IUserRepository.interface";
import { IUserService } from "../interfaces/IUserService.interface";
import { TYPES } from "../types/binding.type";

@Service()
export class UserService implements IUserService{

    @AutoWired(TYPES.IUserRepository)
    private readonly userRepository!: IUserRepository;

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
        return this.userRepository.findByUsername("testuser");
    }
    public async delete(): Promise<any> {
        return this.userRepository.findById(1);
    }
    public async create(): Promise<any> {
        return this.userRepository.findByEmail("test@example.com");
    }


  //constructor(@inject(TYPES.IUserRepository) private userRepository: UserRepository) {}   


}

