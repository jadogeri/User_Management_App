import { UserCreateRequestDTO } from "../dtos/requests/user-request.dto";



export interface UserServiceInterface {
  create(userRequest: UserCreateRequestDTO): Promise<any>;
  getOne(): Promise<any>;
  getAll(): Promise<any>;
  modify(): Promise<any>;
  reactivate(): Promise<any>;
  deactivate( ): Promise<any> ;
};
