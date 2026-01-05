import { AuditType } from "./audit.type";

export type ProfileType = AuditType & {
    /**
   * The profile's identifier.
   * @example "1"
   */
id: number
  /**
   * The profile's full name.
   * @example "John Doe"
   */
  fullname?: string
  /**
   * The user's username.
   * @example "John1Doe"
   */
  username: string

  /**
   * The user's age.
   * @isInt we would kindly ask you to provide a number here
   * @minimum 0 minimum age is 0
   * @example 21
   */
  age: number;

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