import BookingPage from "@features/booking/pages/booking-page";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const bookingSearchSchema = z.object({
  formTab: z.number().int().min(0).max(4).catch(0),
});

export const Route = createFileRoute("/booking")({
  component: RouteComponent,
  validateSearch: bookingSearchSchema,
});

function RouteComponent() {
  return <BookingPage />;
}
