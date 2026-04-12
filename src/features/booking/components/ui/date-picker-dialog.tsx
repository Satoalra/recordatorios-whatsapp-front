import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import ResponsiveDialog from "@components/responsive-dialog";
import { useScreenSize } from "@theme/useScreenSize";
import type { UseModalReturn } from "@hooks/use-modal";

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEK_DAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

// ─── CalendarPicker ───────────────────────────────────────────────────────────

interface CalendarPickerProps {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}

const CalendarPicker = ({ value, onChange }: CalendarPickerProps) => {
  const [viewMonth, setViewMonth] = useState(value.startOf("month"));
  const today = dayjs().startOf("day");

  const firstDayOfWeek = viewMonth.day();
  const daysInMonth = viewMonth.daysInMonth();

  const cells: (Dayjs | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => viewMonth.date(i + 1)),
  ];

  return (
    <Box>
      {/* Month navigation */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <IconButton
          size="small"
          onClick={() => setViewMonth((m) => m.subtract(1, "month"))}
          disabled={viewMonth.isSame(today.startOf("month"), "month")}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {viewMonth.format("MMMM YYYY")}
        </Typography>
        <IconButton
          size="small"
          onClick={() => setViewMonth((m) => m.add(1, "month"))}
        >
          <ChevronRightIcon />
        </IconButton>
      </Stack>

      {/* Weekday headers */}
      <Grid container columns={7} sx={{ mb: 0.5 }}>
        {WEEK_DAYS.map((d) => (
          <Grid key={d} size={1}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                color: "text.disabled",
                fontWeight: 600,
              }}
            >
              {d}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Day cells */}
      <Grid container columns={7}>
        {cells.map((day, i) => {
          if (!day) return <Grid key={`empty-${i}`} size={1} />;

          const isPast = day.isBefore(today);
          const isSelected = day.isSame(value, "day");
          const isToday = day.isSame(today, "day");

          return (
            <Grid key={day.format("YYYY-MM-DD")} size={1}>
              <Box
                component="button"
                onClick={() => !isPast && onChange(day)}
                disabled={isPast}
                sx={{
                  width: "100%",
                  aspectRatio: "1",
                  border: "none",
                  borderRadius: "50%",
                  cursor: isPast ? "default" : "pointer",
                  bgcolor: isSelected
                    ? "primary.main"
                    : isToday
                      ? "primary.100"
                      : "transparent",
                  color: isSelected
                    ? "primary.contrastText"
                    : isPast
                      ? "text.disabled"
                      : "text.primary",
                  fontWeight: isSelected || isToday ? 700 : 400,
                  fontSize: "0.875rem",
                  transition: "background-color 0.15s",
                  "&:hover:not(:disabled)": {
                    bgcolor: isSelected ? "primary.main" : "grey.100",
                  },
                  "&:disabled": { opacity: 0.4 },
                }}
              >
                {day.date()}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

// ─── DatePickerDialog ─────────────────────────────────────────────────────────

interface DatePickerDialogProps {
  modal: UseModalReturn;
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}

const DatePickerDialog = ({
  modal,
  value,
  onChange,
}: DatePickerDialogProps) => {
  const { isOpen, close } = modal;
  const { isMobile } = useScreenSize();
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (isOpen) setDraft(value);
  }, [isOpen, value]);

  const handleConfirm = () => {
    onChange(draft);
    close();
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onClose={close}
      variant="dialog"
      maxWidth="xs"
      fullWidth
    >
      <Box sx={{ px: 3, py: 2 }}>
        {isMobile && (
          <Box
            sx={{
              width: 40,
              height: 4,
              borderRadius: 2,
              bgcolor: "grey.300",
              mx: "auto",
              mb: 2,
            }}
          />
        )}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Select a date
          </Typography>
          <IconButton
            size="small"
            onClick={close}
            sx={{ color: "text.disabled" }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <CalendarPicker value={draft} onChange={setDraft} />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleConfirm}
          sx={{ borderRadius: 3, py: 1.5, fontWeight: 600, mt: 3 }}
        >
          Confirm date
        </Button>
      </Box>
    </ResponsiveDialog>
  );
};

export default DatePickerDialog;
