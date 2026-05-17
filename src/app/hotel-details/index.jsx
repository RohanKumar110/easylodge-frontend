import React from "react";
import PropertyViewCarousel from "./property-view-carousel";
import HotelMetaDetails from "./hotel-meta-details";
import HotelRoomPicker from "./hotel-room-picker";
import HotelPolicy from "./hotel-policy";
import HotelCheckoutCard from "./hotel-checkout-card";
import { HOTEL_INFO } from "./hotel-details-dummy-data";
import useFetchHotelDetails from "./hooks/useFetchHotelDetails";

function HotelDetails() {
  const { data, isLoading, error } = useFetchHotelDetails();

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }
  const hotelInfo = HOTEL_INFO;
  const hotelData = data;

  return (
    <div className="container mt-6 mb-12">
      <PropertyViewCarousel images={hotelData.hotel.images} />

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <aside className="order-1 w-full rounded-xl border border-border p-4 shadow-md lg:order-2 lg:sticky lg:top-6 lg:h-min lg:w-85 lg:shrink-0">
          <HotelCheckoutCard
            rooms={hotelData.rooms}
            cancellationPolicy={hotelInfo.cancellationPolicy}
          />
        </aside>

        <div className="order-2 space-y-8 lg:order-1 lg:flex-1">
          <HotelMetaDetails hotel={hotelData.hotel} hotelInfo={hotelInfo} />
          <HotelRoomPicker rooms={hotelData.rooms} />
          <HotelPolicy hotelPolicy={hotelInfo.hotelPolicy} />
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
