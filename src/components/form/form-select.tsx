import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { FormControlProps, SelectProps } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<FormControlProps, "children"> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  errorMessage?: string;
  htmlFor?: string;
  placeholder?: string;
  options: SelectOption[] | Record<string, string>;
  displayEmpty?: boolean;
  slotProps?: {
    select?: Omit<SelectProps, "value" | "onChange" | "onBlur">;
  };
  renderOption?: (option: SelectOption) => ReactNode;
}

const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  errorMessage,
  htmlFor,
  fullWidth = true,
  options,
  placeholder,
  displayEmpty = false,
  slotProps,
  renderOption,
  ...props
}: FormSelectProps<TFieldValues, TName>) => {
  const hasError = !!errorMessage;

  const normalizedOptions: SelectOption[] = Array.isArray(options)
    ? options
    : Object.entries(options).map(([value, label]) => ({ value, label }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl
          variant="outlined"
          fullWidth={fullWidth}
          error={hasError}
          sx={{ flex: 1 }}
          {...props}
        >
          {label && (
            <FormLabel
              sx={{
                color: (theme) => theme.palette.grey[600],
                mb: (theme) => theme.spacing(1),
              }}
              htmlFor={htmlFor}
            >
              {label}
            </FormLabel>
          )}
          <Select
            {...field}
            id={htmlFor}
            displayEmpty={displayEmpty}
            error={hasError}
            MenuProps={{
              disablePortal: false,
              keepMounted: false,
            }}
            {...(slotProps?.select || {})}
          >
            {placeholder && displayEmpty && (
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
            )}
            {normalizedOptions.map((option) =>
              renderOption ? (
                renderOption(option)
              ) : (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ),
            )}
          </Select>
          <FormHelperText error={hasError}>{errorMessage}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
