import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validators/search-form-validator";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import PATHS from "@/config/path.config";
import { useForm } from "react-hook-form";
import { SEARCH_PARAMS_KEYS } from "@/config/app.config";

function useSearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN);
  const checkOut = searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT);

  const defaultValues = {
    city: searchParams.get(SEARCH_PARAMS_KEYS.CITY) || "",
    bookingDates: {
      from: checkIn ? dayjs(checkIn).toDate() : dayjs().toDate(),
      to: checkOut ? dayjs(checkOut).toDate() : dayjs().add(1, "day").toDate(),
    },
    roomsCount: Number(searchParams.get(SEARCH_PARAMS_KEYS.ROOMS)) || 1,
  };

  const form = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [searchParams]);

  function handleSearchFormSubmit(data) {
    const params = new URLSearchParams({
      city: data.city,
      roomsCount: data.roomsCount,
      startDate: dayjs(data.bookingDates.from).format("YYYY-MM-DD"),
      endDate: dayjs(data.bookingDates.to).format("YYYY-MM-DD"),
    });

    navigate(`${PATHS.SEARCH_HOTELS}?${params.toString()}`);
  }

  function handleSearchFormError(errors) {
    const firstError = Object.values(errors)[0];

    toast("Error:", {
      description: firstError?.message || "Please fill all fields",
      type: "error",
    });
  }

  return { form, handleSearchFormSubmit, handleSearchFormError };
}

export default useSearchForm;