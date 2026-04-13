import { useQuery } from "@tanstack/react-query";
import type { UserPermissions } from "../types/permissions.types";
import type { ApiResponse } from "@types-custom/api-response.types";
import api from "@config/axios";

export const USER_PERMISSIONS_QUERY_KEY = "user-permissions";

export const useGetUserPermissions = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [USER_PERMISSIONS_QUERY_KEY],
    queryFn: async () => {
      const url = `/api/users/me`;
      const { data } = await api.get<ApiResponse<UserPermissions>>(url);

      return data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
