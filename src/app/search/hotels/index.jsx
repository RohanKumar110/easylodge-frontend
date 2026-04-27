import React from "react";
import HotelCard from "./components/hotel-card";

function SearchedHotels({ isLoading, hotels, error }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4">
      {hotels.map((hotelItem) => (
        <HotelCard
          key={hotelItem.hotel.id}
          {...hotelItem.hotel}
          price={hotelItem.price}
        />
      ))}
    </div>
  );
}

export default SearchedHotels;
