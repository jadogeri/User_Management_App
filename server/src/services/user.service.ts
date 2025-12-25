import { AutoWired, Service } from "../decorators";
import { UserRegisterRequestDTO } from "../dtos/requests/user-request.dto";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { IUserService } from "../interfaces/user-service.interface";
import { ErrorResponse } from "../models/error-response.model";
import {hash} from "bcrypt";
import * as bcrypt from "bcrypt";
import * as  jwt from "jsonwebtoken";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/user.entity";
import { UserRegisterResponseDTO } from "../dtos/responses/user-response.dto";
import { Recipient } from "../types/recipient.type";
import { IEmailService } from "../interfaces/email-service.interface";

@Service()
export class UserService implements IUserService{

    @AutoWired(TYPES.IUserRepository)
    private readonly userRepository!:  IUserRepository;
    @AutoWired(TYPES.IEmailService)
    private readonly emailService!:  IEmailService;

    private users = [
        { code: 200, message: "login user" }, 
        { code: 200, message: "logout user" }, 
        { code: 200, message: "forgot user" }, 
        { code: 200, message: "reset user" }, 
        { code: 200, message: "delete user" }, 
        { code: 201, message: "create user" }
    ];

    public async login(): Promise<any> {
        return this.userRepository.find({});
        
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
    public async register(userRequest: UserRegisterRequestDTO): Promise<any> {
        console.log("In UserService.register with userRequest:", userRequest);
        try{

        const { username, email, password } = userRequest;
        const userByEmailAvailable  = await this.userRepository.findByEmail(email);

        if (userByEmailAvailable) {
            return new ErrorResponse(409, "Email already taken!");
        }

        const userByUsernameAvailable  = await this.userRepository.findByUsername(username);
        if (userByUsernameAvailable) {
            return new ErrorResponse(409,"Username already taken!");
        }

            //Hash password
            const hashedPassword : string = await hash(password, Number.parseInt(process.env.BCRYPT_SALT_ROUNDS as unknown as string));
            console.log("Hashed Password: ", hashedPassword);
            //update password with hashed password
            userRequest.password = hashedPassword;
            const createdUser : User = await this.userRepository.save(userRequest);
            console.log("Created User: ", createdUser);
            //prepare response object
            
            const userResponse : UserRegisterResponseDTO ={
                username: createdUser.username,
                email: createdUser.email,
                phone: createdUser.phone,
                failedLogins: createdUser.failedLogins,
                isEnabled: createdUser.isEnabled,
                id: createdUser.id,
                createdAt: createdUser.createdAt,
                updatedAt: createdUser.updatedAt,
                age: createdUser.age,
                fullname: createdUser.fullname
            }
            // If in production environment send email
            // SEND EMAIL
            if(process.env.NODE_ENV !== "test"){
            let recipient : Recipient= {username : userResponse.username, email: userResponse.email}  
            console.log("Sending registration email to:", process.env.COMPANY);

            this.emailService.sendEmail('register-account', recipient);
            }
            // SEND RESPONSE
            return userResponse;
        }catch(e: unknown){
            console.log("error in service layer ", e)
            return new ErrorResponse(500,"mongo error!");


        }
    }

}

