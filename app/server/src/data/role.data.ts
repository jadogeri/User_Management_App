import { Role } from "../entities/role.entity";
import { RoleDescriptionsEnum } from "../types/role-description.type";
import { RoleNamesEnum } from "../types/role-names.type";
import { permissions } from "./permission.data";

const [
  allPermissions,  userReadPermission, userCreatePermission, userUpdatePermission,
  userDeletePermission,  userAllPermission,
  authReadPermission, authUpdatePermission, authCreatePermission, authDeletePermission, authAllPermissions,
] = permissions;
const AdminRole = new Role();
const UserRole = new Role();
const ViewerRole = new Role();
const EditorRole = new Role();
AdminRole.id = 1;
AdminRole.name = RoleNamesEnum.ADMIN;
AdminRole.description = RoleDescriptionsEnum.ADMIN;
UserRole.id = 2;
UserRole.name = RoleNamesEnum.USER;
UserRole.description = RoleDescriptionsEnum.USER;
ViewerRole.id = 3;
ViewerRole.name = RoleNamesEnum.VIEWER;
ViewerRole.description = RoleDescriptionsEnum.VIEWER;
EditorRole.id = 4;
EditorRole.name = RoleNamesEnum.EDITOR;
EditorRole.description = RoleDescriptionsEnum.EDITOR;

//Assigning Permissions
AdminRole.permissions = [...new Set([    
    allPermissions, userCreatePermission, userReadPermission, userUpdatePermission,
    userDeletePermission, authCreatePermission, authReadPermission, authUpdatePermission,
              
])]
UserRole.permissions = [...new Set([
    userCreatePermission, userReadPermission, userUpdatePermission, 
    authReadPermission, authCreatePermission, authUpdatePermission, authDeletePermission
])]

EditorRole.permissions = [...new Set([
    userCreatePermission, userReadPermission, userUpdatePermission,
    authReadPermission, authCreatePermission, authUpdatePermission, authDeletePermission
])]

ViewerRole.permissions = [...new Set([
    userCreatePermission, userReadPermission,
    authReadPermission, authCreatePermission, authUpdatePermission, authDeletePermission

])]





export { AdminRole, UserRole, ViewerRole, EditorRole };