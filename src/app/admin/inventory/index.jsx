import BackNavigation from "@/components/back-navigation";
import { LoadingSpinner } from "@/components/ui/loader";
import useQuery from "@/lib/hooks/useQuery";
import React from "react";
import { useParams } from "react-router";
import RoomCard from "../rooms/room-card";
import UpdateInventoryForm from "./update-inventory-form";
import InventoryTable from "./inventory-table";
import useFetchInventory from "./hooks/useFetchInventory";
import API_CONFIG from "@/config/api.config";

function Inventory() {
  const { hotelId, roomId } = useParams();

  const {
    data: room,
    isLoading: roomLoading,
    error: roomError,
  } = useQuery(API_CONFIG.ADMIN.GET_ROOM_BY_ID(hotelId, roomId));

  const { inventoriesData, inventoryLoading, refetchInventories } =
    useFetchInventory(roomId);

  if (roomLoading) {
    return <LoadingSpinner containerClassName="min-h-[calc(100vh-56px)]" />;
  }

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
          totalItems={inventoriesData?.totalItems}
          limit={inventoriesData?.pageSize}
          inventories={inventoriesData?.content}
          inventoryLoading={inventoryLoading}
        />
      </div>
    </div>
  );
}

export default Inventory;
