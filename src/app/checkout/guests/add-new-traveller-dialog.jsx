import AddEditTravellerDialog from "@/features/travellers/traveller-dialog";
import React, { useState } from "react";
import useAddTraveller from "../hooks/useAddTraveller";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

function AddNewTraveller() {
  const [isAddGuestDialogOpen, setIsAddGuestDialogOpen] = useState(false);

  const { data, isLoading, addGuest } = useAddTraveller({
    setIsAddGuestDialogOpen,
  });

  return (
    <AddEditTravellerDialog
      isDialogOpen={isAddGuestDialogOpen}
      setIsDialogOpen={setIsAddGuestDialogOpen}
      title={"Add New Traveller"}
      mutate={addGuest}
      isDisabled={isLoading}
      isLoading={isLoading}
      submitButtonText={"Add To Traveller List"}
      triggerNode={
        <Button
          size="sm"
          variant="link"
          className="h-auto gap-1 p-0 text-sm font-semibold transition-opacity hover:opacity-80 hover:no-underline cursor-pointer">
          <Icon icon={"plus"} size={16} />
          Add New Guest
        </Button>
      }
    />
  );
}

export default AddNewTraveller;
