import { AutoWired, Service } from "../decorators";
import { ErrorResponse } from "../models/error-response.model";
import {hash} from "bcrypt";
import * as bcrypt from "bcrypt";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/user.entity";
import { Recipient } from "../types/recipient.type";
import { AuthServiceInterface } from "../interfaces/auth-service.interface";
import { Auth } from "../entities/auth.entity";
import { Request } from "express";
import { AuthRepositoryInterface } from "../interfaces/auth-repository.interface";
import { UserServiceInterface } from "../interfaces/user-service.interface";
import { UserRepositoryInterface } from "../interfaces/user-repository.interface";
import { UserCreateRequestDTO } from "../dtos/requests/user-request.dto";
import { EnabledStatus } from "../data/status.data";
import { UserRole } from "../data/role.data";
import { UserCreateResponseDTO } from "../dtos/responses/user-response.dto";
import { EmailServiceInterface } from "../interfaces/email-service.interface";
import { TokenGeneratorInterface } from "../interfaces/token-generator.interface";
import { PasswordGeneratorInterface } from "../interfaces/password-generator.interface";

@Service()
export class UserService implements UserServiceInterface{


    @AutoWired(TYPES.UserRepositoryInterface)
    private readonly userRepository!:  UserRepositoryInterface;
    @AutoWired(TYPES.EmailServiceInterface)
    private readonly emailService!:  EmailServiceInterface;
    @AutoWired(TYPES.AuthServiceInterface)
    private readonly authService!:  AuthServiceInterface;
    @AutoWired(TYPES.TokenGeneratorInterface)
    private readonly tokenGeneratorService!: TokenGeneratorInterface;
    @AutoWired(TYPES.PasswordGeneratorInterface)
    private readonly passwordGeneratorService!: PasswordGeneratorInterface;


    getOne(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    modify(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    reactivate(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deactivate(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async create(userRequest: UserCreateRequestDTO): Promise<UserCreateResponseDTO | ErrorResponse> {
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
            const hashedPassword : string = await this.passwordGeneratorService.generateHashedPassword(password);
            console.log("Hashed Password: ", hashedPassword);
            //update password with hashed password
            userRequest.password = hashedPassword;
            const newUser = new User();
            //copy properties from DTO to entity
            Object.assign<User, UserCreateRequestDTO>(newUser, userRequest);
            newUser.failedLogins = 0;
            newUser.isEnabled = true;
            newUser.status = EnabledStatus
            newUser.roles = [UserRole]; //default role assignment can be handled here
            //set default role and status
            //save user to database
            
            const createdUser : User = await this.userRepository.save(newUser);
            console.log("Created User: ", createdUser);
            //prepare response object
            
            const userResponse : UserCreateResponseDTO ={
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