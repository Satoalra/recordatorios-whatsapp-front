import type {
  Action,
  Resource,
  TypedPermission,
} from "@types-custom/rbac.types";
import { type ReactNode } from "react";
import NotAuthorized from "./not-authorized";
import { useAuth } from "@contexts/auth-context";
import { usePermissions } from "@hooks/use-permissions";

interface ProtectedProps {
  children: ReactNode;
  resource?: Resource;
  action?: Action;
  fallback?: ReactNode;
  requireAll?: boolean;
  permissions?: TypedPermission[];
}

const Protected = ({
  children,
  resource,
  action,
  fallback,
  requireAll = false,
  permissions,
}: ProtectedProps) => {
  const { isAuthReady, session } = useAuth();
  const { hasPermission, canAccessAll, canAccessAny } = usePermissions();

  if (!isAuthReady) return null;

  // Sin sesión activa: denegar siempre
  if (!session) {
    return <>{fallback !== undefined ? fallback : <NotAuthorized />}</>;
  }

  const defaultFallback = fallback !== undefined ? fallback : <NotAuthorized />;

  // Sin restricción de permiso específico: cualquier usuario autenticado pasa
  const noPermissionRequired =
    (!permissions || permissions.length === 0) && !resource && !action;

  if (noPermissionRequired) return <>{children}</>;

  let hasAccess = false;

  if (permissions && permissions.length > 0) {
    hasAccess = requireAll
      ? canAccessAll(permissions)
      : canAccessAny(permissions);
  } else if (resource && action) {
    hasAccess = hasPermission(resource, action);
  }

  return hasAccess ? <>{children}</> : <>{defaultFallback}</>;
};

export default Protected;
