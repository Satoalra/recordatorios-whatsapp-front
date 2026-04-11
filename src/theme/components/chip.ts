import type { Components, Theme } from "@mui/material/styles";

export const MuiChip: Components<Theme>["MuiChip"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 999,
      fontWeight: 600,
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      backgroundColor: theme.palette.grey[900],
      color: theme.palette.primary.contrastText,
    }),

    outlined: ({ theme }) => ({
      borderColor: theme.palette.primary[500],
      backgroundColor: "transparent",
      color: theme.palette.primary[500],
    }),

    filled: ({ theme }) => ({
      backgroundColor: theme.palette.primary[500],
      color: theme.palette.primary.contrastText,
    }),

    label: {
      fontSize: "0.85rem",
      paddingInline: 4,
    },

    icon: ({ theme }) => ({
      color: theme.palette.text.secondary,
      fontSize: 18,
    }),
  },
};
