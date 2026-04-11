import type { Components, Theme } from "@mui/material/styles";

export const MuiPaper: Components<Theme>["MuiPaper"] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      borderRadius: 12,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
    }),
  },
};
