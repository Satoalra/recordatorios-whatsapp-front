import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckIcon from "@mui/icons-material/Check";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import type { UseBookingFormReturn } from "../../hooks/use-booking-form";

interface ConfirmRowProps {
  label: string;
  value: string;
}

const ConfirmRow = ({ label, value }: ConfirmRowProps) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 600 }}>
      {value}
    </Typography>
  </Stack>
);

interface BookingConfirmedProps {
  bookingForm: UseBookingFormReturn;
  step: number;
  onStep: (nextStep: number) => void;
}

const BookingConfirmed = ({ bookingForm }: BookingConfirmedProps) => {
  const { selectedDate, selectedSlot } = bookingForm;

  const formattedWhen = `${selectedDate.format("ddd, MMM D")} · ${selectedSlot || "—"}`;

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={3}
      sx={{ maxWidth: 480, mx: "auto", width: "100%" }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          bgcolor: "success.100",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckIcon sx={{ color: "success.main", fontSize: 36 }} />
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
          Booking Confirmed!
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Your appointment is all set
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          border: "1.5px solid",
          borderColor: "grey.200",
          borderRadius: 3,
          px: 2.5,
          py: 2,
        }}
      >
        <Stack spacing={1.5}>
          <ConfirmRow label="Service" value="Massage · 60 min" />
          <Divider />
          <ConfirmRow label="When" value={formattedWhen} />
          <Divider />
          <ConfirmRow label="Business" value="Spark Studio" />
        </Stack>
      </Box>

      <Button
        fullWidth
        variant="outlined"
        size="large"
        startIcon={<CalendarMonthOutlinedIcon />}
        sx={{
          borderRadius: 3,
          py: 1.5,
          fontWeight: 600,
          fontSize: "1rem",
          borderColor: "grey.300",
          color: "text.primary",
        }}
      >
        Add to Google Calendar
      </Button>

      <Stack
        direction="row"
        alignItems="flex-start"
        spacing={1.5}
        sx={{
          width: "100%",
          bgcolor: "success.50",
          border: "1px solid",
          borderColor: "success.200",
          borderRadius: 2,
          px: 2,
          py: 1.5,
        }}
      >
        <WhatsAppIcon
          sx={{ color: "success.700", fontSize: 20, flexShrink: 0, mt: 0.25 }}
        />
        <Typography
          variant="body2"
          sx={{ color: "success.900", fontStyle: "italic" }}
        >
          You'll receive a WhatsApp reminder 2h before your appointment
        </Typography>
      </Stack>
    </Stack>
  );
};

export default BookingConfirmed;
