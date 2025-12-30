// src/authentication.ts
import {Request} from 'express';

// Define the shape of your user object/JWT payload
export interface UserPayload {
    user: {
        username: string , email: string , id: number ,
    },
    scopes:  string[] | undefined

}

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {

  const payload = {message: 'Unauthorized'};
  request.body = payload
  
  return request

}
