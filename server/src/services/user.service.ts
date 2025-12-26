import { AutoWired, Service } from "../decorators";
import { UserLoginRequestDTO, UserRegisterRequestDTO } from "../dtos/requests/user-request.dto";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { IUserService } from "../interfaces/user-service.interface";
import { ErrorResponse } from "../models/error-response.model";
import {hash} from "bcrypt";
import * as bcrypt from "bcrypt";
import * as  jwt from "jsonwebtoken";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/user.entity";
import { UserLoginResponseDTO, UserRegisterResponseDTO } from "../dtos/responses/user-response.dto";
import { Recipient } from "../types/recipient.type";
import { IEmailService } from "../interfaces/email-service.interface";
import { EnabledStatus } from "../constants/status.constant";
import { UserRole } from "../constants/role.constant";

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

    public async login(userRequest: UserLoginRequestDTO): Promise<UserLoginResponseDTO | ErrorResponse > {
        const { email, password } = userRequest;

        const user  = await this.userRepository.findByEmail(email);
        if(!user){
            return new ErrorResponse(400,"email does not exist");
        }else{
            if(user.isEnabled === false){  
                const errorResponse = new ErrorResponse(423,"Account is locked, use forget account to access acount");
                errorResponse.setEmail(user.email as string);
                errorResponse.setUsername(user.username as string);
                return errorResponse;    
            }
            
            //compare password with hashedpassword 
            if (user &&  await bcrypt.compare(password,user.password as string)) {

                let payload = {
                    user: {
                    username: user.username as string , email: user.email as string , id: user._id ,
                    },
                }
                //post fix operator   knowing value cant be undefined
                let secretKey  = process.env.JSON_WEB_TOKEN_SECRET! ;
                const accessToken  =  jwt.sign( payload,secretKey as jwt.Secret,  { expiresIn: "10m" } );
                //add token and id to auth 

                //call auth service

                const authenticatedUser : IAuth | null = await this.authService.findByUserId(user._id);
                if(!authenticatedUser){

                    await this.authService.create(user._id, accessToken);
                }else{

                    await this.authService.update(user._id, accessToken);
                }

                //if failed logins > 0, 
                //reset to zero if account is not locked
                if(user.failedLogins as number > 0){

                    const resetUser : IUser ={
                    failedLogins: 0
                    }

                    await this.userRepository.update(user._id, resetUser)
                }
                    //res.status(200).json({ accessToken }); 
                const userResponse :UserLoginResponseDTO = {
                    accessToken: accessToken
                }
                    //SEND TEXT MESSAGE
                let recipient : Recipient= {username : user.username, email: user.email}  
                //this.textService.sendSms("+18777804236",recipient);
                return userResponse;
            }else{ 
                // handle incorrect password by incrementing failed login
                user.failedLogins = user.failedLogins  as number + 1      
                if(user.failedLogins > 3){

                    user.isEnabled = false;
                    await this.userRepository.update(user._id, user)
                    //SEND EMAIL
                    if(process.env.NODE_ENV !== "test"){

                        let recipient : Recipient= {username : user.username, email: user.email}  
                        this.emailService.sendEmail("locked-account",recipient ); 
                    }

                    // RETURN RESPONSE TO CONTROLLER
                    const errorResponse = new ErrorResponse(400,"Account is locked because of too many failed login attempts. Use /forgt route to access acount");
                    errorResponse.setEmail(user.email as string);
                    errorResponse.setUsername(user.username as string);
                    return errorResponse;

                }else{
                    await this.userRepository.update(user._id, user)    
                }      
                //res.status(400).json({ message: "email or password is incorrect" });
                return new ErrorResponse(400, "email or password is incorrect");

            }


        }
        
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
            const newUser = new User();
            //copy properties from DTO to entity
            Object.assign<User, UserRegisterRequestDTO>(newUser, userRequest);
            newUser.failedLogins = 0;
            newUser.isEnabled = true;
            newUser.status = EnabledStatus
            newUser.role = UserRole; //default role assignment can be handled here
            //set default role and status
            //save user to database
            
            const createdUser : User = await this.userRepository.save(newUser);
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

