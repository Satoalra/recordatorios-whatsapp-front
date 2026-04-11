import { createFileRoute } from "@tanstack/react-router";
import ClientsPage from "@features/clients/pages/clients";

export const Route = createFileRoute("/_protected/clients/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientsPage />;
}
