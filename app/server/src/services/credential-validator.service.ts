
import { Service } from "../decorators";
import { AuthLoginRequestDTO, AuthForgotPasswordRequestDTO, AuthResetPasswordRequestDTO } from "../dtos/requests/auth-request.dto";
import { UserCreateRequestDTO, UserDeactivateRequestDTO } from "../dtos/requests/user-request.dto";
import { CredentialValidatorServiceInterface } from "../interfaces/credential-validator-service.interface";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { ErrorResponse } from "../models/error-response.model";
import { ValidationResponse } from "../models/validation-response.model";
import {isValidEmail, isValidPassword, isValidUsername, isValidatePhoneNumber} from "../utils/input-validation.util"

@Service()
class CredentialValidatorService implements CredentialValidatorServiceInterface{

    validateRegistration(userRequest: UserCreateRequestDTO): ValidationResponse{
        const { username, email, password, phone } = userRequest;

        if (!username || !email || !password) {
            return new ValidationResponse(false, new ErrorResponse(400,"All fields are mandatory!"));
        }
        if(!isValidEmail(email)){
            return new ValidationResponse(false, new ErrorResponse(400,"not a valid email"));
        }
        if(!isValidUsername(username)){
            return new ValidationResponse(false, new ErrorResponse(400,"not a valid username"));

        }
        if(!isValidPassword(password)){
            return new ValidationResponse(false, new ErrorResponse(400,"not a valid password"));
        }  
        //if phone number is provided check if string is a valid phone number
        if(phone){

            if(!isValidatePhoneNumber(phone )){
                return new ValidationResponse(false, new ErrorResponse(400,"not a valid phone number"));
            }  
        }    

        return new ValidationResponse(true);

    }

    validateLogin(userRequest: AuthLoginRequestDTO): ValidationResponse{
        const { email, password  } = userRequest;
        if (!email || !password) {
            return new ValidationResponse(false, new ErrorResponse(400,"All fields are mandatory!"));
        }

        if(!isValidEmail(email)){
            return new ValidationResponse(false, new ErrorResponse(400,"not a valid standard email address"));
        }

        return new ValidationResponse(true);

    }

    validateForgotPassword(userRequest: AuthForgotPasswordRequestDTO): ValidationResponse{
        const { email } = userRequest;

        if(!email){
            return new ValidationResponse(false, new ErrorResponse(400,"Email is mandatory!"));
        }
        if(!isValidEmail(email)){
            return new ValidationResponse(false, new ErrorResponse(400,"not a  valid email"));
        }
        return new ValidationResponse(true);


    }

    validateLogout(userRequest: JwtPayloadInterface): ValidationResponse{
        const token = userRequest.token;
        if(!token){ 
            return new ValidationResponse(false, new ErrorResponse(400,"field token is mandatory"));
        } 
        return new ValidationResponse(true);
    }

    validateResetPassword(userRequest: AuthResetPasswordRequestDTO): ValidationResponse{
        const { email, oldPassword, newPassword, confirmNewPassword } = userRequest;
        if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
          return new ValidationResponse(false, new ErrorResponse(400 ,"All fields are mandatory!"));
    
        }
        if(!isValidEmail(email)){
          return new ValidationResponse(false, new ErrorResponse(400,"not a  valid email"));
      
        }
        if(!isValidPassword(newPassword)){
          return new ValidationResponse(false, new ErrorResponse(400,"not a valid new password"));
        }  
        if(newPassword !== confirmNewPassword){
          return new ValidationResponse(false, new ErrorResponse(400,"passwords do not match"));
        }
        return new ValidationResponse(true);    

    }
    validateDeactivate(userRequest: UserDeactivateRequestDTO): ValidationResponse{
        const { email, password, confirmDeactivation} : UserDeactivateRequestDTO  = userRequest
        if (!email || !password || confirmDeactivation == undefined) {
            return new ValidationResponse(false, new ErrorResponse(400,"All fields are mandatory!"));
        }
        if(!isValidEmail(email )){
            return new ValidationResponse(false, new ErrorResponse(400,"not a  valid email"));

        }
        if(confirmDeactivation !== true){
            return new ValidationResponse(false, new ErrorResponse(400,"confirm must be true"));

        }
        return new ValidationResponse(true);    

    }

    
}

export default CredentialValidatorService;