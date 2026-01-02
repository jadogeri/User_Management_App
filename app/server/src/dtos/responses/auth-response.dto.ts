
import { AuthType } from "../../types/auth.type";
import { UserType } from "../../types/user.type";


/**
 * Represents a user login response dto object.
 */
export interface AuthLoginResponseDTO {
    accessToken: string;
}
/**
 * Represents a user logout response dto object.
 */
export interface AuthLogoutResponseDTO extends UserType{}
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
export interface AuthRefreshTokenResponseDTO extends Pick<AuthType, "refreshToken">{
    accessToken: string;
}

