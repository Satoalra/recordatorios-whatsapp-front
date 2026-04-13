import type { Action, Resource } from "./rbac.types";

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: Resource;
  action: Action;
}

export interface UserPermissions {
  permissions: Permission[];
}
