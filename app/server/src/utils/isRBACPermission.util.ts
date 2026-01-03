import { Action, RBACPermission, Resource } from "../types/rbac.type";

// Type guard for Fruit
export function isRBACPermission(val: string): val is RBACPermission {
  const [res, act] = val.split(':');
  
  const isValidResource = Object.values(Resource).includes(res as Resource);
  const isValidAction = Object.values(Action).includes(act as Action);    
  return isValidResource && isValidAction;
}