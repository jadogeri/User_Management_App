// src/authentication.ts
import {Request} from 'express';
import User from '../entities/user.entity';
import { AppDataSource } from '../configs/typeOrm.config';
import { HttpError } from '../errors/http.error';
import { AuthLoginRequestDTO } from '../dtos/requests/auth-request.dto';
import { RoleNamesEnum } from '../types/role-names.type';
import { RBACPermission } from '../types/rbac.type';
import AccessControlService from '../services/access-control.service';
import { isRoleName } from './isRoleName.util';
import { isRBACPermission } from './isRBACPermission.util';
import { UnAuthorizedError } from '../errors/unauthorized.error';

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
  scopes?: RBACPermission[] | RoleNamesEnum[]
): Promise<any> {
  //get access control instance from ioc container
  const accessControl = new AccessControlService();


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
        accessControl.setUserRoles(user.roles);
        console.log("user roles: ", user.roles)
        // if (user.status?.name != 'ACTIVE') {
        //   throw new HttpError(403, "User is not active");
        // }
  
        
        console.log("Checking scopes:", scopes);
        console.log("get user permissions from permission class: ", user.getPermissionNames())
        const permissions = user.getPermissionNames();
        //if user has full access, grant all permissions
        if(accessControl.hasFullAccess(accessControl.getGrants())){
          console.log("user has full access");
          return Promise.resolve(request.payload);
        }
        if (scopes && scopes.length > 0) {
          let isRoleMatch : boolean = false;
          let hasPermission : boolean = false;        
          for(let scope of scopes){
            console.log("checking scope: ", scope);
            if(isRoleName(scope)){
              console.log("scopes are role names");
              isRoleMatch = accessControl.hasRole(scope);
            }
            if(isRBACPermission(scope)){
              console.log("scopes are rbac permissions");
              console.log("scope to check permission: ", scope);
              const [resource, action] = scope.split(':');
              console.log("resource and action : ", resource,action)
              hasPermission = accessControl.can(action as any, resource as any);
            }

            
          if (!isRoleMatch && !hasPermission) {
            throw new UnAuthorizedError(`Missing required access: ${scope}`);
          }

          }








          

          /*
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
          */
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

