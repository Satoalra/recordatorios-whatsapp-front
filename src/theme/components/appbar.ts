import type { Components, Theme } from "@mui/material/styles";

export const MuiAppBar: Components<Theme>["MuiAppBar"] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      backgroundColor: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: 0,
      boxShadow: "none",
      padding: `${theme.spacing(2)} 0`,
      color: theme.palette.text.primary,
      fontWeight: 700,
      backgroundImage: "none", // Deshabilita el overlay de MUI en modo dark
    }),
  },
};
