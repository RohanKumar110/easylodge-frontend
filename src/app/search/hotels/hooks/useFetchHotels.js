import { useSearchParams } from "react-router";
import {
  SEARCH_PARAMS_KEYS,
  SEARCH_RESULT_PAGE_LIMIT,
} from "@/config/app.config";
import useQuery from "@/lib/hooks/useQuery";
import API_CONFIG from "@/config/api.config";

function useFetchHotels() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get(SEARCH_PARAMS_KEYS.CITY);
  const { data, isLoading, error } = useQuery(API_CONFIG.HOTEL.BROWSE_HOTELS, {
    params: {
      city: searchParams.get(SEARCH_PARAMS_KEYS.CITY),
      startDate: searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN),
      endDate: searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT),
      roomsCount: searchParams.get(SEARCH_PARAMS_KEYS.ROOMS),
      pageNo: Math.max(
        0,
        Number(searchParams.get(SEARCH_PARAMS_KEYS.PAGE) || 1) - 1
      ),
      pageSize: SEARCH_RESULT_PAGE_LIMIT,
    },
  });

  return { data, city, isLoading, error };
}

export default useFetchHotels;
