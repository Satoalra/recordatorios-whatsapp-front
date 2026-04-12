import { Box, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import BookingConfirmed from "./steps/booking-confirmed";
import CustomerInfoForm from "./steps/customer-info-form";
import DateTimeForm from "./steps/date-time-form";
import EmployeeForm from "./steps/employee-form";
import OrderSummaryForm from "./steps/order-summary-form";
import ServiceForm from "./steps/service-form";
import { useBookingForm } from "../hooks/use-booking-form";

const steps = [
  "Colaboradores",
  "Servicios",
  "Horarios",
  "Información",
  "Resumen",
  "Confirmación",
];

type StepComponent = React.ComponentType<{
  bookingForm: ReturnType<typeof useBookingForm>;
  onStep: (nextStep: number) => void;
  step: number;
}>;

const Components: StepComponent[] = [
  EmployeeForm,
  ServiceForm,
  DateTimeForm,
  CustomerInfoForm,
  OrderSummaryForm,
  BookingConfirmed,
];

const BookingForm = ({
  step,
  onStep,
  onCancel,
}: {
  step: number;
  onStep: (nextStep: number) => void;
  onCancel?: () => void;
}) => {
  const bookingForm = useBookingForm();

  const CurrentComponent = Components[step];

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Stack direction="column" gap={4}>
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <IconButton
            size="small"
            onClick={() => onStep(step - 1)}
            disabled={step === 0}
            sx={{ color: "text.primary" }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <Typography variant="body2" fontWeight={500}>
            Step {step + 1} of {steps.length}
          </Typography>

          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "text.secondary" }}
            onClick={onCancel}
          >
            Cancel
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ borderRadius: 4, height: 4 }}
        />
      </Box>

      <CurrentComponent bookingForm={bookingForm} step={step} onStep={onStep} />
    </Stack>
  );
};

export default BookingForm;
