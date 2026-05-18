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

  function handleCheckoutConfirmSubmit() {
    const queries = {
      city: searchParams.get(SEARCH_PARAMS_KEYS.CITY) || "",
      startDate: dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN)).format(
        "YYYY-MM-DD"
      ),
      endDate: dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT)).format(
        "YYYY-MM-DD"
      ),
      roomsCount: Number(searchParams.get(SEARCH_PARAMS_KEYS.ROOMS)),
      selectedRcid: searchParams.get(SEARCH_PARAMS_KEYS.SELECTED_ROOM),
    };

    const params = new URLSearchParams(queries);
    const url = `/hotels/${hotelId}/checkout?${params.toString()}`;
    navigate(url);
  }

  return { form, handleUpdateDetailsFormSubmit, handleCheckoutConfirmSubmit };
}

export default useConfirmCheckout;
