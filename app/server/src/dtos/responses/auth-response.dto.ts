
import { Role } from "../../entities/role.entity";
import { AuthType } from "../../types/auth.type";
import { RBACPermission } from "../../types/rbac.type";
import { UserType } from "../../types/user.type";


/**
 * Represents a user current response dto object.
 */
export interface AuthCurrentResponseDTO {
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
 * Represents a user login response dto object.
 */
export interface AuthLoginResponseDTO extends Pick<AuthType, "refreshToken">{
    accessToken: string;
}
/**
 * Represents a user logout response dto object.
 */
export interface AuthLogoutResponseDTO {
  message: string;
}
/**
 * Represents a user forgot password response dto object.
 */
export interface AuthForgotPasswordResponseDTO extends UserType{}
/**
 * Represents a user reset password response dto object.
 */
export interface AuthResetPasswordResponseDTO extends UserType{}
/**
 * Represents a user refresh token response dto object.
 */
export interface AuthRefreshTokenResponseDTO extends AuthLoginResponseDTO{}
/**
 * Represents a user register response dto object.
 */
export interface AuthRegisterResponseDTO extends Omit<UserType, 'password'>{}

