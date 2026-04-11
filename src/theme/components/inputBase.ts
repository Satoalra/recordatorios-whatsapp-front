import type { Components, Theme } from "@mui/material/styles";

// TODO: Este codigo rompe otros estilos de input, hay que revisarlo despues
export const MuiInputBase: Components<Theme>["MuiInputBase"] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderRadius: 12,
      backgroundColor: theme.palette.background.paper,
      paddingLeft: 8,
      transition: "border-color 0.2s ease",
      "&:hover": {
        borderColor: theme.palette.primary[300],
      },
      "&.Mui-focused": {
        borderColor: theme.palette.primary[500],
      },
    }),
    input: {
      padding: "6px 8px",
    },
  },
};
