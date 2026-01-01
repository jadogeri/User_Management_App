// src/authentication.ts
import {Request} from 'express';
import * as jwt from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode';
import isJwtTokenExpired, { decode } from 'jwt-check-expiry';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';
import { Role } from '../entities/role.entity';
import User from '../entities/user.entity';
import { AppDataSource } from '../configs/typeOrm.config';
import { HttpError } from '../errors/http-error.exception';

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

  if (securityName === 'jwt') {
    console.log("In expressAuthentication for 'bearer' security scheme");
    const authHeader = request.headers['authorization'];
    console.log("Request headers:", authHeader);
    const token = authHeader && authHeader.startsWith("Bearer") && authHeader.split(' ')[1]; // Extract the token part after 'Bearer '

    if (!token) {
      throw new HttpError(401,'No token provided');
    }

    console.log('isExpired is:', isJwtTokenExpired(token));
    if(isJwtTokenExpired(token)){
      throw new HttpError(401,"token has expired");
    }


    try {

      const decoded =  jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET as jwt.Secret)
      
      console.log("decoded = ", decoded)
      console.log('Decoded token :', decode(token));

      const decodedPayload : JwtPayloadInterface = jwtDecode<JwtPayloadInterface>(token);
      console.log("decodedPayload = ", decodedPayload)
      request.payload = decodedPayload;
    if (decodedPayload) {
       // : Check role directly from token payload
        const userRole : Role = decodedPayload.user.role; // e.g., 'admin', 'editor', 'user'

        // : Verify against TypeORM database for real-time security
        const userRepository = AppDataSource.getRepository(User); 
        const user = await userRepository.findOne({where:{ id: decodedPayload.user.id }, relations: ["roles","status"] });
        if (!user) {
          throw new HttpError(403, "User not found");
        }
        // if (user.status?.name != 'ACTIVE') {
        //   throw new HttpError(403, "User is not active");
        // }
        let roleFound: boolean = false;

        
      console.log("Token successfully verified and payload attached to request.");
      console.log("Checking scopes:", scopes);
        if (scopes && scopes.length > 0) {
          let hasPermission = false;
          for (let role of user.roles) {
            if (role.hasRequiredPermission(scopes)) {
              hasPermission = true;
              break;
            }
          }
          if(!hasPermission){
            throw new HttpError(403, "JWT does not contain sufficient permissions");
          }
        }
      return Promise.resolve(request.payload);
    } else {
      console.log("Token verification failed.");
      Promise.reject(new HttpError(403, "Invalid token"));
    }
    } catch (error : unknown) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
      throw new HttpError(500, "Unknown error during token verification");

    }
  }
    throw new HttpError(500, "Unknown security name");

}

