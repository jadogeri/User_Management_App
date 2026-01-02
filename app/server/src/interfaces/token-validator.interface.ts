import { JwtPayload } from "jwt-decode";

export interface TokenValidatorInterface{
    
  verifyAccessToken(token: string): any;
  verifyRefreshToken(token: string): string | JwtPayload | undefined; 

}