import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";

export interface BookingFormState {
  selectedServices: string[];
  selectedDate: Dayjs;
  selectedTime: string | null;
}

export interface UseBookingFormReturn extends BookingFormState {
  toggleService: (id: string) => void;
  setSelectedDate: (date: Dayjs) => void;
  setSelectedTime: (time: string | null) => void;
}

export const useBookingForm = (): UseBookingFormReturn => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return {
    selectedServices,
    selectedDate,
    selectedTime,
    toggleService,
    setSelectedDate,
    setSelectedTime,
  };
};
