import React from "react";
import BookingCard from "./booking-card";
import useGetBookingHistory from "./hooks/useGetBookingHistory";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loader";

function BookingHistory() {
  const { data, error, isLoading } = useGetBookingHistory();

  if (isLoading) {
    <LoadingSpinner />;
  }

  if (!isLoading && error) {
    return <p>Something went wrong</p>;
  }

  return (
    <section>
      <div className="space-y-0.5">
        <h1 className="text-xl font-bold">My Booking History</h1>
        <p className="text-muted-foreground">
          View, update, or cancel your bookings with ease.
        </p>
      </div>
      <Separator className="mt-4 mb-6" />
      <div className="space-y-4">
        {!data || data?.length === 0 ? (
          <h1>No Bookings Found</h1>
        ) : (
          data.map((booking) => <BookingCard key={booking.id} {...booking} />)
        )}
      </div>
    </section>
  );
}

export default BookingHistory;
