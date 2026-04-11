import type { ThemeOptions } from "@mui/material";

// Color constants
export const colors = {
  primary: {
    main: "#7C96B1",
    contrastText: "#0F172A",
  },
  text: {
    primary: "#E5E7EB",
    secondary: "#B0B7C3",
    disabled: "#6B7280",
  },
} as const;

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: colors.primary.main,
      "100": "#1E2C3D",
      "200": "#2A3C52",
      "300": "#364B64",
      "400": "#415A77",
      "500": "#5B7695",
      "600": "#7C96B1",
      "700": "#A8BBD1",
      "800": "#C8D4E2",
      "900": "#E7ECF3",
      contrastText: colors.primary.contrastText,
    },
    grey: {
      50: "#1F2933",
      100: "#273340",
      200: "#374151",
      300: "#4B5563",
      400: "#6B7280",
      500: "#9CA3AF",
      600: "#D1D5DB",
      700: "#E5E7EB",
      800: "#F3F4F6",
      900: "#F9FAFB",
    },
    background: {
      default: "#0F172A",
      paper: "#1E2C3D",
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
  },
  shadows: [
    "none",
    "0 4px 12px rgba(0, 0, 0, 0.6)",
    "0 4px 8px rgba(0, 0, 0, 0.5)",
    "0 2px 6px rgba(0, 0, 0, 0.4)",
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
