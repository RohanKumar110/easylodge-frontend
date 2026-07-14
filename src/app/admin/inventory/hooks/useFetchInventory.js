import API_CONFIG from "@/config/api.config";
import {
  SEARCH_PARAMS_KEYS,
  SEARCH_RESULT_PAGE_LIMIT,
} from "@/config/app.config";
import useQuery from "@/lib/hooks/useQuery";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";

function useFetchInventory(roomId) {
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN);
  const checkOut = searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT);

  const {
    data: inventoriesData,
    isLoading: inventoryLoading,
    refetchQuery: refetchInventories,
  } = useQuery(API_CONFIG.ADMIN.GET_INVENTORY_BY_ROOM_ID(roomId), {
    params: {
      startDate: checkIn
        ? dayjs(checkIn).toDate()
        : dayjs().format("YYYY-MM-DD"),
      endDate: checkOut
        ? dayjs(checkOut).toDate()
        : dayjs().add(1, "month").format("YYYY-MM-DD"),
      pageNo: Math.max(
        0,
        Number(searchParams.get(SEARCH_PARAMS_KEYS.PAGE) || 1) - 1
      ),
      pageSize: SEARCH_RESULT_PAGE_LIMIT,
    },
  });

  return { inventoriesData, inventoryLoading, refetchInventories };
}

export default useFetchInventory;
