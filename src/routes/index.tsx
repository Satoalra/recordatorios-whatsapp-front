import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({
      to: "/login",
      replace: true,
    });
  }, [navigate]);

  return <div>Redirigiendo a login...</div>;
}
