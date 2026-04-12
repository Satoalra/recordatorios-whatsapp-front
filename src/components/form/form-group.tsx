import { Stack, type StackProps } from "@mui/material";

const FormGroup = (props: StackProps) => {
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      alignItems={{
        xs: "flex-start",
        sm: "center",
      }}
      gap={2}
      {...props}
    />
  );
};

export default FormGroup;
