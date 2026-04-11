import { createTheme, type Theme } from "@mui/material";
import {
  MuiAppBar,
  MuiButton,
  MuiIconButton,
  MuiPaper,
  MuiInputBase,
  MuiSelect,
  MuiCard,
  MuiChip,
  MuiPagination,
  MuiOutlinedInput,
} from "./components";

import { lightTheme, colors } from "./lightTheme";

export const theme: Theme = createTheme({
  palette: {
    ...lightTheme.palette,
  },
  shadows: lightTheme.shadows,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      color: colors.text.primary,
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3,
      color: colors.text.primary,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      color: colors.text.primary,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4,
      color: colors.text.primary,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: colors.text.primary,
    },
    body2: {
      fontSize: "0.9rem",
      lineHeight: 1.5,
      color: colors.text.secondary,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      color: colors.text.secondary,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      color: colors.primary.contrastText,
    },
    caption: { fontSize: "0.8rem", color: colors.text.disabled },
  },
  components: {
    MuiButton,
    MuiAppBar,
    MuiIconButton,
    MuiPaper,
    MuiInputBase,
    MuiOutlinedInput,
    MuiSelect,
    MuiCard,
    MuiChip,
    MuiPagination,
  },
});
