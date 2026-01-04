import { UserCreateRequestDTO } from "../dtos/requests/user-request.dto";
import { UserCreateResponseDTO } from "../dtos/responses/user-response.dto";
import { ErrorResponse } from "../models/error-response.model";
import { JwtPayloadInterface } from "./jwt-payload.interface";


export interface UserControllerInterface {
  createUser( requestBody: UserCreateRequestDTO): Promise<UserCreateResponseDTO |  ErrorResponse> ;
  getSingleUser(): Promise<any>;
  getAllUsers(): Promise<any>;
  modifyUser(): Promise<any>;
  reactivateUser(): Promise<any>;
  deactivateUser( ): Promise<any> ;
  currentUser(): Promise<JwtPayloadInterface> ;

  
};
