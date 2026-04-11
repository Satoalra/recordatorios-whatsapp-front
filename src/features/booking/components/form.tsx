import CircularProgressWithLabel from "@components/circular-progress-with-label";
import { Stack, Step, StepButton, Stepper } from "@mui/material";
import { useScreenSize } from "@theme/useScreenSize";
import DateTimeForm from "./date-time-form";
import ServiceForm from "./service-form";
import { useBookingForm } from "../hooks/use-booking-form";

const steps = [
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

const Components: StepComponent[] = [ServiceForm, DateTimeForm];

const BookingForm = ({
  step,
  onStep,
}: {
  step: number;
  onStep: (nextStep: number) => void;
}) => {
  const { isMobile } = useScreenSize();
  const bookingForm = useBookingForm();

  const CurrentComponent = Components[step];

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Stack direction="column" gap={4}>
      {!isMobile ? (
        <Stepper nonLinear activeStep={step} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={`step-${index}`} completed={step > index}>
              <StepButton disableRipple onClick={() => onStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      ) : (
        <CircularProgressWithLabel
          label={`${step + 1}/${steps.length}`}
          value={progress}
          title={steps[step]}
        />
      )}

      <CurrentComponent bookingForm={bookingForm} step={step} onStep={onStep} />
    </Stack>
  );
};

export default BookingForm;
