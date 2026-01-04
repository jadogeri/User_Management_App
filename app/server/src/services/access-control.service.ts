
import { Service } from "../decorators";
import Role from "../entities/role.entity";
import User from "../entities/user.entity";
import { AccessControlInterface } from "../interfaces/access-control.interface";
import { Action, Resource } from "../types/rbac.type";
import { RoleNamesEnum } from "../types/role-names.type";
import { StatusEnum } from "../types/status.type";

@Service()
class AccessControlService implements AccessControlInterface{

    private userRoles: Role[] = []; // This should be set based on the authenticated user's roles

    setUserRoles(roles: Role[]){
        this.userRoles = roles;
    }

    hasRole(role: RoleNamesEnum): boolean {
        for(const userRole of this.userRoles){
            if(userRole.name === role){
                console.log("user has role in accwss control: ", role);
                return true;
            }
        }
        console.log("user does not have role in access control: ", role);

        return false;
    }
    hasFullAccess(grants: {resource: string, action: string}[]): boolean {
        return grants.some(
            grant => grant.resource === '*' && grant.action === '*'
        );    
    }

    getGrants(): {resource: string, action: string}[] {
        if(this.userRoles.length === 0){
            return []; // No roles assigned to the user
        }  
        const grants = this.userRoles.flatMap(role => role.permissions.map(permission => ({
            resource: permission.resource,
            action: permission.action,
        })));
        return grants;  
    }               

 /**
   * Checks if the user has permission to perform an action on a resource.
   * @param action The action (e.g., 'read', 'delete')
   * @param resource The resource (e.g., 'user', 'product')
   * @returns boolean - true if permitted, false otherwise
   */
  public can(action: Action, resource: Resource): boolean {

    if(this.userRoles.length === 0){
        return false; // No roles assigned to the user
    }

    const grants = this.getGrants();

    // Check for super admin/wildcard access
    const hasFullAccess = this.hasFullAccess(grants);
    if (hasFullAccess) {
        console.log("user has full access line 62 in access control service");
      return true;
    }

    // Check specific grants
    for (const grant of grants) {
      const resourceMatches = grant.resource === '*' || grant.resource === resource;
      const actionMatches = grant.action === '*' || grant.action === action;

      if (resourceMatches && actionMatches) {
        console.log(`user has permission for action ${action} on resource ${resource} in access control service`);
        return true;
      }
    }
    
    console.log(`user does not have permission for action ${action} on resource ${resource} in access control service`);
    return false; // No matching grant found
  
    }    

    isAccountSuspended(user: User): boolean {
        const isSuspended : boolean = user?.suspension !== null;
        return isSuspended;
    }
    isAccountDisabled(user: User): boolean {
        const isDisabled : boolean = user?.status.name === StatusEnum.DISABLED || user.isEnabled === false;
        return isDisabled;
    }
    isAccountLocked(user: User): boolean {
        const isLocked : boolean = user?.status.name === StatusEnum.LOCKED || user.isEnabled === false;
        return isLocked;
    }
}

export default AccessControlService;