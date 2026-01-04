// src/authentication.ts
import {Request} from 'express';
import * as jwt from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode';
import isJwtTokenExpired, { decode } from 'jwt-check-expiry';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';
import { Role } from '../entities/role.entity';
import User from '../entities/user.entity';
import { AppDataSource } from '../configs/typeOrm.config';
import { HttpError } from '../errors/http.error';
import { RBACPermission } from '../types/rbac.type';
import { RoleNamesEnum } from '../types/role-names.type';
import AccessControlService from '../services/access-control.service';
import TokenValidatorService from '../services/token-validator.service';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { UnAuthorizedError } from '../errors/unauthorized.error';
import { ForbiddenError } from '../errors/forbidden.error';
import { isRoleName } from './isRoleName.util';
import { isRBACPermission } from './isRBACPermission.util';

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: RBACPermission[] | RoleNamesEnum[]
): Promise<any> {
  //get access control instance from ioc container
  const accessControl = new AccessControlService();
  const tokenValidatorService = new TokenValidatorService

  if (securityName === 'jwt') {
    console.log("In expressAuthentication for 'bearer' security scheme");
    const authHeader = request.headers['authorization'];
    console.log("Request headers:", authHeader);
    const accessToken = authHeader && authHeader.startsWith("Bearer") && authHeader.split(' ')[1]; // Extract the token part after 'Bearer '

    if (!accessToken) {
      throw new HttpError(401,'No token provided');
    }

    //validate access token
    const result = tokenValidatorService.verifyAccessToken(accessToken);

    if ((result instanceof TokenExpiredError) ) { 
      console.log("Access token verification failed: ", result.message);
      throw new ForbiddenError("Access token is no longer valid, user must use valid refresh token or log in to obtain a new token:" + result.message);   
    }      

    if(result instanceof JsonWebTokenError){
      console.log("Access token verification failed: ", result.message);
      throw new UnAuthorizedError("Invalid access token: " + result.message);   
    }
    const decodedPayload : JwtPayloadInterface = jwtDecode<JwtPayloadInterface>(accessToken);
    console.log("decodedPayload = ", decodedPayload);
    try {
      const { user : decodedUser } = decodedPayload;
      console.log("decoded user from payload: ", decodedUser);  
      //verify scopes/roles if provided
      if (decodedUser) {
        // : Check role directly from token payload
        const userRepository = AppDataSource.getRepository(User); 
        const user = await userRepository.findOne({where:{ email: decodedUser.email },            
          relations: {
            status: true,
            roles: {
              permissions: true // This drills down into the Role -> Permission link
            }
          }
        });

        console.log("user in database: ", user)
        if (!user) {
          throw new HttpError(403, "User not found");
        }
        accessControl.setUserRoles(user.roles);
        console.log("user roles: ", user.roles)
        if(accessControl.isAccountDisabled(user)){
          throw new UnAuthorizedError("User account is disabled");
        }
        if(accessControl.isAccountSuspended(user)){
          throw new UnAuthorizedError("User account is suspended");
        }
        if(accessControl.isAccountLocked(user)){
          throw new UnAuthorizedError("User account is locked");
        }

        console.log("Checking scopes:", scopes);
        console.log("get user permissions from permission class: ", user.getPermissionNames())

        //if user has full access, grant all permissions
        if(accessControl.hasFullAccess(accessControl.getGrants())){
          console.log("user has full access");
          request.payload = decodedPayload;
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

        }  
        //attached verified user to request payload
        request.payload = decodedPayload;
        return Promise.resolve(request.payload);
      }
      console.log("Insufficient permissions to access this resource: no user in token payload");
      throw new ForbiddenError("Insufficient permissions to access this resource");
    } catch (error : unknown) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
      throw new HttpError(500, "Unknown error during token verification");
    }
  }
  
  throw new HttpError(500, "Unknown security name");

}

