import Icon from "@/components/ui/icon";
import React from "react";

function HotelMetaDetails({ hotel, hotelInfo }) {
  return (
    <>
      <section className="space-y-4">
        <div className="flex">
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-bold">{hotel.name}</h1>
            <p className="text-muted-foreground">{`${hotel.contactInfo.address}, ${hotel.city}`}</p>
          </div>
          <div>
            <div className="flex gap-2 items-center justify-center bg-brand px-2 py-1 rounded-t-sm text-white">
              <span className="text-base font-bold">4.8</span>
              <Icon size="14" icon="star" className="fill-white" />
            </div>
            <div className="bg-secondary rounded-b-sm px-2 py-1 flex justify-center items-center">
              <span className="text-xs">663 Ratings</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 px-1.5 py-1 rounded bg-gray-100 w-fit font-semibold">
          <Icon icon="gem" size="14" />
          <span className="text-xs">Company-Serviced</span>
        </div>
        <div className="flex items-center gap-2 px-2">
          <Icon icon="curve" className="-mt-4 stroke-gray-400" />
          <p>5.0 Check-In rating &gt; Delightful experience</p>
        </div>
        <div className="bg-orange-50 text-orange-500 flex flex-1 gap-1 p-2 items-center border rounded-sm">
          <Icon icon="heart" size="16" />
          <p className="text-sm font-medium">
            Located 3 kms From {hotel.city} Airport
          </p>
        </div>
      </section>

      <section className="space-y-4 my-8">
        <h2 className="text-cl font-bold">Amenities</h2>
        <ul className="flex flex-wrap gap-2">
          {hotel.amenities.map((amenity, index) => (
            <li key={index} className="flex gap-2 items-center min-w-45">
              <Icon icon="check" size="18" className="text-green-600" />
              <span className="text-sm font-medium text-muted-foreground">
                {amenity}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 my-8">
        <h2 className="text-xl font-bold">About this Property</h2>
        <p className="text-sm leading-relaxed tracking-wide text-muted-foreground">
          {hotelInfo.description}
        </p>
      </section>
    </>
  );
}

export default HotelMetaDetails;
