import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";

function useFetchSelectedRoom(rooms = []) {
  const [searchParams] = useSearchParams();

  const selectedRoomId = searchParams.get(SEARCH_PARAMS_KEYS.SELECTED_ROOM);

  const selectedRoom =
    rooms.find((room) => String(room.id) === String(selectedRoomId)) ??
    rooms[0] ??
    null;

  const checkIn = dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN));
  const checkOut = dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT));

  const nights =
    checkIn.isValid() && checkOut.isValid()
      ? Math.max(checkOut.diff(checkIn, "day"), 1)
      : 1;

  const roomsCount = Math.max(
    Number(searchParams.get(SEARCH_PARAMS_KEYS.ROOMS)) || 1,
    1
  );

  const nightlyPrice = selectedRoom?.price ?? 0;
  const discountPercentage = selectedRoom?.discountPercentage ?? 25;

  const totalPrice = nightlyPrice * nights * roomsCount;
  const originalPrice = totalPrice * (1 + discountPercentage / 100);
  const savings = originalPrice - totalPrice;

  return {
    selectedRoom,
    nightlyPrice,
    totalPrice,
    originalPrice,
    savings,
    discountPercentage,
    nights,
    roomsCount,
  };
}

export default useFetchSelectedRoom;