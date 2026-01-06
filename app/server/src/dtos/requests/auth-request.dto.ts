// /**
//  * Represents a user create body object
//  */
// // export interface UserCreationBody extends Pick<UserType, "email" | "name" | "age">{}

import { JwtPayloadInterface } from "../../interfaces/jwt-payload.interface";
import { AuthType } from "../../types/auth.type";
import { UserType } from "../../types/user.type";


/**
 * Represents a user login request dto object.
 */
export interface AuthLoginRequestDTO extends Request,Pick<UserType, "email" | "password">{}
/**
 * Represents a user logout request dto object.
 */
export interface AuthLogoutRequestDTO extends JwtPayloadInterface{}
/**
 * Represents a user forgot password request dto object.
 */
export interface AuthForgotPasswordRequestDTO extends UserType{}
/**
 * Represents a user reset password request dto object.
 */
export interface AuthResetPasswordRequestDTO extends Pick<UserType, "email">{
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
/**
 * Represents an auth refresh token request dto object.
 */
export interface AuthRefreshTokenRequestDTO extends Pick<AuthType, "refreshToken">{}
/**
 * Represents a user object creation request.
 */
export interface AuthRegisterRequestDTO extends Pick<UserType, "email" | "username" | "fullname" | "phone" | "password">{}

