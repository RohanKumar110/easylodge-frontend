import React from "react";
import EmptyRooms from "./empty-rooms";
import useQuery from "@/lib/hooks/useQuery";
import API_CONFIG from "@/config/api.config";
import { useParams } from "react-router";
import { LoadingSpinner } from "@/components/ui/loader";
import { useAdminContext } from "@/lib/providers/admin-context-provider";
import { LinkWithIcon } from "@/components/ui/link-with-icon";
import RoomCard from "./room-card";

function Rooms() {
  const { hotelId } = useParams();
  const { hotel } = useAdminContext();

  const { data, isLoading, refetchQuery } = useQuery(
    API_CONFIG.ADMIN.GET_ADMIN_HOTEL_ROOMS_BY_HOTEL_ID(hotelId)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container p-4 max-w-384space-y-8">
      <section className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-base font-semibold">All Rooms</h1>
          <p className="text-sm">Manage Rooms in {hotel.name}</p>
        </div>
        {data.length && (
          <LinkWithIcon
            to={`/admin/hotels/${hotelId}/rooms/create`}
            icon="plus"
            size="sm"
            className="gap-1">
            Create Room
          </LinkWithIcon>
        )}
      </section>
      {data.length == 0 ? (
        <EmptyRooms />
      ) : (
        <section className="space-y-4">
          {data.map((room) => (
            <RoomCard
              key={room.id}
              {...room}
              refetchHotelRooms={refetchQuery}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default Rooms;
