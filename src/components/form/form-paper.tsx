import { Paper } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";

interface FormPaperProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  sx?: SxProps<Theme>;
}

const FormPaper = ({ children, onSubmit, sx }: FormPaperProps) => {
  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      sx={{
        padding: (theme) => theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        gap: (theme) => theme.spacing(2),
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};

export default FormPaper;
