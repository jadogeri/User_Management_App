// /**
//  * Represents a user create body object
//  */
// // export interface UserCreationBody extends Pick<UserType, "email" | "name" | "age">{}

import { UserType } from "../../types/user.type";


/**
 * Represents a user object creation request.
 */
export interface UserCreateRequestDTO extends Pick<UserType, "email" | "username" | "age" | "fullname" | "phone" | "password">{}
/**
 * Represents a user retrieve request dto object.
 */
export interface UserReadRequestDTO extends Pick<UserType, "email" | "password">{
    confirmDeactivation: boolean;
}
/**
 * Represents a list of users retrieve request dto object.
 */
export interface UserReadsRequestDTO extends Pick<UserType, "email" | "password">{
    confirmDeactivation: boolean;
}
/**
 * Represents a user update request dto object.
 */
export interface UserUpdateRequestDTO extends Pick<UserType, "email" | "password">{
    confirmDeactivation: boolean;
}
/**
 * Represents a user delete request dto object.
 */
export interface UserDeleteRequestDTO extends Pick<UserType, "email" | "password">{
    confirmDeactivation: boolean;
}
/**
 * Represents a user deactivate account request dto object.
 */
export interface UserDeactivateRequestDTO extends Pick<UserType, "email" | "password">{
    confirmDeactivation: boolean;
}
/**
 * Represents a user reactivate account request dto object.
 */
export interface UserReactivateRequestDTO extends Pick<UserType, "email" | "password">{
    confirmDeactivation: boolean;
}


