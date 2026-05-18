import API_CONFIG from "@/config/api.config";
import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import useMutation from "@/lib/hooks/useMutation";
import dayjs from "dayjs";
import { useParams, useSearchParams } from "react-router";
import { toast } from "sonner";

function useInitCheckout() {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();

  const { mutate, data, isLoading, error } = useMutation(
    API_CONFIG.BOOKING.INIT_BOOKING,
    "POST"
  );

  function initCheckout() {
    const payload = {
      hotelId: hotelId,
      roomId: searchParams.get(SEARCH_PARAMS_KEYS.SELECTED_ROOM),
      numberOfRooms: Number(searchParams.get(SEARCH_PARAMS_KEYS.ROOMS)),
      checkInDate: dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN)).format(
        "YYYY-MM-DD"
      ),
      checkOutDate: dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT)).format(
        "YYYY-MM-DD"
      ),
    };

    mutate(payload, {
      onSuccess: null,
      onError: (err) => {
        toast("Error:", {
          description: err.message || "Failed to initialize booking",
          type: "error",
        });
      },
    });
  }

  return {
    data,
    isLoading,
    error,
    initCheckout,
  };
}

export default useInitCheckout;
