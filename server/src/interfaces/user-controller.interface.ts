
import { UserRegisterRequestDTO } from "../dtos/requests/user-request.dto";
import { UserRegisterResponseDTO } from "../dtos/responses/user-response.dto";
import { ErrorResponse } from "../models/error-response.model";

export interface IUserController{
  loginUser(): Promise<any>;
  logoutUser(): Promise<any>;
  forgotUser(): Promise<any>;
  resetUser(): Promise<any>;
  deleteUser(): Promise<any>;
  registerUser( requestBody: UserRegisterRequestDTO): Promise<UserRegisterResponseDTO |  ErrorResponse> ;
}