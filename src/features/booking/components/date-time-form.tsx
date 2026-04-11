import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import type { Dayjs } from "dayjs";
import { useModal } from "@hooks/use-modal";
import type { UseBookingFormReturn } from "../hooks/use-booking-form";
import DatePickerDialog from "./date-picker-dialog";
import FormTitle from "./form-title";

// ─── Mock time slots ──────────────────────────────────────────────────────────

interface TimeSlot {
  label: string;
  disabled: boolean;
}

const TIME_SLOTS: TimeSlot[] = [
  { label: "10:00 AM", disabled: false },
  { label: "10:30 AM", disabled: false },
  { label: "11:00 AM", disabled: false },
  { label: "11:30 AM", disabled: true },
  { label: "2:00 PM", disabled: false },
  { label: "3:00 PM", disabled: false },
  { label: "3:30 PM", disabled: true },
  { label: "4:00 PM", disabled: false },
  { label: "4:30 PM", disabled: true },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface DateDisplayProps {
  date: Dayjs;
  onChangeClick: () => void;
}

const DateDisplay = ({ date, onChangeClick }: DateDisplayProps) => (
  <Box>
    <Typography
      variant="caption"
      sx={{
        fontWeight: 700,
        color: "text.disabled",
        letterSpacing: 0.8,
        mb: 1,
        display: "block",
      }}
    >
      DATE
    </Typography>
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        border: "1.5px solid",
        borderColor: "grey.200",
        borderRadius: 3,
        px: 2,
        py: 1.5,
        bgcolor: "background.paper",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <CalendarTodayOutlinedIcon
          sx={{ color: "primary.main", fontSize: 20 }}
        />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {date.format("dddd, MMMM D · YYYY")}
        </Typography>
      </Stack>
      <Button
        size="small"
        variant="text"
        onClick={onChangeClick}
        sx={{ fontWeight: 600, color: "primary.main", minWidth: "auto", px: 1 }}
      >
        Change
      </Button>
    </Stack>
  </Box>
);

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selected: string | null;
  onSelect: (label: string) => void;
}

const TimeSlotGrid = ({ slots, selected, onSelect }: TimeSlotGridProps) => (
  <Box>
    <Typography
      variant="caption"
      sx={{
        fontWeight: 700,
        color: "text.disabled",
        letterSpacing: 0.8,
        mb: 1.5,
        display: "block",
      }}
    >
      AVAILABLE TIMES
    </Typography>
    <Grid container spacing={1.5}>
      {slots.map((slot) => {
        const isSelected = slot.label === selected;
        return (
          <Grid key={slot.label} size={4}>
            <Button
              fullWidth
              variant={isSelected ? "contained" : "outlined"}
              disabled={slot.disabled}
              onClick={() => onSelect(slot.label)}
              sx={{
                borderRadius: 2.5,
                py: 1,
                fontWeight: isSelected ? 700 : 500,
                fontSize: "0.85rem",
                borderColor: slot.disabled
                  ? "grey.200"
                  : isSelected
                    ? undefined
                    : "grey.300",
                color: slot.disabled
                  ? "text.disabled"
                  : isSelected
                    ? "primary.contrastText"
                    : "text.primary",
                bgcolor: slot.disabled ? "grey.50" : undefined,
                "&:hover:not(:disabled)": {
                  borderColor: "primary.main",
                },
              }}
            >
              {slot.label}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  </Box>
);

// ─── Main component ───────────────────────────────────────────────────────────

interface DateTimeFormProps {
  bookingForm: UseBookingFormReturn;
  step: number;
  onStep: (nextStep: number) => void;
}

const DateTimeForm = ({ bookingForm, step, onStep }: DateTimeFormProps) => {
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } =
    bookingForm;
  const calendarModal = useModal();

  return (
    <Stack
      direction="column"
      spacing={3}
      sx={{ maxWidth: 480, mx: "auto", width: "100%" }}
    >
      <FormTitle
        title={`Select Date & Time`}
        subtitle="Choose an available slot below"
      />

      <DateDisplay date={selectedDate} onChangeClick={calendarModal.open} />

      <TimeSlotGrid
        slots={TIME_SLOTS}
        selected={selectedTime}
        onSelect={setSelectedTime}
      />

      <Button
        fullWidth
        variant="contained"
        size="large"
        disabled={!selectedTime}
        onClick={() => onStep(step + 1)}
        sx={{ borderRadius: 3, py: 1.5, fontWeight: 600, fontSize: "1rem" }}
      >
        Continue
      </Button>

      <DatePickerDialog
        modal={calendarModal}
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setSelectedTime(null);
        }}
      />
    </Stack>
  );
};

export default DateTimeForm;
