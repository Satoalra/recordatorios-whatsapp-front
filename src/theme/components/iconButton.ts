import type { Components, Theme } from "@mui/material/styles";

export const MuiIconButton: Components<Theme>["MuiIconButton"] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,

      "&:hover": {
        backgroundColor: theme.palette.primary[100],
      },

      "&.MuiIconButton-colorPrimary": {
        color: theme.palette.primary.main,
      },

      "&.MuiIconButton-colorSecondary": {
        color: theme.palette.secondary.main,
      },
    }),
  },
};
