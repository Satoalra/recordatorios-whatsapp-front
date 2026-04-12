import { Button, Stack } from "@mui/material";
import type { UseBookingFormReturn } from "../hooks/use-booking-form";
import FormTitle from "./form-title";
import { useGetAviableEmployees } from "../services/get-employees";
import EmployeeCard from "./employee-card";

// ─── Mock data ────────────────────────────────────────────────────────────────

interface EmployeeFormProps {
  bookingForm: UseBookingFormReturn;
  step: number;
  onStep: (nextStep: number) => void;
}

const EmployeeForm = ({ bookingForm, onStep, step }: EmployeeFormProps) => {
  const { selectedEmployee, setSelectedEmployee } = bookingForm;
  const { data } = useGetAviableEmployees();

  const employees = data;
  const handleNext = () => {
    onStep(step + 1);
  };

  return (
    <Stack
      direction="column"
      spacing={3}
      sx={{ maxWidth: 480, mx: "auto", width: "100%" }}
    >
      <FormTitle
        title="Colaboradores"
        subtitle="What would you like to book today?"
      />

      <Stack gap={2}>
        {employees?.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            selected={selectedEmployee === employee.id}
            onSelect={setSelectedEmployee}
          />
        ))}
      </Stack>

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleNext}
        disabled={!selectedEmployee}
        sx={{ borderRadius: 3, py: 1.5, fontWeight: 600, fontSize: "1rem" }}
      >
        Continue
      </Button>
    </Stack>
  );
};

export default EmployeeForm;
