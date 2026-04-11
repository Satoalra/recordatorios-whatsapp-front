import type { Components, Theme } from "@mui/material";

// TODO: Este codigo rompe otros estilos de input, hay que revisarlo despues
export const MuiOutlinedInput: Components<Theme>["MuiOutlinedInput"] = {
  styleOverrides: {
    root: () => ({
      borderRadius: 8,
    }),
    input: {
      padding: "8px",
    },
    inputMultiline: {
      padding: "0",
    },
  },
};
