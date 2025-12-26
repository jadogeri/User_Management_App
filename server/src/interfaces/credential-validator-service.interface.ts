import { UserRegisterRequestDTO, UserLoginRequestDTO, UserDeactivateRequestDTO, UserResetPasswordRequestDTO, UserForgotPasswordRequestDTO } from "../dtos/requests/user-request.dto";
import { ValidationResponse } from "../models/validation-response.model";
import { IJwtPayload } from "./jwt-payload.interface";


export interface ICredentialValidatorService {

  validateRegistration(userRequest: UserRegisterRequestDTO): ValidationResponse;

  validateLogin(userRequest: UserLoginRequestDTO): ValidationResponse;

  validateForgotPassword(userRequest: UserForgotPasswordRequestDTO): ValidationResponse;

  validateLogout(userRequest: IJwtPayload): ValidationResponse;

  validateResetPassword(userRequest: UserResetPasswordRequestDTO): ValidationResponse;
  
  validateDeactivate(userRequest: UserDeactivateRequestDTO): ValidationResponse;

}