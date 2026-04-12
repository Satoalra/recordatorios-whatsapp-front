import { useNavigate, useSearch } from "@tanstack/react-router";
import dayjs, { type Dayjs } from "dayjs";

export interface BookingFormState {
  selectedEmployee: string;
  selectedServices: string[];
  selectedDate: Dayjs;
  selectedTime: string | null;
}

export interface UseBookingFormReturn extends BookingFormState {
  setSelectedEmployee: (employeeId: string) => void;
  toggleService: (id: string) => void;
  setSelectedDate: (date: Dayjs) => void;
  setSelectedTime: (time: string | null) => void;
}

export const useBookingForm = (): UseBookingFormReturn => {
  const { employeeId, serviceId, date } = useSearch({ from: "/booking" });
  const navigate = useNavigate({ from: "/booking" });

  const toggleService = (id: string) => {
    const currentServices = serviceId || [];
    const newServices = currentServices.includes(id)
      ? currentServices.filter((s) => s !== id)
      : [...currentServices, id];

    navigate({
      search: (prev) => ({ ...prev, serviceId: newServices }),
    });
  };

  const setSelectedEmployee = (id: string) => {
    navigate({
      search: (prev) => ({ ...prev, employeeId: id }),
    });
  };

  const setSelectedDate = (newDate: Dayjs) => {
    navigate({
      search: (prev) => ({ ...prev, date: newDate.format("YYYY-MM-DD") }),
    });
  };

  const setSelectedTime = (newTime: string | null) => {
    navigate({
      search: (prev) => ({ ...prev, time: newTime ?? undefined }),
    });
  };

  return {
    selectedEmployee: employeeId || "",
    selectedServices: serviceId || [],
    selectedDate: dayjs(date || dayjs()),
    selectedTime: "",
    setSelectedEmployee,
    toggleService,
    setSelectedDate,
    setSelectedTime,
  };
};
