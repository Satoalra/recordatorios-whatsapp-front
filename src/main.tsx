import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./contexts/auth-context";

import { router } from "./routes/-router";
import AuthLoading from "./components/auth-loading";
import { CustomThemeProvider } from "@theme/ThemeProvider";
import { queryClient } from "@utils/query-client";

function InnerApp() {
  const { session, loading } = useAuth();

  // Esperar a que Supabase resuelva la sesión antes de renderizar el router
  if (loading) return <AuthLoading />;

  return <RouterProvider router={router} context={{ session, loading }} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CustomThemeProvider>
          <InnerApp />
        </CustomThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
