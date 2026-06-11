import API_CONFIG from "@/config/api.config";
import { BOOKING_STATUS } from "@/config/payment.config";
import axiosInstance from "@/lib/axios-instance";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function usePollPaymentStatus() {
  const { bookingId } = useParams();
  const MAX_RETRIES = 10;
  const POLL_DELAY = 5000;

  const [maxRetries, setMaxRetries] = useState(MAX_RETRIES);
  const [paymentStatus, setPaymentStatus] = useState(BOOKING_STATUS.PROCESSING);

  async function getPaymentStatus() {
    try {
      const { data } = await axiosInstance.get(
        API_CONFIG.BOOKING.BOOKING_STATUS(bookingId),
        "GET"
      );
      console.log("Status");
      console.log(data);
      if (
        [
          BOOKING_STATUS.CONFIRMED,
          BOOKING_STATUS.CANCELLED,
          BOOKING_STATUS.EXPIRED,
        ].includes(data.status)
      ) {
        setMaxRetries(0);
        setPaymentStatus(data.status);
        return;
      }
      setMaxRetries((prev) => prev - 1);
    } catch (error) {
      console.log("Error occured: ", error);
    }
  }

  useEffect(() => {
    if (maxRetries <= 0) {
      setPaymentStatus((prev) =>
        [
          BOOKING_STATUS.CONFIRMED,
          BOOKING_STATUS.CANCELLED,
          BOOKING_STATUS.EXPIRED,
        ].includes(prev)
          ? prev
          : BOOKING_STATUS.ERROR
      );
      return;
    }
    const timeoutId = setTimeout(getPaymentStatus, POLL_DELAY);
    return () => clearTimeout(timeoutId);
  }, [maxRetries]);

  useEffect(() => {
    getPaymentStatus();
  }, []);

  return { paymentStatus };
}

export default usePollPaymentStatus;
