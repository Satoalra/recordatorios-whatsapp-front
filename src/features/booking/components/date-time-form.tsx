import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useModal } from "@hooks/use-modal";
import type { UseBookingFormReturn } from "../hooks/use-booking-form";
import DatePickerDialog from "./date-picker-dialog";
import FormTitle from "./form-title";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { useGetAviableSlots } from "../services/get-slots";

dayjs.locale("es");

// ─── Mock time slots ──────────────────────────────────────────────────────────

interface TimeSlot {
  start: string;
  end: string;
}

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
          {date.format("dddd, D [de] MMMM [del] YYYY")}
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
        const isSelected = slot.start === selected;
        return (
          <Grid key={slot.start} size={4}>
            <Button
              fullWidth
              variant={isSelected ? "contained" : "outlined"}
              onClick={() => onSelect(slot.start)}
              sx={{
                borderRadius: 2.5,
                py: 1,
                fontWeight: isSelected ? 700 : 500,
                fontSize: "0.85rem",
                borderColor: isSelected ? undefined : "grey.300",
                color: isSelected ? "primary.contrastText" : "text.primary",
                bgcolor: undefined,
                "&:hover:not(:disabled)": {
                  borderColor: "primary.main",
                },
              }}
            >
              {`${slot.start} - ${slot.end}`}
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
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedEmployee,
    selectedServices,
  } = bookingForm;

  const { data } = useGetAviableSlots({
    date: selectedDate.format("YYYY-MM-DD"),
    employeeId: selectedEmployee,
    serviceId: selectedServices,
  });

  const timeIntervals = data?.availableIntervals;

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
        slots={timeIntervals || []}
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
