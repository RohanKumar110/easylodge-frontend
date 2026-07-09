import { LoadingSpinner } from "@/components/ui/loader";
import API_CONFIG from "@/config/api.config";
import useQuery from "@/lib/hooks/useQuery";
import React from "react";
import { useParams } from "react-router";
import BookingsTable from "./bookings-table";

function Bookings() {
  const { hotelId } = useParams();
  const { data, isLoading } = useQuery(
    API_CONFIG.ADMIN.GET_ALL_BOOKINGS_BY_HOTEL_ID(hotelId)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container p-4 max-w-384 space-y-8">
      <section className="space-y-1">
        <h1 className="text-base font-semibold">Bookings</h1>
        <p className="text-sm">View all your Bookings</p>
      </section>
      <section>
        <BookingsTable bookings={data || []} />
      </section>
    </div>
  );
}

export default Bookings;
