import {
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
} from "@mui/material";
import type { FormControlProps, OutlinedInputProps } from "@mui/material";

interface FormInputProps extends FormControlProps {
  label?: string;
  errorMessage?: string;
  htmlFor?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  slotProps?: {
    input: OutlinedInputProps;
  };
}

const FormInput = ({
  label,
  errorMessage,
  htmlFor,
  fullWidth = true,
  slotProps,
  placeholder,
  type = "text",
  ...props
}: FormInputProps) => {
  const hasError = !!errorMessage;

  return (
    <FormControl
      variant="outlined"
      fullWidth={fullWidth}
      sx={{ flex: 1 }}
      {...props}
    >
      {label && (
        <FormLabel
          sx={{
            fontSize: 12,
            letterSpacing: 0.8,
            fontWeight: 700,
            color: "text.disabled",
            mb: 0.5,
          }}
          htmlFor={htmlFor}
        >
          {label}
        </FormLabel>
      )}
      <OutlinedInput
        id={htmlFor}
        type={type}
        error={hasError}
        placeholder={placeholder}
        {...(slotProps?.input || {})}
      />
      <FormHelperText error={hasError}>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default FormInput;
