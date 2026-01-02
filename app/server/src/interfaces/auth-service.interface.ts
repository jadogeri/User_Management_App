import { AuthLoginRequestDTO } from "../dtos/requests/auth-request.dto";
import { AuthLoginResponseDTO } from "../dtos/responses/auth-response.dto";
import { ErrorResponse } from "../models/error-response.model";
import { Request } from "express";


export interface AuthServiceInterface{

  login(userRequest: AuthLoginRequestDTO, req: Request): Promise<AuthLoginResponseDTO | ErrorResponse >;
  logout(): Promise<any>;
  forgot(): Promise<any>;
  reset(): Promise<any>;
  refresh(refreshToken: string, req: Request): Promise<any>;

  
}



