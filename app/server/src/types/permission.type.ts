import Role from "../entities/role.entity";
import { Action, Resource } from "./rbac.type";

export type PermissionType =  {
    /**
   * The permission's identifier.
   * @example "1"
   */
  id: number
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
  /**
   * The resource the permission applies to.
   * @example "user"
   */
  resource: Resource
  /**
   * The action the permission allows.
   * @example "read"
   */
  action: Action

}