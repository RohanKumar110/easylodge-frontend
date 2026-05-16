import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";

function useHotelNavigation(hotelId) {
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN);
  const checkOut = searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT);

  const queries = {
    startDate: checkIn
      ? dayjs(checkIn).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),

    endDate: checkOut
      ? dayjs(checkOut).format("YYYY-MM-DD")
      : dayjs().add(1, "day").format("YYYY-MM-DD"),
  };

  const params = new URLSearchParams(queries);

  return `/hotels/${hotelId}?${params.toString()}`;
}

export default useHotelNavigation;
