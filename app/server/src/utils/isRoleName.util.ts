import { RoleNamesEnum } from "../types/role-names.type";

export function isRoleName(item: any): item is RoleNamesEnum {
  console.log("Checking role name:", item);
  let result = Object.values(RoleNamesEnum).includes(item);
  console.log("isRoleName result:", result);  
  return result;
}