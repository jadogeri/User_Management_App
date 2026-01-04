import { Action, RBACPermission, Resource } from "../types/rbac.type";

/**
 * Checks if the given string is a valid RBAC permission in the format "resource:action".
 * Validates both the resource and action against predefined enums.
 * 
 * @param val - The permission string to validate.
 * @returns True if the permission is valid, otherwise false.
 * 
 * @throws None
 */
export function isRBACPermission(val: string): val is RBACPermission {
  const [res, act] = val.split(':');
  
  const isValidResource = Object.values(Resource).includes(res as Resource);
  const isValidAction = Object.values(Action).includes(act as Action);    
  return isValidResource && isValidAction;
}