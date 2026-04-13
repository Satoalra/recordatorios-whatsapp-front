import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { RouterAuthContext } from "../types/auth";
import { MobileSidebarProvider } from "@contexts/mobile-sidebar";
import MainLayout from "@components/main-layout";

const RootLayout = () => (
  <>
    <MobileSidebarProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </MobileSidebarProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<RouterAuthContext>()({
  component: RootLayout,
});
