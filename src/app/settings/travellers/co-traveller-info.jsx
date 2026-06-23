import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dayjs from "dayjs";
import React, { useState } from "react";
import { getDefaultProfile } from "@/lib/utils";
import useUpdateGuest from "./hooks/useUpdateGuest";
import { useTravellerContext } from "@/lib/providers/travellers-context-provider";
import Icon from "@/components/ui/icon";
import AddEditTravellerDialog from "@/features/travellers/traveller-dialog";
import RemoveTraveller from "./remove-traveller";

const CoTravellerInfo = ({ name, dateOfBirth, gender, id }) => {
  const { setTravellers } = useTravellerContext();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const { updateGuestInfo, isLoading } = useUpdateGuest({
    guestId: id,
    setIsUpdateDialogOpen,
    onGuestUpdate: (data) => {
      setTravellers((prevTravellers) => {
        return prevTravellers.map((traveller) => {
          if (traveller.id === id) {
            return {
              ...traveller,
              ...data,
            };
          }
          return traveller;
        });
      });
    },
  });

  const age = dateOfBirth ? dayjs().diff(dayjs(dateOfBirth), "year") : null;
  return (
    <div className="flex items-center justify-between gap-4 px-2 py-3 not-last:border-b">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            loading="lazy"
            src={getDefaultProfile(name.charAt(0))}
            width={36}
            height={36}
          />
          <AvatarFallback>{name && name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-base font-semibold">{name}</h3>
          <p className="text-sm font-medium capitalize text-muted-foreground">
            {[
              gender,
              age !== null ? `${age}Y` : null,
              dateOfBirth ?? "DOB not provided",
            ]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 cursor-pointer"
            aria-label="Manage Co-traveller">
            <Icon icon="more" size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setIsUpdateDialogOpen(true);
            }}>
            Edit Traveller Info
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive focus:bg-destructive/20 cursor-pointer"
            onClick={() => {
              setIsRemoveDialogOpen(true);
            }}>
            Remove Traveller
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddEditTravellerDialog
        mutate={updateGuestInfo}
        title="Edit Traveller Information"
        description="Edit the details of the traveler"
        submitButtonText="Save Changes"
        isDialogOpen={isUpdateDialogOpen}
        setIsDialogOpen={setIsUpdateDialogOpen}
        formInitialData={{
          name,
          dateOfBirth: dateOfBirth ? dateOfBirth.split("-").join("") : null,
          gender,
        }}
        isDisabled={isLoading}
        isLoading={isLoading}
      />
      <RemoveTraveller
        id={id}
        isDialogOpen={isRemoveDialogOpen}
        setIsDialogOpen={setIsRemoveDialogOpen}
      />
    </div>
  );
};

export default CoTravellerInfo;
