
import { UserType } from "../../types/userType.type";

/**
 * Represents a user register response dto object.
 */
export interface UserRegisterResponseDTO extends UserType{}
/**
 * Represents a user login response dto object.
 */
export interface UserLoginResponseDTO extends UserType{}
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



