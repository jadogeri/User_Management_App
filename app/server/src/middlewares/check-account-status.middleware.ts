
import { Request, Response, NextFunction } from 'express';
import User from '../entities/user.entity';
import { AppDataSource } from '../configs/typeOrm.config';
import { StatusEnum } from '../types/status.type';
import { HttpError } from '../errors/http.error';
import { AuthLoginRequestDTO } from '../dtos/requests/auth-request.dto';

export const checkAccountStatus = async (req: Request, res: Response, next: NextFunction) => {
    // We can assume (req as any).user is populated by the previous middleware
    const payload : AuthLoginRequestDTO = req.body ;
    console.log("checkAccountStatus middleware called", payload);
    const {email, password} = payload;

    if (!email || !password) {
        return res.status(401).send('Missing email or password.');
    }

      // : Verify against TypeORM database for real-time security
        const userRepository = AppDataSource.getRepository(User); 
        const user = await userRepository.findOne({where:{ email: email }, relations: ["status"] });
        console.log("user retrieved from database: ", user)
        if (!user) {
          throw new HttpError(403, `User with email ${email} not found`);
        }        
    
        if (user.status.name == StatusEnum.LOCKED || user.isEnabled === false) {
            return res.status(403).send('Account is locked or deactivated. Please contact support or use /forgot-password route to obtain a temporary password.');
        }

    next(); // Proceed to the final route handler
};



/**
 * 
        async loginUser(reqUser: UserLoginRequestDTO): Promise<UserLoginResponseDTO | ErrorResponse> {
            const { email, password } = reqUser;

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


 */