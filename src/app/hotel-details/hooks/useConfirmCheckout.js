import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router";

function useConfirmCheckout() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const roomsCount = Number(searchParams.get(SEARCH_PARAMS_KEYS.ROOMS)) || 1;

  const form = useForm({
    defaultValues: {
      roomsCount,
      bookingDates: {
        from: dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN)).toDate(),
        to: dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT)).toDate(),
      },
    },
  });

  function handleUpdateDetailsFormSubmit(data) {
    searchParams.set(SEARCH_PARAMS_KEYS.ROOMS, data.roomsCount);
    searchParams.set(
      SEARCH_PARAMS_KEYS.CHECKIN,
      dayjs(data.bookingDates.from).format("YYYY-MM-DD")
    );
    searchParams.set(
      SEARCH_PARAMS_KEYS.CHECKOUT,
      dayjs(data.bookingDates.to).format("YYYY-MM-DD")
    );
    setSearchParams(searchParams, { replace: true });
    form.reset(data);
  }

  return { form, handleUpdateDetailsFormSubmit };
}

export default useConfirmCheckout;
