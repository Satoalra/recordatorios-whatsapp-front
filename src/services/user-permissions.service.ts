import { useQuery } from "@tanstack/react-query";
import type { UserPermissions } from "../types/permissions.types";
import api from "@config/axios";

export const USER_PERMISSIONS_QUERY_KEY = "user-permissions";

export const useGetUserPermissions = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [USER_PERMISSIONS_QUERY_KEY],
    queryFn: async () => {
      const url = `/api/permissions/me`;
      const { data } = await api.get<UserPermissions>(url);
      return data;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
