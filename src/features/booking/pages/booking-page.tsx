import { Box } from "@mui/material";
import BookingForm from "../components/form";
import { useNavigate, useSearch } from "@tanstack/react-router";

const BookingPage = () => {
  const { formTab } = useSearch({
    from: "/booking",
  });
  const navigate = useNavigate({ from: "/booking" });

  const setStep = (nextStep: number) => {
    navigate({
      search: (prev) => ({ ...prev, formTab: nextStep }),
    });
  };

  return (
    <Box sx={{ bgcolor: "white", p: 4, m: 4, borderRadius: 3 }}>
      <BookingForm step={formTab} onStep={setStep} onCancel={() => navigate({ to: "/" })} />
    </Box>
  );
};

export default BookingPage;
