import User from "../entities/user.entity";

import { AuditType } from "./audit.type";

export type AuthType = AuditType & {
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

}

