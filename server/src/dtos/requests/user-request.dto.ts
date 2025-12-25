// /**
//  * Represents a user create body object
//  */
// // export interface UserCreationBody extends Pick<UserType, "email" | "name" | "age">{}

import { UserType } from "../../types/userType.type";


/**
 * Represents a user object creation request.
 */
export interface UserRegisterRequestDTO extends Pick<UserType, "email" | "username" | "age" | "fullname" | "phone">{}
/**
 * Represents a user login request dto object.
 */
export interface UserLoginRequestDTO extends UserType{}
/**
 * Represents a user logout request dto object.
 */
export interface UserLogoutRequestDTO extends UserType{}
/**
 * Represents a user forgot password request dto object.
 */
export interface UserForgotPasswordRequestDTO extends UserType{}
/**
 * Represents a user reset password request dto object.
 */
export interface UserResetPasswordRequestDTO extends UserType{}
/**
 * Represents a user deactivate account request dto object.
 */
export interface UserDeactivateRequestDTO extends UserType{}


