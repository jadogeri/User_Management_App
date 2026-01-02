import { JwtPayload } from "jwt-decode";

export interface TokenValidatorInterface{
    
  verifyAccessToken(token: string): string | JwtPayload | Error; 
  verifyRefreshToken(token: string): string | JwtPayload | Error; 

}