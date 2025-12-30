import User from "../entities/user.entity";

export type AuthType =  {
  /**
   * The auth's identifier.
   * @example "1"
   */
  id: number
  /**
   * The JWT refresh token.
   * @example "some-refresh-token"
   */
  refreshToken: string
  /**
   * The authenticated user.
   * @example "{ id: 1, username: 'johndoe', email: 'johndoe@example.com' }"
   */
  user: User
  /**
   * The date and time when the auth was created.
   * @format date-time
   * @example "2024-01-01T12:00:00.000Z"
   */
  createdAt: Date;
  /**
   * The date and time when the auth was last updated.
   * @format date-time
   * @example "2024-01-01T13:00:00.000Z"
   */
  updatedAt: Date;

}