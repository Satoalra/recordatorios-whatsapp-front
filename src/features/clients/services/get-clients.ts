// Importas tu instancia configurada (ajusta la ruta según tu carpeta)
import api from "@config/axios";
import { useQuery } from "@tanstack/react-query";
import { buildQueryParams } from "@utils/query-params";
import type { Client } from "../types/client.types";
import type {
  PaginatedResponse,
  PaginationOptions,
} from "@types-custom/pagination.types";

const PAGINATED_CLIENTS_QUERY_KEY = "paginated-clients";

export interface PatientsQueryOptions extends PaginationOptions {
  order?: "ASC" | "DESC";
}

export const useGetClientsPaginated = (options: PatientsQueryOptions) => {
  return useQuery({
    queryKey: [PAGINATED_CLIENTS_QUERY_KEY, options],
    queryFn: async () => {
      const queryString = buildQueryParams({
        page: options.page,
        pageSize: options.pageSize,
        order: options.order,
      });
      const url = `/api/clients${queryString ? "?" + queryString : ""}`;

      try {
        const { data } = await api.get<PaginatedResponse<Client[]>>(url);

        return data;
      } catch (error) {
        console.error("Error en petición:", error);
        throw error;
      }
    },
  });
};
