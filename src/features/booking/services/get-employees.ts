// Importas tu instancia configurada (ajusta la ruta según tu carpeta)
import api from "@config/axios";
import { useQuery } from "@tanstack/react-query";
import type { EmployeeItem } from "../types/employees.types";

const EMPLOYEES_QUERY_KEY = "paginated-clients";

export const useGetAviableEmployees = () => {
  return useQuery({
    queryKey: [EMPLOYEES_QUERY_KEY],
    queryFn: async () => {
      const url = `/api/booking/1a16afef-a235-4212-937e-bb374d434b16/employees`;

      try {
        const { data } = await api.get<EmployeeItem[]>(url);

        return data;
      } catch (error) {
        throw error;
      }
    },
  });
};
