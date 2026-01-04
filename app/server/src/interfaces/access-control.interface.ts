import Role from "../entities/role.entity";
import { User } from "../entities/user.entity";
import { Action, Resource } from "../types/rbac.type";
import { RoleNamesEnum } from "../types/role-names.type";


export interface AccessControlInterface{

  can(action: Action, resource: Resource): boolean ;
  hasRole(role: RoleNamesEnum ): boolean ;
  hasFullAccess(grants: {resource: string, action: string}[]): boolean ;    
  getGrants(): {resource: string, action: string}[] ;
  setUserRoles(roles: Role[]): void ;    
  isAccountSuspended(user: User): boolean ; 
  isAccountLocked(user: User): boolean ;
  isAccountDisabled(user: User): boolean;

};

