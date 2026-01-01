
import { UserType } from "../../types/user.type";

/**
 * Represents a user register response dto object.
 */
export interface UserRegisterResponseDTO extends Omit<UserType, 'password'>{}

/**
 * Represents a user login response dto object.
 */
export interface UserLoginResponseDTO {
    accessToken: string;
}
/**
 * Represents a user logout response dto object.
 */
export interface UserLogoutResponseDTO extends UserType{}
/**
 * Represents a user forgot password response dto object.
 */
export interface UserForgotPasswordResponseDTO extends UserType{}
/**
 * Represents a user reset password response dto object.
 */
export interface UserResetPasswordResponseDTO extends UserType{}
/**
 * Represents a user deactivate account response dto object.
 */
export interface UserDeactivateResponseDTO extends UserType{}



