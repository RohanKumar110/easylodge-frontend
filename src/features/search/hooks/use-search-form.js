import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validators/search-form-validator";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import PATHS from "@/config/path.config";
import { useForm } from "react-hook-form";

function useSearchForm() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      city: "",
      bookingDates: {
        from: dayjs().toDate(),
        to: dayjs().add(1, "day").toDate(),
      },
      roomsCount: 1,
    },
  });

  function handleSignInFormSubmit(data) {
    const formattedData = {
      city: data.city,
      roomsCount: data.roomsCount,
      startDate: dayjs(data.bookingDates.from).format("YYYY-MM-DD"),
      endDate: dayjs(data.bookingDates.to).format("YYYY-MM-DD"),
    };
    const params = new URLSearchParams(formattedData);
    navigate(`${PATHS.SEARCH_HOTELS}?${params.toString()}`);
  }

  function handleSignInFormError(errors) {
    const firstError = Object.values(errors)[0];
    toast("Error:", {
      description: firstError?.message || "Please fill all fields",
      type: "error",
    });
  }

  return { form, handleSignInFormSubmit, handleSignInFormError };
}

export default useSearchForm;
