import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    contrastText?: string;
  }

  interface PaletteColorOptions {
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    contrastText?: string;
  }

  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    grey: Record<
      50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
      string
    >;
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    grey?: Record<
      50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
      string
    >;
  }
}
