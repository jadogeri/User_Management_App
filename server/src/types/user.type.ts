export type UserType =  {
    /**
   * The user's identifier.
   * @example "1"
   */
id: number
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
  /**
   * The user's phone number.
   * @example "123-456-7890"
   */
  phone: string;
  /**
   * The user's password.
   * @example "SecurePassword123!"
   */
  password: string;
}

