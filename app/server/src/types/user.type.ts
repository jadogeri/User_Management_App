import { AuditType } from "./audit.type";

export type UserType = AuditType & {
    /**
   * The user's identifier.
   * @example "1"
   */
id: number
  /**
   * The user's username.
   * @example "John1Doe"
   */
  username: string
  /**
   * The user's email.
   * @pattern ^(.+)@(.+)$ please provide correct email
   * @example "JohnDoe@gmail.com"
   */
  email: string;
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
    /**
   * The user's failed login attempts.
   * @example 0
   */
  failedLogins: number;
    /**
   * The user's account status.
   * @example true
   */
  isEnabled: boolean;
}