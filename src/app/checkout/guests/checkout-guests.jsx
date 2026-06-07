import React, { useState } from "react";
import AddGuestDialog from "./add-guests-dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";

function CheckOutGuests({ bookingId }) {
  const [bookingGuests, setBookingGuests] = useState([]);

  const { mutate, isLoading } = useMutation(
    API_CONFIG.BOOKING.REMOVE_BOOKING_TRAVELLER(bookingId),
    "DELETE"
  );

  const removeGuestHandler = (id) => {
    mutate([id], {
      onSuccess: (res) => {
        setBookingGuests(res.data.guests);
        toast("Guest removed successfully", {
          type: "success",
        });
      },
      onError: (error) => {
        toast(error.status || ERROR_FALLBACK.TITLE, {
          type: "error",
        });
      },
    });
  };

  return (
    <div className="px-4 space-y-4">
      <h3 className="text-base font-semibold">Guest Details</h3>
      {bookingGuests.length > 0 && (
        <ul className="grid grid-cols-2 gap-6">
          {bookingGuests.map((guest) => (
            <li
              key={guest.id}
              className="flex items-center justify-between pb-2 border-b">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded-full w-7 h-7 bg-secondary">
                  <span className="text-sm font-medium leading-4 uppercase">
                    {guest.name.charAt(0)}
                  </span>
                </div>
                <p className="text-sm font-medium">{guest.name}</p>
              </div>
              <Button
                size="icon"
                className="w-6 h-6 cursor-pointer"
                variant="ghost"
                aria-label="Remove guest"
                disabled={isLoading}
                onClick={() => removeGuestHandler(guest.id)}>
                <Icon icon="close" size={16} />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <AddGuestDialog
        bookingId={bookingId}
        bookingGuests={bookingGuests}
        setBookingGuests={setBookingGuests}
      />
    </div>
  );
}

export default CheckOutGuests;
