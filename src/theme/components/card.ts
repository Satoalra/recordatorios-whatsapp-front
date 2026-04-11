import type { Components, Theme } from "@mui/material/styles";

export const MuiCard: Components<Theme>["MuiCard"] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      display: "flex",
      flexDirection: "row",
      gap: theme.spacing(2),
      borderRadius: 12,
      padding: theme.spacing(2),
      boxShadow: "4px 4px 12px rgba(65, 90, 119, 0.1)",
      backgroundColor: theme.palette.background.paper,
      transition: "box-shadow 0.3s ease",
      "&:hover": {
        boxShadow: theme.shadows[1],
      },
    }),
  },
};
