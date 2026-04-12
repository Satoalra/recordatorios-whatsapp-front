// Importas tu instancia configurada (ajusta la ruta según tu carpeta)
import api from "@config/axios";
import { useQuery } from "@tanstack/react-query";
import type { SlotsResponse } from "../types/slots.types";

const PAGINATED_AVIABLE_SLOTS_QUERY_KEY = "paginated-clients";

export interface PatientsQueryOptions {
  date: string;
  serviceId: string[];
  employeeId: string;
}

export const useGetAviableSlots = (options: PatientsQueryOptions) => {
  return useQuery({
    queryKey: [PAGINATED_AVIABLE_SLOTS_QUERY_KEY, options],
    queryFn: async () => {
      const url = `/api/booking/1a16afef-a235-4212-937e-bb374d434b16/slots`;
      const params = {
        date: options.date,
        employeeId: options.employeeId,
        serviceId: options.serviceId,
      };

      try {
        const { data } = await api.get<SlotsResponse>(url, {
          params,
          paramsSerializer: {
            indexes: null,
          },
        });

        return data;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!options.serviceId && !!options.employeeId,
  });
};
