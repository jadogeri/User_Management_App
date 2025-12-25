import { UserCreationRequest } from "../dtos/requests/user-request.dto";
import { UserCreationResponse } from "../dtos/responses/user-response.dto";
import { ErrorResponse } from "../models/error-response.model";

export interface IUserController{
  loginUser(): Promise<any>;
  logoutUser(): Promise<any>;
  forgotUser(): Promise<any>;
  resetUser(): Promise<any>;
  deleteUser(): Promise<any>;
  registerUser( requestBody: UserCreationRequest): Promise<UserCreationResponse |  ErrorResponse> ;
}