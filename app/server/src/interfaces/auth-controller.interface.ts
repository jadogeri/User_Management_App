import { AuthLoginRequestDTO, AuthRefreshTokenRequestDTO } from "../dtos/requests/auth-request.dto";
import { AuthLoginResponseDTO } from "../dtos/responses/auth-response.dto";
import { ErrorResponse } from "../models/error-response.model";
import { Request } from "express";
import { JwtPayloadInterface } from "./jwt-payload.interface";

export interface AuthControllerInterface {
  loginUser(requestBody: AuthLoginRequestDTO, req: Request): Promise<AuthLoginResponseDTO | ErrorResponse>;
  logoutUser(req: Request): Promise<any> ;
  forgotUser(): Promise<any>;
  resetUser(): Promise<any>;
  refreshToken(userRequest: AuthRefreshTokenRequestDTO, req: Request): Promise<any> ;
  currentUser(req: Request): Promise<JwtPayloadInterface> ;

};
