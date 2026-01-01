import Role from "../entities/role.entity";
import { PermissionNamesEnum } from "./permission-names.type";

export type PermissionType =  {
    /**
   * The permission's identifier.
   * @example "1"
   */
  id: number
  /**
   * The permissions's  name.
   * @example "READ_USER"
   */
  name: PermissionNamesEnum
  /**
   * The permission's description.
   * @example "user can featch data"
   */
  description: string
  /**
   * The user's list of roles.
   * @example Role
   */
  roles: Role[];

}