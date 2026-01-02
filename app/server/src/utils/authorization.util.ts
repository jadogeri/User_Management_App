// src/authentication.ts
import {Request} from 'express';
import User from '../entities/user.entity';
import { AppDataSource } from '../configs/typeOrm.config';
import { HttpError } from '../errors/http.error';
import { AuthLoginRequestDTO } from '../dtos/requests/auth-request.dto';

// Define the shape of your user object/JWT payload
export interface UserPayload {
    user: {
        username: string , email: string , id: number ,
    },
    scopes:  string[] | undefined

}

export async function expressAuthorization(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {

  if (request) {
    console.log("In express Authorization ");
    console.log("security name: ", securityName);
    console.log("scopes in util: ", scopes)
    const {email , password} : AuthLoginRequestDTO = request.body;
    console.log("email: ",email," passowrd: ", password )
    if(!email || !password)
      throw new HttpError(400, "Missing email or password");
    try {
      


    if (email) {
       // : Check role directly from token payload

        // : Verify against TypeORM database for real-time security
        const userRepository = AppDataSource.getRepository(User); 
        const user = await userRepository.findOne({where:{ email: email },            
           relations: {
                status: true,
                roles: {
                    permissions: true // This drills down into the Role -> Permission link
                }
            }});


        console.log("user in database: ", user)
        if (!user) {
          throw new HttpError(403, "User not found");
        }
        // if (user.status?.name != 'ACTIVE') {
        //   throw new HttpError(403, "User is not active");
        // }
  
        
     console.log("Checking scopes:", scopes);
     console.log("get user permissions from permission class: ", user.getPermissionNames())
     const permissions = user.getPermissionNames();
        if (scopes && scopes.length > 0) {
          let hasPermission = false;
          for (let scope of scopes) {
            console.log("all scope in oartray", scope);
            console.log("scopes provided ;", scopes)
            if (permissions.includes(scope)) {
              hasPermission = true;
              break;
            }
          }
          if(!hasPermission){
            throw new HttpError(403, "JWT does not contain sufficient permissions");
          }
          console.log("has permission: ", hasPermission)
        }
        console.log("payload to return: ", request.payload); 
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

