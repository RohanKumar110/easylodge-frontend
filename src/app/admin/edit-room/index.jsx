import React from "react";
import { useParams } from "react-router";
import { LoadingSpinner } from "@/components/ui/loader";
import BackNavigation from "@/components/back-navigation";
import useQuery from "@/lib/hooks/useQuery";
import API_CONFIG from "@/config/api.config";
import EditRoomForm from "./edit-room-form";

function EditRoom() {
  
  const { hotelId, roomId } = useParams();
  const { data, isLoading } = useQuery(
    API_CONFIG.ADMIN.GET_ROOM_BY_ID(hotelId, roomId)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container p-4 max-w-384 space-y-8">
      <div className="space-y-4">
        <BackNavigation
          text="Back to rooms"
          href={`/admin/hotels/${hotelId}/rooms`}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Room Information</h1>
          <p className="text-sm text-muted-foreground">
            Modify room information and review it
          </p>
        </div>
      </div>

      <EditRoomForm room={data} />
    </div>
  );
}

export default EditRoom;
