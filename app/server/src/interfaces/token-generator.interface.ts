// Helper function to generate tokens
import { JwtPayloadInterface } from "./jwt-payload.interface";

export interface TokenGeneratorInterface{
    
  generateAccessToken(payload: JwtPayloadInterface): string;
  generateRefreshToken(payload: JwtPayloadInterface): string

}