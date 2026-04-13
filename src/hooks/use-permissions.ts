import { useAuth } from "@contexts/auth-context";
import type { Resource, Action, TypedPermission } from "../types/rbac.types";

export const usePermissions = () => {
  const { permissions, hasPermission } = useAuth();

  const canAccessAny = (checks: TypedPermission[]): boolean => {
    return checks.some(({ resource, action }) =>
      hasPermission(resource, action),
    );
  };

  const canAccessAll = (checks: TypedPermission[]): boolean => {
    return checks.every(({ resource, action }) =>
      hasPermission(resource, action),
    );
  };

  const canAccess = (resource: Resource, action: Action): boolean => {
    return hasPermission(resource, action);
  };

  return {
    permissions,
    hasPermission,
    canAccess,
    canAccessAny,
    canAccessAll,
  };
};
