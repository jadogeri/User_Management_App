
import { Service } from "../decorators";
import Role from "../entities/role.entity";
import { AccessControlInterface } from "../interfaces/access-control.interface";
import { Action, Resource } from "../types/rbac.type";

@Service()
class AccessControlService implements AccessControlInterface{

    private userRoles: Role[] = []; // This should be set based on the authenticated user's roles

    setUserRoles(roles: Role[]){
        this.userRoles = roles;
    }

    hasRole(role: Role): boolean {
        for(const userRole of this.userRoles){
            if(userRole.id === role.id){
                return true;
            }
        }
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
      return true;
    }

    // Check specific grants
    for (const grant of grants) {
      const resourceMatches = grant.resource === '*' || grant.resource === resource;
      const actionMatches = grant.action === '*' || grant.action === action;

      if (resourceMatches && actionMatches) {
        return true;
      }
    }

    return false; // No matching grant found
  
    }
    
}

export default AccessControlService;