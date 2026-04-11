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

  return <BookingForm step={formTab} onStep={setStep} />;
};

export default BookingPage;
