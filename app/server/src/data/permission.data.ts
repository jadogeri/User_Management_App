// The metadata mapping for your application logic
import { Permission } from "../entities/permission.entity";
import { Resource, Action } from "../types/rbac.type";



export const PermissionLibrary: Record<string, { id: number; resource: Resource; action: Action; description: string }> = {
  ["*"]: { id: 1, resource: Resource.ALL, action: Action.ALL, description: "Full access to all resources." },
  ['USER_CREATE']: { id: 2, resource: Resource.USER, action: Action.CREATE, description: "Create new user." },
  ['USER_READ']: { id: 3, resource: Resource.USER, action: Action.READ, description: "Read own data." },
  ['USER_UPDATE']: { id:4 , resource: Resource.USER, action: Action.UPDATE, description: "Update own data." },
  ['USER_DELETE']: { id: 5, resource: Resource.USER, action: Action.DELETE, description: "Delete own record." },
  // ['USER_DEACTIVATE']: { id: 6, resource: Resource.USER, action: Action.MANAGE, description: "Deactivate own data." },
  // ['USER_REACTIVATE']: { id: 7, resource: Resource.USER, action: Action.MANAGE, description: "Reactivate own data." },
  ['USER_ALL']: { id: 8, resource: Resource.USER, action: Action.ALL, description: "Full access to user resource." },
  ['AUTH_READ']: { id: 9, resource: Resource.AUTH, action: Action.READ, description: "Read own auth data." },
  ['AUTH_UPDATE']: { id: 10, resource: Resource.AUTH, action: Action.UPDATE, description: "Update own auth data." },
  ['AUTH_CREATE']: { id: 11, resource: Resource.AUTH, action: Action.CREATE, description: "Create auth data." },
  ['AUTH_DELETE']: { id: 12, resource: Resource.AUTH, action: Action.DELETE, description: "Delete auth data." },
  ['AUTH_ALL']: { id: 13, resource: Resource.AUTH, action: Action.ALL, description: "Full access to auth resource." },
};

const allPermissions = new Permission();
allPermissions.id = PermissionLibrary["*"].id
allPermissions.description = PermissionLibrary["*"].description
allPermissions.resource = PermissionLibrary["*"].resource
allPermissions.action = PermissionLibrary["*"].action

const userCreatePermission = new Permission();
userCreatePermission.id = PermissionLibrary["USER_CREATE"].id
userCreatePermission.description = PermissionLibrary["USER_CREATE"].description
userCreatePermission.resource = PermissionLibrary["USER_CREATE"].resource
userCreatePermission.action = PermissionLibrary["USER_CREATE"].action

const userReadPermission = new Permission();
userReadPermission.id = PermissionLibrary["USER_READ"].id
userReadPermission.description = PermissionLibrary  ["USER_READ"].description
userReadPermission.resource = PermissionLibrary["USER_READ"].resource
userReadPermission.action = PermissionLibrary["USER_READ"].action

// const usersReadPermission = new Permission();
// usersReadPermission.id = PermissionLibrary["USERS_READ"].id
// usersReadPermission.description = PermissionLibrary["USERS_READ"].description 
// usersReadPermission.resource = PermissionLibrary["USERS_READ"].resource
// usersReadPermission.action = PermissionLibrary["USERS_READ"].action

const userUpdatePermission = new Permission();  
userUpdatePermission.id = PermissionLibrary["USER_UPDATE"].id
userUpdatePermission.description = PermissionLibrary["USER_UPDATE"].description
userUpdatePermission.resource = PermissionLibrary["USER_UPDATE"].resource
userUpdatePermission.action = PermissionLibrary["USER_UPDATE"].action

const userDeletePermission = new Permission();
userDeletePermission.id = PermissionLibrary["USER_DELETE"].id
userDeletePermission.description = PermissionLibrary["USER_DELETE"].description 
userDeletePermission.resource = PermissionLibrary["USER_DELETE"].resource
userDeletePermission.action = PermissionLibrary["USER_DELETE"].action

// const userDeactivatePermission = new Permission();
// userDeactivatePermission.id = PermissionLibrary["USER_DEACTIVATE"].id
// userDeactivatePermission.description = PermissionLibrary["USER_DEACTIVATE"].description
// userDeactivatePermission.resource = PermissionLibrary["USER_DEACTIVATE"].resource
// userDeactivatePermission.action = PermissionLibrary["USER_DEACTIVATE"].action

// const userReactivatePermission = new Permission();
// userReactivatePermission.id = PermissionLibrary["USER_REACTIVATE"].id
// userReactivatePermission.description = PermissionLibrary["USER_REACTIVATE"].description
// userReactivatePermission.resource = PermissionLibrary["USER_REACTIVATE"].resource
// userReactivatePermission.action = PermissionLibrary["USER_REACTIVATE"].action

const userAllPermission = new Permission();
userAllPermission.id = PermissionLibrary["USER_ALL"].id
userAllPermission.description = PermissionLibrary["USER_ALL"].description
userAllPermission.resource = PermissionLibrary["USER_ALL"].resource
userAllPermission.action = PermissionLibrary["USER_ALL"].action

const authReadPermission = new Permission();
authReadPermission.id = PermissionLibrary["AUTH_READ"].id
authReadPermission.description = PermissionLibrary["AUTH_READ"].description
authReadPermission.resource = PermissionLibrary["AUTH_READ"].resource
authReadPermission.action = PermissionLibrary["AUTH_READ"].action

const authUpdatePermission = new Permission();
authUpdatePermission.id = PermissionLibrary["AUTH_UPDATE"].id
authUpdatePermission.description = PermissionLibrary["AUTH_UPDATE"].description
authUpdatePermission.resource = PermissionLibrary["AUTH_UPDATE"].resource
authUpdatePermission.action = PermissionLibrary["AUTH_UPDATE"].action

const authCreatePermission = new Permission();
authCreatePermission.id = PermissionLibrary["AUTH_CREATE"].id
authCreatePermission.description = PermissionLibrary["AUTH_CREATE"].description
authCreatePermission.resource = PermissionLibrary["AUTH_CREATE"].resource
authCreatePermission.action = PermissionLibrary["AUTH_CREATE"].action

const authDeletePermission = new Permission();
authDeletePermission.id = PermissionLibrary["AUTH_DELETE"].id
authDeletePermission.description = PermissionLibrary["AUTH_DELETE"].description
authDeletePermission.resource = PermissionLibrary["AUTH_DELETE"].resource
authDeletePermission.action = PermissionLibrary["AUTH_DELETE"].action 

const authAllPermissions = new Permission();
authAllPermissions.id = PermissionLibrary["AUTH_ALL"].id
authAllPermissions.description = PermissionLibrary["AUTH_ALL"].description
authAllPermissions.resource = PermissionLibrary["AUTH_ALL"].resource
authAllPermissions.action = PermissionLibrary["AUTH_ALL"].action
export const permissions = [
  allPermissions,  userReadPermission, //usersReadPermission, 
  userCreatePermission, userUpdatePermission,
  userDeletePermission,  userAllPermission,
  authReadPermission, authUpdatePermission, authCreatePermission, authDeletePermission, authAllPermissions,

]