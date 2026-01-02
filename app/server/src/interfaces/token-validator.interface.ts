// Helper function to generate tokens
import { JwtPayloadInterface } from "./jwt-payload.interface";

export interface TokenValidatorInterface{
    
  validate(payload: JwtPayloadInterface): any;

}