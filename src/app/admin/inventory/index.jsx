import BackNavigation from "@/components/back-navigation";
import { LoadingSpinner } from "@/components/ui/loader";
import useQuery from "@/lib/hooks/useQuery";
import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router";
import RoomCard from "../rooms/room-card";
import UpdateInventoryForm from "./update-inventory-form";
import InventoryTable from "./inventory-table";

function Inventory() {
  const { hotelId, roomId } = useParams();

  const {
    data: room,
    isLoading: roomLoading,
    error: roomError,
  } = useQuery(`/admin/hotels/${hotelId}/rooms/${roomId}`);

  const startDate = dayjs().format("YYYY-MM-DD");
  const endDate = dayjs().add(1, "month").format("YYYY-MM-DD");

  const {
    data: inventoriesData,
    isLoading: inventoryLoading,
    refetchQuery: refetchInventories,
  } = useQuery(`/admin/inventory/rooms/${roomId}`, {
    params: {
      startDate,
      endDate,
    },
  });

  if (roomLoading) {
    return <LoadingSpinner containerClassName="min-h-[calc(100vh-56px)]" />;
  }

  console.log("inventoriesData");
  console.log(inventoriesData);

  return (
    <div className="container p-4 max-w-384 space-y-8">
      <div className="space-y-4">
        <BackNavigation
          text="Back to Rooms"
          href={`/admin/hotels/${hotelId}/rooms`}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Manage Inventory</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track room availability, occupancy, and details
            efficiently
          </p>
        </div>
        <RoomCard showRoomSettings={false} {...room} />
        <UpdateInventoryForm refetchInventories={refetchInventories} />
        <InventoryTable
          inventories={inventoriesData?.content}
          inventoryLoading={inventoryLoading}
        />
      </div>
    </div>
  );
}

export default Inventory;
