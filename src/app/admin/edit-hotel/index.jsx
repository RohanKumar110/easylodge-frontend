import React from "react";
import EditHotelForm from "./edit-hotel-form";
import { Link, useParams } from "react-router";
import { useAdminContext } from "@/lib/providers/admin-context-provider";
import { LinkWithIcon } from "@/components/ui/link-with-icon";
import Icon from "@/components/ui/icon";

function EditHotel() {
  const { hotelId } = useParams();
  const { hotel, isLoading } = useAdminContext();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container py-4 space-y-8">
      <div className="flex flex-col gap-1">
        <Link
          to={`/admin/hotels/${hotelId}/overview`}
          className="flex items-center my-3 text-muted-foreground p-0 hover:no-underline hover:text-foreground">
          <Icon icon="leftArrow" className="p-0 inline-block" size={18} />
          Back to Hotel
        </Link>
        <h1 className="text-lg font-semibold">Hotel Information</h1>
        <p className="text-sm text-muted-foreground">
          Modify hotel information and review it
        </p>
      </div>
      <EditHotelForm hotel={hotel} />
    </div>
  );
}

export default EditHotel;
