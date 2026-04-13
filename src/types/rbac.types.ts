/**
 * RBAC (Role-Based Access Control) Types
 *
 * Define los recursos y acciones del sistema de permisos.
 * Los permisos son asignados por rol en el backend:
 *   - admin: acceso completo
 *   - colaborador: acceso limitado según configuración
 */

// =============================================
// RESOURCES - Recursos del sistema
// =============================================
export const RESOURCES = {
  APPOINTMENTS: "appointments",
  CLIENTS: "clients",
  SETTINGS: "settings",
  EMPLOYEES: "employees",
  SERVICES: "services",
  ROLES: "roles",
  USERS: "users",
} as const;

export type Resource = (typeof RESOURCES)[keyof typeof RESOURCES];

// =============================================
// ACTIONS - Acciones sobre recursos
// =============================================
export const ACTIONS = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
  MANAGE: "manage",
  OVERRIDE: "override",
} as const;

export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];

// =============================================
// PERMISSION - Combinación tipada de resource + action
// =============================================
export interface TypedPermission {
  resource: Resource;
  action: Action;
}

// =============================================
// TYPE GUARDS
// =============================================
export const isValidResource = (resource: string): resource is Resource => {
  return Object.values(RESOURCES).includes(resource as Resource);
};

export const isValidAction = (action: string): action is Action => {
  return Object.values(ACTIONS).includes(action as Action);
};
