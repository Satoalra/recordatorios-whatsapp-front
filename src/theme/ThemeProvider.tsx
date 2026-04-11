import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  useState,
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { theme as staticTheme } from "./theme";

// Context type
interface ColorModeContextType {
  colorMode: "light" | "dark";
  toggleColorMode: () => void;
}

// Create context
const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined,
);

// Create custom hook
export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a CustomThemeProvider");
  }
  return context;
};

// Provider props
interface CustomThemeProviderProps {
  children: ReactNode;
}

// Create provider
export function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleColorMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, colorMode: mode }}>
      <ThemeProvider theme={staticTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
