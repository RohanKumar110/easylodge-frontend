import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import React, { useState } from "react";
import AddNewTraveller from "./add-new-traveller-dialog";
import GuestsPicker from "./guests-picker";
import TravellerContextProvider from "@/lib/providers/travellers-context-provider";

function AddGuestsDialog({ bookingId, bookingGuests, setBookingGuests }) {
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false);

  return (
    <AlertDialog open={isGuestDialogOpen} onOpenChange={setIsGuestDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="link"
          aria-label="Add Guests"
          className="h-auto gap-1 p-0 text-xs font-semibold transition-opacity hover:opacity-80 hover:no-underline cursor-pointer">
          <Icon icon="plus" />
          <span>Add Guests</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <TravellerContextProvider>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Guest</AlertDialogTitle>

            <AlertDialogDescription>
              Select or add travellers for this booking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AddNewTraveller />
          <GuestsPicker
            bookingId={bookingId}
            bookingGuests={bookingGuests || []}
            setBookingGuests={setBookingGuests}
            setIsGuestDialogOpen={setIsGuestDialogOpen}
          />
        </TravellerContextProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddGuestsDialog;
