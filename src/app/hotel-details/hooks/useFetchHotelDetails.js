import API_CONFIG from "@/config/api.config";
import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import useQuery from "@/lib/hooks/useQuery";
import dayjs from "dayjs";
import { useParams, useSearchParams } from "react-router";

function useFetchHotelDetails() {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN);
  const checkOut = searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT);

  const startDate = checkIn ? dayjs(checkIn).format("YYYY-MM-DD") : undefined;
  const endDate = checkOut ? dayjs(checkOut).format("YYYY-MM-DD") : undefined;

  const { data, isLoading, error } = useQuery(
    API_CONFIG.HOTEL.HOTEL_INFO(hotelId),
    {
      params: {
        startDate,
        endDate,
      },
    }
  );

  return { data, isLoading, error };
}

export default useFetchHotelDetails;