import { UserCreateRequestDTO } from "../dtos/requests/user-request.dto";
import { UserCreateResponseDTO } from "../dtos/responses/user-response.dto";
import { ErrorResponse } from "../models/error-response.model";



export interface UserControllerInterface {
  getSingleUser(userId: number): Promise<any>;
  getAllUsers(): Promise<any>;
  modifyUser(): Promise<any>;
  reactivateUser(): Promise<any>;
  deactivateUser( ): Promise<any> ;

  
};
