import { Button, Divider, Stack, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { UseBookingFormReturn } from "../../hooks/use-booking-form";
import FormTitle from "../ui/form-title";
import FormInput from "@components/form/form-input";

const customerInfoSchema = z.object({
  customerName: z.string().min(1, "El nombre es requerido"),
  customerLastName: z.string().min(1, "El apellido es requerido"),
  customerPhone: z
    .string()
    .min(1, "El teléfono es requerido")
    .refine((val) => /^\d{7,15}$/.test(val), "Debes ingresar un numero válido"),
  customerEmail: z.email({ message: "El email debe ser válido" }),
});

type CustomerInfoSchema = z.infer<typeof customerInfoSchema>;

interface CustomerInfoFormProps {
  bookingForm: UseBookingFormReturn;
  step: number;
  onStep: (nextStep: number) => void;
}

const CustomerInfoForm = ({
  bookingForm,
  step,
  onStep,
}: CustomerInfoFormProps) => {
  const {
    customerName,
    customerLastName,
    customerPhone,
    customerEmail,
    setCustomerName,
    setCustomerLastName,
    setCustomerPhone,
    setCustomerEmail,
  } = bookingForm;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInfoSchema>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      customerName,
      customerLastName,
      customerPhone,
      customerEmail,
    },
  });

  const onSubmit = (data: CustomerInfoSchema) => {
    setCustomerName(data.customerName);
    setCustomerLastName(data.customerLastName);
    setCustomerPhone(data.customerPhone);
    setCustomerEmail(data.customerEmail);
    onStep(step + 1);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      gap={3}
      sx={{ maxWidth: 480, mx: "auto", width: "100%" }}
    >
      <FormTitle
        title="Información"
        subtitle="Déjanos saber cómo contactarte"
      />

      <Stack gap={2}>
        <FormInput
          label="NOMBRE"
          htmlFor="name-input"
          placeholder="nombre"
          error={!!errors.customerName}
          errorMessage={errors.customerName?.message}
          slotProps={{
            input: {
              ...register("customerName"),
            },
          }}
        />

        <FormInput
          label="APELLIDO"
          htmlFor="custumer-lastname-input"
          placeholder="apellido"
          error={!!errors.customerLastName}
          errorMessage={errors.customerLastName?.message}
          slotProps={{
            input: {
              ...register("customerLastName"),
            },
          }}
        />

        <FormInput
          label="TELÉFONO"
          htmlFor="custumer-phone-input"
          placeholder="teléfono"
          error={!!errors.customerPhone}
          errorMessage={errors.customerPhone?.message}
          slotProps={{
            input: {
              ...register("customerPhone"),
            },
          }}
        />

        <FormInput
          label="EMAIL"
          htmlFor="custumer-email-input"
          placeholder="email@example.com"
          error={!!errors.customerEmail}
          errorMessage={errors.customerEmail?.message}
          slotProps={{
            input: {
              ...register("customerEmail"),
            },
          }}
        />
      </Stack>

      <Divider>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          or
        </Typography>
      </Divider>

      <Button
        fullWidth
        variant="outlined"
        size="large"
        sx={{
          borderRadius: 3,
          py: 1.5,
          fontWeight: 600,
          fontSize: "1rem",
          borderColor: "grey.300",
          color: "text.primary",
        }}
      >
        Continue with existing account
      </Button>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ borderRadius: 3, py: 1.5, fontWeight: 600, fontSize: "1rem" }}
      >
        Continuar
      </Button>
    </Stack>
  );
};

export default CustomerInfoForm;
