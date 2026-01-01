import { AuthLoginRequestDTO, AuthForgotPasswordRequestDTO, AuthResetPasswordRequestDTO } from "../dtos/requests/auth-request.dto";
import { UserCreateRequestDTO, UserDeactivateRequestDTO } from "../dtos/requests/user-request.dto";
import { ValidationResponse } from "../models/validation-response.model";
import { JwtPayloadInterface } from "./jwt-payload.interface";


export interface CredentialValidatorServiceInterface {

  validateRegistration(userRequest: UserCreateRequestDTO): ValidationResponse;

  validateLogin(userRequest: AuthLoginRequestDTO): ValidationResponse;

  validateForgotPassword(userRequest: AuthForgotPasswordRequestDTO): ValidationResponse;

  validateLogout(userRequest: JwtPayloadInterface): ValidationResponse;

  validateResetPassword(userRequest: AuthResetPasswordRequestDTO): ValidationResponse;

  validateDeactivate(userRequest: UserDeactivateRequestDTO): ValidationResponse

}