import { UserLoginRequestDTO, UserRegisterRequestDTO } from "../dtos/requests/user-request.dto";
import { UserLoginResponseDTO } from "../dtos/responses/user-response.dto";
import { ErrorResponse } from "../models/error-response.model";

export interface IUserService{
  login(userRequest: UserLoginRequestDTO): Promise<UserLoginResponseDTO | ErrorResponse >;
  logout(): Promise<any>;
  forgot(): Promise<any>;
  reset(): Promise<any>;
  delete(): Promise<any>;
  register(userRequest: UserRegisterRequestDTO): Promise<any>;
}