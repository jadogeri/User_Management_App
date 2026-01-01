// The metadata mapping for your application logic
import { PermissionNamesEnum } from "../types/permission-names.type";
import { Permission } from "../entities/permission.entity";
export const PermissionInfo: Record<PermissionNamesEnum, { id: number; name: string; description: string }> = {
  [PermissionNamesEnum.USER_CREATE]: { id: 1, name: PermissionNamesEnum["USER_CREATE"], description: "Create new user." },
  [PermissionNamesEnum.USER_READ]: { id: 2, name: PermissionNamesEnum["USER_READ"], description: "Read own data." },
  [PermissionNamesEnum.USERS_READ]: { id: 3, name: PermissionNamesEnum["USERS_READ"], description: "Read all users." },
  [PermissionNamesEnum.USER_UPDATE]: { id: 4, name: PermissionNamesEnum["USER_UPDATE"], description: "Update own data." },
  [PermissionNamesEnum.USER_DELETE]: { id: 5, name: PermissionNamesEnum["USER_DELETE"], description: "Delete own record." },
  [PermissionNamesEnum.USER_DEACTIVATE]: { id: 6, name: PermissionNamesEnum["USER_DEACTIVATE"], description: "Deactivate own data." },
  [PermissionNamesEnum.USER_REACTIVATE]: { id: 7, name: PermissionNamesEnum["USER_REACTIVATE"], description: "Reactivate own data." },
};

const userCreatePermission = new Permission();
userCreatePermission.id = PermissionInfo["USER_CREATE"].id
userCreatePermission.description = PermissionInfo["USER_CREATE"].description
userCreatePermission.name = PermissionNamesEnum.USER_CREATE

const userReadPermission = new Permission();
userReadPermission.id = PermissionInfo["USER_READ"].id
userReadPermission.description = PermissionInfo["USER_READ"].description
userReadPermission.name = PermissionNamesEnum.USER_READ

const usersReadPermission = new Permission();
usersReadPermission.id = PermissionInfo["USERS_READ"].id
usersReadPermission.description = PermissionInfo["USERS_READ"].description
usersReadPermission.name = PermissionNamesEnum.USERS_READ

const userUpdatePermission = new Permission();
userUpdatePermission.id = PermissionInfo["USER_UPDATE"].id
userUpdatePermission.description = PermissionInfo["USER_UPDATE"].description
userUpdatePermission.name = PermissionNamesEnum.USER_UPDATE

const userDeletePermission = new Permission();
userDeletePermission.id = PermissionInfo["USER_DELETE"].id
userDeletePermission.description = PermissionInfo["USER_DELETE"].description
userDeletePermission.name = PermissionNamesEnum.USER_DELETE

const userDeactivatePermission = new Permission();
userDeactivatePermission.id = PermissionInfo["USER_DEACTIVATE"].id
userDeactivatePermission.description = PermissionInfo["USER_DEACTIVATE"].description
userDeactivatePermission.name = PermissionNamesEnum.USER_DEACTIVATE

const userReactivatePermission = new Permission();
userReactivatePermission.id = PermissionInfo["USER_REACTIVATE"].id
userReactivatePermission.description = PermissionInfo["USER_REACTIVATE"].description
userReactivatePermission.name = PermissionNamesEnum.USER_REACTIVATE

export {
    userReadPermission, usersReadPermission, userCreatePermission, userUpdatePermission, userDeletePermission,
    userDeactivatePermission, userReactivatePermission

}