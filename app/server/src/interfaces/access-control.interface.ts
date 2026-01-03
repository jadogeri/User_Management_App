import { Service } from "../decorators";


@Service()
export class AccessControl {
  private userRole: Role;

  constructor(userRole: Role) {
    this.userRole = userRole;
  }

  /**
   * Checks if the user has permission to perform an action on a resource.
   * @param action The action (e.g., 'read', 'delete')
   * @param resource The resource (e.g., 'user', 'product')
   * @returns boolean - true if permitted, false otherwise
   */
  public can(action: Action, resource: Resource): boolean {
    const grants = rbacConfig[this.userRole];

    if (!grants) {
      return false; // Role not found or has no grants
    }

    // Check for super admin/wildcard access
    const hasFullAccess = grants.some(
      grant => grant.resource === '*' && grant.actions.includes('*')
    );
    if (hasFullAccess) {
      return true;
    }

    // Check specific grants
    for (const grant of grants) {
      const resourceMatches = grant.resource === '*' || grant.resource === resource;
      const actionMatches = grant.actions.includes('*') || grant.actions.includes(action);

      if (resourceMatches && actionMatches) {
        return true;
      }
    }

    return false; // No matching grant found
  }
}