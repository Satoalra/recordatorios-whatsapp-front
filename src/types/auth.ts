import type { Session, User } from "@supabase/supabase-js";
import type { Action, Resource } from "./rbac.types";
import type { Permission } from "./permissions.types";

export interface AuthContext {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  permissions: Permission[];
  hasPermission: (resource: Resource, action: Action) => boolean;
  isLoadingPermissions: boolean;
  isAuthReady: boolean;
}

export interface RouterAuthContext {
  session: Session | null;
  loading: boolean;
}
