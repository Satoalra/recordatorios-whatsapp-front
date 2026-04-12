import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";

export interface BookingFormState {
  selectedEmployee: string;
  selectedServices: string[];
  selectedDate: Dayjs;
  selectedSlot: string | null;
  customerName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface UseBookingFormReturn extends BookingFormState {
  setSelectedEmployee: (employeeId: string) => void;
  toggleService: (id: string) => void;
  setSelectedDate: (date: Dayjs) => void;
  setSelectedSlot: (slot: string | null) => void;
  setCustomerName: (value: string) => void;
  setCustomerLastName: (value: string) => void;
  setCustomerPhone: (value: string) => void;
  setCustomerEmail: (value: string) => void;
}

export const useBookingForm = (): UseBookingFormReturn => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return {
    selectedEmployee,
    selectedServices,
    selectedDate,
    selectedSlot,
    customerName,
    customerLastName,
    customerPhone,
    customerEmail,
    setSelectedEmployee,
    toggleService,
    setSelectedDate,
    setSelectedSlot,
    setCustomerName,
    setCustomerLastName,
    setCustomerPhone,
    setCustomerEmail,
  };
};
