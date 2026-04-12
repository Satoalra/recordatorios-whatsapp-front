// Importas tu instancia configurada (ajusta la ruta según tu carpeta)
import api from "@config/axios";
import { useQuery } from "@tanstack/react-query";
import { buildQueryParams } from "@utils/query-params";
import type {
  PaginatedResponse,
  PaginationOptions,
} from "@types-custom/pagination.types";
import type { ServiceItem } from "../types/services.types";

const PAGINATED_AVIABLE_SERVICES_QUERY_KEY = "paginated-clients";

export interface PatientsQueryOptions extends PaginationOptions {
  employeeId: string;
}

export const useGetAviableServicesPaginated = (
  options: PatientsQueryOptions,
) => {
  return useQuery({
    queryKey: [PAGINATED_AVIABLE_SERVICES_QUERY_KEY, options],
    queryFn: async () => {
      const queryString = buildQueryParams({
        page: options.page,
        pageSize: options.pageSize,
        employeeId: options.employeeId,
      });
      const url = `/api/booking/1a16afef-a235-4212-937e-bb374d434b16/services?${queryString}`;

      try {
        const { data } = await api.get<PaginatedResponse<ServiceItem>>(url);

        return data;
      } catch (error) {
        throw error;
      }
    },
  });
};
