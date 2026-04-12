import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import type { UseBookingFormReturn } from "../../hooks/use-booking-form";
import FormTitle from "../ui/form-title";

interface SummaryRowProps {
  label: string;
  value: string;
  valueRight?: string;
}

const SummaryRow = ({ label, value, valueRight }: SummaryRowProps) => (
  <Box>
    <Typography
      variant="caption"
      sx={{
        fontWeight: 700,
        color: "text.disabled",
        letterSpacing: 0.8,
        display: "block",
        mb: 0.25,
      }}
    >
      {label}
    </Typography>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
      {valueRight && (
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {valueRight}
        </Typography>
      )}
    </Stack>
  </Box>
);

interface OrderSummaryFormProps {
  bookingForm: UseBookingFormReturn;
  step: number;
  onStep: (nextStep: number) => void;
}

const OrderSummaryForm = ({
  bookingForm,
  step,
  onStep,
}: OrderSummaryFormProps) => {
  const { selectedDate, selectedSlot } = bookingForm;

  const formattedDate = selectedDate.format("ddd, MMMM D");
  const formattedTime = selectedSlot || "—";

  return (
    <Stack
      direction="column"
      spacing={3}
      sx={{ maxWidth: 480, mx: "auto", width: "100%" }}
    >
      <FormTitle title="Order Summary" subtitle="Review your booking details" />

      <Box
        sx={{
          border: "1.5px solid",
          borderColor: "grey.200",
          borderRadius: 3,
          px: 2.5,
          py: 2,
        }}
      >
        <Stack spacing={2}>
          <SummaryRow label="SERVICIO" value="Massage" valueRight="$65.00" />
          <Divider />
          <SummaryRow label="FECHA" value={formattedDate} />
          <Divider />
          <SummaryRow label="HORA" value={formattedTime} />
          <Divider />
          <SummaryRow label="NEGOCIO" value="Spark Studio" />
        </Stack>
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          bgcolor: "primary.50",
          borderRadius: 2,
          px: 2.5,
          py: 1.5,
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          Total
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          $65.00
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          bgcolor: "warning.50",
          border: "1px solid",
          borderColor: "warning.200",
          borderRadius: 2,
          px: 2,
          py: 1.5,
        }}
      >
        <WhatsAppIcon
          sx={{ color: "warning.700", fontSize: 20, flexShrink: 0 }}
        />
        <Typography variant="body2" sx={{ color: "warning.900" }}>
          You'll receive a WhatsApp & Email confirmation
        </Typography>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={() => onStep(step + 1)}
        sx={{ borderRadius: 3, py: 1.5, fontWeight: 600, fontSize: "1rem" }}
      >
        Confirm Booking
      </Button>
    </Stack>
  );
};

export default OrderSummaryForm;
