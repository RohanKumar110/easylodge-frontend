import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import API_CONFIG from "@/config/api.config";
import { ERROR_FALLBACK } from "@/config/app.config";
import useMutation from "@/lib/hooks/useMutation";
import React from "react";

function InitiatePaymentButton({ bookingId }) {
  const { mutate, isLoading } = useMutation(
    API_CONFIG.BOOKING.BOOKING_PAYMENT(bookingId),
    "POST"
  );

  function initiatePayment() {
    mutate(null, {
      onSuccess: (res) => {
        window.location.href = res.data.sessionUrl;
      },
      onError: (err) => {
        toast(ERROR_FALLBACK.TITLE, {
          description: err.message || ERROR_FALLBACK.DESCRIPTION,
          type: "error",
        });
      },
    });
  }

  return (
    <Button
      size="lg"
      onClick={initiatePayment}
      disabled={isLoading}
      className="w-full h-12 gap-2 text-base font-semibold uppercase transition-opacity duration-300 shadow-lg cursor-pointer bg-brand hover:opacity-95">
      <Icon icon="shield" size="30" />
      Proceed to Pay
    </Button>
  );
}

export default InitiatePaymentButton;
