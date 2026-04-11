import type { Components, Theme } from "@mui/material/styles";

export const MuiSelect: Components<Theme>["MuiSelect"] = {
  styleOverrides: {
    select: ({ theme }: { theme: Theme }) => ({
      minWidth: 120,
      color: theme.palette.text.secondary,
      display: "flex",
      justifyContent: "space-between",
      padding: "8px",
    }),
    icon: ({ theme }: { theme: Theme }) => ({
      color: theme.palette.text.primary,
    }),
  },
};
