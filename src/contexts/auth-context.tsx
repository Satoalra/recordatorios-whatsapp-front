import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../config/supabase";
import type { AuthContext as AuthContextType } from "../types/auth";
import {
  useGetUserPermissions,
  USER_PERMISSIONS_QUERY_KEY,
} from "@services/user-permissions.service";
import type { Action, Resource } from "@types-custom/rbac.types";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const { data, isLoading: isLoadingPermissions } = useGetUserPermissions(
    !!session?.access_token && !loading,
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (!session) {
        queryClient.removeQueries({ queryKey: [USER_PERMISSIONS_QUERY_KEY] });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  const hasPermission = useCallback(
    (action: Action, resource: Resource): boolean => {
      if (!data?.permissions) return false;

      return data.permissions.some((perm: string) => {
        return perm === `${action}:${resource}`;
      });
    },
    [data],
  );

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isAuthReady = useMemo(() => {
    if (loading) return false;
    if (!session) return true;
    return !isLoadingPermissions;
  }, [loading, session, isLoadingPermissions]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        permissions: data?.permissions ?? [],
        hasPermission,
        isLoadingPermissions,
        isAuthReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
