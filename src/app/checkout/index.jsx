import React, { useEffect } from "react";
import useInitCheckout from "./hooks/useInitCheckout";
import { Separator } from "@/components/ui/separator";
import BookingDetails from "./booking-details";
import InitiatePaymentButton from "./init-payment-button";

function CheckoutPage() {
  const { data, isLoading, error, initCheckout } = useInitCheckout();

  useEffect(() => {
    initCheckout();
  }, []);

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container flex items-center my-20">
      <div className="flex-1 max-w-2xl py-4 mx-auto border border-border shadow-lg rounded-xl bg-background">
        <div className="px-4">
          <h1 className="text-xl font-bold">Booking Checkout</h1>
        </div>
        <Separator className="my-4" />
        <BookingDetails booking={data || {}} />
        <div className="px-4 mt-6">
          <InitiatePaymentButton bookingId={data.id} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
