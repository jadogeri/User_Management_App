// /**
//  * Represents a user create body object
//  */
// // export interface UserCreationBody extends Pick<UserType, "email" | "name" | "age">{}

import { UserType } from "../../types/userType.type";


/**
 * Represents a user object creation request.
 */
export interface UserCreationRequest extends Pick<UserType, "email" | "username" | "age" | "fullname" | "phone">{}