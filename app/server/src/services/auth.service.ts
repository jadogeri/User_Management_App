import { AutoWired, Service } from "../decorators";
import { ErrorResponse } from "../models/error-response.model";
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
import { AuthLoginResponseDTO, AuthRefreshTokenResponseDTO } from "../dtos/responses/auth-response.dto";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { EmailServiceInterface } from "../interfaces/email-service.interface";
import { TokenGeneratorInterface } from "../interfaces/token-generator.interface";
import { CookieStorageInterface } from "../interfaces/cookie-storage.interface";
import { cookieNameGenerator } from "../utils/cookie-name-generator.util";
import { payloadGenerator } from "../utils/payload-generator.util";
import { errorResponseGenerator } from "../utils/error-response-generator.util";
import { UnAuthorizedError } from "../errors/unauthorized.error";
import { LockedAccountError } from "../errors/locked-account.error";
import { TokenValidatorInterface } from "../interfaces/token-validator.interface";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { ForbiddenError } from "../errors/forbidden.error";

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
    @AutoWired(TYPES.TokenValidatorInterface)
    private readonly tokenValidatorService!: TokenValidatorInterface;
    @AutoWired(TYPES.CookieStorageInterface)
    private readonly cookieStorageService!: CookieStorageInterface; 
 

    public async login(userRequest: AuthLoginRequestDTO, req: Request): Promise<AuthLoginResponseDTO | ErrorResponse > {
        const { email, password } = userRequest;
        console.log("In login service with email: ", email);    
        console.log("In login service with password: ", password);

        const user  = await this.userRepository.findByEmail(email);
        console.log("user from repository: ", user);    
        if(user === null){
            return new ErrorResponse(400,"email does not exist");
        }
        if(user.isEnabled === false){  
 
            throw new LockedAccountError("Account is locked, use forget account to access acount: " + user.email);
        }

        if (user &&  await bcrypt.compare(password,user.password)) {

            const payload: JwtPayloadInterface = payloadGenerator(user);          
            
            const accessToken : string = this.tokenGeneratorService.generateAccessToken(payload);
            const refreshToken : string = this.tokenGeneratorService.generateRefreshToken(payload);
                // Access the response object via req.res
            console.log("res path is " + req.path);
            this.cookieStorageService.clearItem(req, cookieNameGenerator(user.id));
            this.cookieStorageService.setItem(req, cookieNameGenerator(user.id), refreshToken);
                                
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
            const userResponse : AuthLoginResponseDTO = { accessToken: accessToken, refreshToken: refreshToken };
            return userResponse;
        }else{ 
            // handle incorrect password by incrementing failed login
            user.failedLogins = user.failedLogins  + 1      
            if(user.failedLogins > 3){

                user.isEnabled = false;
                user.status = LockedStatus;
                user.updatedAt = new Date();
                await this.userRepository.save(user)
                //SEND EMAIL
                if(process.env.NODE_ENV !== "test"){
                    let recipient : Recipient= {username : user.username, email: user.email}  
                    this.emailService.sendEmail("locked-account",recipient ); 
                }

                // RETURN RESPONSE TO CONTROLLER
                const errorResponse = errorResponseGenerator(400,"Account is locked because of too many failed login attempts. Use /forgt route to access acount", user);
                return errorResponse;

            }else{
                await this.userRepository.save(user)    
            }      
            throw new UnAuthorizedError("email or password is incorrect");
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
    async refresh(refreshToken: string, req: Request): Promise<any> {
        //validate refresh token
        const result = this.tokenValidatorService.verifyRefreshToken(refreshToken);

        if (!(result instanceof TokenExpiredError) && result instanceof JsonWebTokenError) { 
            console.log("Refresh token verification failed: ", result.message);
            throw new UnAuthorizedError("Invalid refresh token: " + result.message);
        }      
        
        //find auth using refresh token
        const savedAuth = await this.authRepository.findByRefreshToken(refreshToken);
        console.log("savedAuth from refresh token: ", savedAuth);   
        if(!savedAuth){
            throw new UnAuthorizedError("Invalid refresh token: no matching auth record found." );
        }
        if(savedAuth && result instanceof TokenExpiredError){
            await this.authRepository.remove(savedAuth);
            throw new ForbiddenError("Refresh token is no longer valid, user must log in to obtain a new token:" + result.message);        }

        //generate new tokens
        const user = savedAuth.user;
        console.log("user from savedAuth: ", user);
        const payload: JwtPayloadInterface = payloadGenerator(user);
        const newAccessToken : string = this.tokenGeneratorService.generateAccessToken(payload);
        const newRefreshToken : string = this.tokenGeneratorService.generateRefreshToken(payload);
        //update auth record
        savedAuth.refreshToken = newRefreshToken;
        await this.authRepository.save(savedAuth);
        const userResponse : AuthRefreshTokenResponseDTO = { accessToken: newAccessToken, refreshToken: newRefreshToken };
        return userResponse;

    }        

}
