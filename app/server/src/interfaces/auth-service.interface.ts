import { AuthLoginRequestDTO, AuthRegisterRequestDTO } from "../dtos/requests/auth-request.dto";
import { AuthLoginResponseDTO, AuthLogoutResponseDTO } from "../dtos/responses/auth-response.dto";
import { ErrorResponse } from "../models/error-response.model";
import { Request } from "express";
import { JwtPayloadInterface } from "./jwt-payload.interface";


export interface AuthServiceInterface{

  login(userRequest: AuthLoginRequestDTO, req: Request): Promise<AuthLoginResponseDTO | ErrorResponse >;
  logout(payload: JwtPayloadInterface): Promise<AuthLogoutResponseDTO>;
  forgot(): Promise<any>;
  reset(): Promise<any>;
  refresh(refreshToken: string, req: Request): Promise<any>;
  register(userRequest: AuthRegisterRequestDTO): Promise<any>;
  

  
}



