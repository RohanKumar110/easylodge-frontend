import API_CONFIG from "@/config/api.config";
import useQuery from "@/lib/hooks/useQuery";

function useGetBookingHistory() {
  const { data, isLoading, error } = useQuery(API_CONFIG.USER.MY_BOOKINGS);

  return { data, isLoading, error };
}

export default useGetBookingHistory;
