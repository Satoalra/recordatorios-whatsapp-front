import type { Components, Theme } from "@mui/material/styles";
import { theme } from "@theme/theme";

export const MuiButton: Components<Theme>["MuiButton"] = {
  styleOverrides: {
    root: () => ({
      fontWeight: 600,
      borderRadius: 8,
      boxShadow: "none",
      minWidth: 0,
      [theme.breakpoints.up("lg")]: {
        minWidth: 120,
      },
      textTransform: "none",
    }),
    contained: ({ theme }) => ({
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    }),

    outlined: ({ theme }) => ({
      fontWeight: 500,
      borderColor: theme.palette.primary[300],
      color: theme.palette.primary[600],
    }),
    startIcon: {
      marginRight: 3,
    },
  },
};
