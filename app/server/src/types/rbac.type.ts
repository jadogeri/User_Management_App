

// permission.actions.ts
export enum Action {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage', // manage can be a wildcard for all actions
  ALL = '*',
}

// permission.resources.ts
export enum Resource {
  USER = 'user',
  USERS = 'users',
  AUTH = 'auth',
  PRODUCT = 'product',
  ORDER = 'order',
  PROJECT = 'project',
  INVOICE = 'invoice',
  DOCUMENT = 'document',
  SYSTEM = 'system',
  ALL = '*',
}

export type RBACPermission = `${Resource}:${Action}`;