export type UserType =  {
  /**
   * The user's name.
   * @example "John Doe"
   */
  fullname: string
  /**
   * The user's name.
   * @example "John Doe"
   */
  username: string
  /**
   * The user's email.
   * @pattern ^(.+)@(.+)$ please provide correct email
   * @example "JohnDoe@gmail.com"
   */
  email: string;
  /**
   * The user's age.
   * @isInt we would kindly ask you to provide a number here
   * @minimum 0 minimum age is 0
   * @example 21
   */
  age: number;
  /**
   * The date and time when the user was created.
   * @format date-time
   * @example "2024-01-01T12:00:00.000Z"
   */
  createdAt: Date;
  /**
   * The date and time when the user was last updated.
   * @format date-time
   * @example "2024-01-01T13:00:00.000Z"
   */
  updatedAt: Date;
}

// /**
//  * Represents a user create body object
//  */
// // export interface UserCreationBody extends Pick<UserType, "email" | "name" | "age">{}

// // /**
// //  * Represents a user update body object
// //  */
// // export interface UserUpdateBody extends Partial<Pick<UserType, "email" | "name" | "age">>{}
