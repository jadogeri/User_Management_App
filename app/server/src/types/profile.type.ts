import { AuditType } from "./audit.type";

export type ProfileType = AuditType & {
    /**
   * The profile's identifier.
   * @example "1"
   */
  id: number
  /**
   * The profile's first name.
   * @example "John"
   */
  firstName?: string
  /**
   * The profile's last name.
   * @example "Doe"
   */
  lastName?: string
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
  age?: number;

/**
   * The profile's avatar URL.
   * @example "https://example.com/avatar.jpg"
   */
  avatarUrl?: string;
  /**
   * The profile's biography.
   * @example "Loves hiking and outdoor adventures."
   */
  bio?: string;
}

