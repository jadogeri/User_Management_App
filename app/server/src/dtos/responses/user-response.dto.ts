
import Role from "../../entities/role.entity";
import { RBACPermission } from "../../types/rbac.type";
import { UserType } from "../../types/user.type";

/**
 * Represents a user current response dto object.
 */
export interface UserCurrentResponseDTO {
  user  : {
    username: string;
    email: string;
    id: number;
    roles: Role[]
  },
  scopes: RBACPermission[],
  iat: number,
  exp: number
}

/**
 * Represents a user register response dto object.
 */
export interface UserCreateResponseDTO extends Omit<UserType, 'password'>{}
/**
 * Represents a user delete account response dto object.
 */
export interface UserDeleteResponseDTO extends UserType{}
/**
 * Represents a user deactivate account response dto object.
 */
export interface UserDeactivateResponseDTO extends UserType{}
/**
 * Represents a user reactivate account response dto object.
 */
export interface UserReactivateResponseDTO extends UserType{}


