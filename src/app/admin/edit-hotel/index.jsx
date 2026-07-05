import React from "react";
import EditHotelForm from "./edit-hotel-form";
import { useParams } from "react-router";
import { useAdminContext } from "@/lib/providers/admin-context-provider";
import { LoadingSpinner } from "@/components/ui/loader";
import BackNavigation from "@/components/back-navigation";

function EditHotel() {
  const { hotelId } = useParams();
  const { hotel, isLoading } = useAdminContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container p-4 max-w-384 space-y-8">
      <div className="space-y-4">
        <BackNavigation
          text="Back to hotel"
          href={`/admin/hotels/${hotelId}/overview`}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Hotel Information</h1>
          <p className="text-sm text-muted-foreground">
            Modify hotel information and review it
          </p>
        </div>
      </div>

      <EditHotelForm hotel={hotel} />
    </div>
  );
}

export default EditHotel;
