
import { UserLoginRequestDTO, UserRegisterRequestDTO } from "../dtos/requests/user-request.dto";
import { UserLoginResponseDTO, UserRegisterResponseDTO } from "../dtos/responses/user-response.dto";
import { ErrorResponse } from "../models/error-response.model";
import { IJwtPayload } from "./jwt-payload.interface";

export interface IUserController{
  currentUser(requestBody: IJwtPayload): Promise<any>;
  loginUser(requestBody: UserLoginRequestDTO): Promise<UserLoginResponseDTO | ErrorResponse>;
  logoutUser(): Promise<any>;
  forgotUser(): Promise<any>;
  resetUser(): Promise<any>;
  deleteUser(): Promise<any>;
  registerUser( requestBody: UserRegisterRequestDTO): Promise<UserRegisterResponseDTO |  ErrorResponse> ;
}