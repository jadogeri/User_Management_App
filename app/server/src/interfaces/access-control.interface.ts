import Role from "../entities/role.entity";
import { Action, Resource } from "../types/rbac.type";


export interface AccessControlInterface{

  can(action: Action, resource: Resource): boolean ;
  hasRole(role: Role ): boolean ;
  hasFullAccess(grants: {resource: string, action: string}[]): boolean ;    
  getGrants(): {resource: string, action: string}[] ;
  setUserRoles(roles: Role[]): void ;    

};

