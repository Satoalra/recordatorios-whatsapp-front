import { Button, Stack } from "@mui/material";
import { useModal } from "@hooks/use-modal";
import type { UseBookingFormReturn } from "../hooks/use-booking-form";
import ServiceInfoDialog from "./service-info-dialog";

import ServiceCard from "./service-card";
import FormTitle from "./form-title";
import { useGetAviableServicesPaginated } from "../services/get-services";
import type { ServiceItem } from "../types/services.types";

// ─── Mock data ────────────────────────────────────────────────────────────────

interface ServiceFormProps {
  bookingForm: UseBookingFormReturn;
  step: number;
  onStep: (nextStep: number) => void;
}

const ServiceForm = ({ bookingForm, onStep, step }: ServiceFormProps) => {
  const { selectedServices, toggleService } = bookingForm;
  const { data } = useGetAviableServicesPaginated({
    page: 1,
    pageSize: 10,
    employeeId: "e34f27f5-8cd9-4651-9e07-5c74411fb4fd",
  });

  const services = data?.items;
  const serviceInfoModal = useModal<ServiceItem>();

  const selectedCount = selectedServices.length;

  return (
    <Stack
      direction="column"
      spacing={3}
      sx={{ maxWidth: 480, mx: "auto", width: "100%" }}
    >
      <FormTitle
        title="Servicios"
        subtitle=" What would you like to book today?"
      />

      <Stack spacing={2}>
        {services?.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={selectedServices.includes(service.id)}
            onToggle={toggleService}
            onInfo={serviceInfoModal.open}
          />
        ))}
      </Stack>

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={() => onStep(step + 1)}
        disabled={selectedCount === 0}
        sx={{ borderRadius: 3, py: 1.5, fontWeight: 600, fontSize: "1rem" }}
      >
        {selectedCount > 0
          ? `Continue · ${selectedCount} service${selectedCount > 1 ? "s" : ""}`
          : "Continue"}
      </Button>

      <ServiceInfoDialog modal={serviceInfoModal} />
    </Stack>
  );
};

export default ServiceForm;
