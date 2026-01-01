import { AuthLoginRequestDTO } from "../dtos/requests/auth-request.dto";
import { AuthLoginResponseDTO } from "../dtos/responses/auth-response.dto";
import { ErrorResponse } from "../models/error-response.model";
import { Request } from "express";

export interface AuthControllerInterface {
  loginUser(requestBody: AuthLoginRequestDTO, req: Request): Promise<AuthLoginResponseDTO | ErrorResponse>;
  logoutUser(): Promise<any>;
  forgotUser(): Promise<any>;
  resetUser(): Promise<any>;
  refreshToken( ): Promise<any> ;
};
