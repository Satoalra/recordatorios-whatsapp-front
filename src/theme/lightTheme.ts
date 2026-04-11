import type { ThemeOptions } from "@mui/material";

// Color constants
export const colors = {
  primary: {
    main: "#415A77",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#303030",
    secondary: "#626262",
    disabled: "#8B8B8B",
  },
} as const;

export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: colors.primary.main,
      "100": "#E7ECF3",
      "200": "#C8D4E2",
      "300": "#A8BBD1",
      "400": "#7C96B1",
      "500": "#5B7695",
      "600": "#415A77",
      "700": "#364B64",
      "800": "#2A3C52",
      "900": "#1E2C3D",
      contrastText: colors.primary.contrastText,
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    background: { default: "#F2F6FB", paper: "#ffffff" },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
  },
  shadows: [
    "none",
    "4px 4px 12px rgba(65, 90, 119, 0.1)", // shadow[1]
    "0 4px 8px rgba(0, 0, 0, 0.08)", // shadow[2]
    "0 2px 6px rgba(65, 90, 119, 0.06)", // shadow[3]
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ] as const,
};
