import { UserRegisterRequestDTO } from "../dtos/requests/user-request.dto";

export interface IUserService{
  login(): Promise<any>;
  logout(): Promise<any>;
  forgot(): Promise<any>;
  reset(): Promise<any>;
  delete(): Promise<any>;
  register(userRequest: UserRegisterRequestDTO): Promise<any>;
}