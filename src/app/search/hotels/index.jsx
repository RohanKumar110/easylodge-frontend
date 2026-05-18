import React from "react";
import HotelCard from "./components/hotel-card";
import HotelCardSkeleton from "./components/hotel-card-skeleton";

function SearchedHotels({ isLoading, hotels, error }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <HotelCardSkeleton />
        <HotelCardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hotels.map((hotelItem) => (
        <HotelCard
          key={`${hotelItem.hotel.id}-${hotelItem.price}`}
          {...hotelItem.hotel}
          price={hotelItem.price}
        />
      ))}
    </div>
  );
}

export default SearchedHotels;
