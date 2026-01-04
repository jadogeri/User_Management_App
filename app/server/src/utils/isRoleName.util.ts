import { RoleNamesEnum } from "../types/role-names.type";

/**
 * Checks if the provided item is a valid role name from the RoleNamesEnum.
 * @param item - The item to be checked against the RoleNamesEnum values.
 * @returns True if the item is a valid role name, otherwise false.
 * Throws no exceptions.
 */
export function isRoleName(item: any): item is RoleNamesEnum {
  console.log("Checking role name:", item);
  let result = Object.values(RoleNamesEnum).includes(item);
  console.log("isRoleName result:", result);  
  return result;
}