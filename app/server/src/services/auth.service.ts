import { AutoWired, Service } from "../decorators";
import { ErrorResponse } from "../models/error-response.model";
import {hash} from "bcrypt";
import * as bcrypt from "bcrypt";
import { TYPES } from "../types/binding.type";
import { Recipient } from "../types/recipient.type";
import { AuthServiceInterface } from "../interfaces/auth-service.interface";
import { Auth } from "../entities/auth.entity";
import { Request } from "express";
import { AuthRepositoryInterface } from "../interfaces/auth-repository.interface";
import { UserRepositoryInterface } from "../interfaces/user-repository.interface";
import { LockedStatus } from "../data/status.data";
import { AuthLoginRequestDTO } from "../dtos/requests/auth-request.dto";
import { AuthLoginResponseDTO } from "../dtos/responses/auth-response.dto";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { EmailServiceInterface } from "../interfaces/email-service.interface";
import { TokenGeneratorInterface } from "../interfaces/token-generator.interface";

@Service()
export class AuthService implements AuthServiceInterface{

    @AutoWired(TYPES.AuthRepositoryInterface)
    private readonly authRepository!:  AuthRepositoryInterface;
    @AutoWired(TYPES.UserRepositoryInterface)
    private readonly userRepository!:  UserRepositoryInterface;    
    @AutoWired(TYPES.EmailServiceInterface)
    private readonly emailService!:  EmailServiceInterface;
    @AutoWired(TYPES.TokenGeneratorInterface)
    private readonly tokenGeneratorService!: TokenGeneratorInterface;
 

    public async login(userRequest: AuthLoginRequestDTO, req: Request): Promise<AuthLoginResponseDTO | ErrorResponse > {
        const { email, password } = userRequest;

        const user  = await this.userRepository.findByEmail(email);
        if(user === null){
            return new ErrorResponse(400,"email does not exist");
        }else{
            if(user.isEnabled === false){  
                const errorResponse = new ErrorResponse(423,"Account is locked, use forget account to access acount");
                errorResponse.setEmail(user.email);
                errorResponse.setUsername(user.username);
                return errorResponse;    
            }
            console.log("Found user for login: ", user);
            //compare password with hashedpassword 
            console.log(" compare password with hashedpassword :v",password, user.password)
            if (user &&  await bcrypt.compare(password,user.password)) {

                let payload : JwtPayloadInterface = {
                    user: {
                        username: user.username, email: user.email, id: user.id, roles: user.roles
                    },
                    scopes: [] as string[] | undefined,
                }
                console.log("payload to be signed = ", payload);

                const accessToken : string = this.tokenGeneratorService.generateAccessToken(payload);
                const refreshToken : string = this.tokenGeneratorService.generateRefreshToken(payload);
                    // Access the response object via req.res
                    const res = req.res;
                    console.log("res path is " + req.path);
                    if (res) {
                        res.clearCookie('refreshToken', {
                            path: req.path, // CRITICAL: Must match the path used when the cookie was set
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict',
                            // Note: Do not include maxAge here
                        }).cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax', // CSRF protection
                            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days
                        });
                    }                    
                const savedAuth : Auth | null = await this.authRepository.findByUserId(user.id);
                if(savedAuth instanceof Auth === false || savedAuth === null){
                    //create new auth record
                    const newAuth = new Auth();
                    newAuth.user = user;
                    newAuth.refreshToken = refreshToken;
                    
                    this.authRepository.save(newAuth);
                }else{
                    //update existing auth record
                    savedAuth.refreshToken = refreshToken;

                    await this.authRepository.save(savedAuth);

                }
            const userResponse : AuthLoginResponseDTO = { accessToken: accessToken };
            return userResponse;
            }else{ 
                // handle incorrect password by incrementing failed login
                user.failedLogins = user.failedLogins  + 1      
                if(user.failedLogins > 3){

                    user.isEnabled = false;
                    user.status = LockedStatus;
                    user.updatedAt = new Date();
                    await this.userRepository.update(user.id, user)
                    //SEND EMAIL
                    if(process.env.NODE_ENV !== "test"){

                        let recipient : Recipient= {username : user.username, email: user.email}  
                        this.emailService.sendEmail("locked-account",recipient ); 
                    }

                        // RETURN RESPONSE TO CONTROLLER
                        const errorResponse = new ErrorResponse(400,"Account is locked because of too many failed login attempts. Use /forgt route to access acount");
                        errorResponse.setEmail(user.email);
                        errorResponse.setUsername(user.username);
                        return errorResponse;

                    }else{
                        await this.userRepository.update(user.id, user)    
                    }      
                    return new ErrorResponse(400, "email or password is incorrect");

                }

        }
       
    }
    logout(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    forgot(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    reset(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    refresh(): Promise<any> {
        throw new Error("Method not implemented.");
    }

        

}