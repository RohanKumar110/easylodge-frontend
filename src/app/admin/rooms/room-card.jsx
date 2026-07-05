import Icon from "@/components/ui/icon";
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useParams } from "react-router";
import useMutation from "@/lib/hooks/useMutation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function RoomCard({
  id,
  type,
  amenities,
  capacity,
  showRoomSettings = true,
  images,
  totalRoomsCount,
  refetchHotelRooms,
}) {
  return (
    <article className="flex items-center justify-between p-4 border rounded-md">
      <div className="flex gap-4">
        <img
          src={images[0]}
          alt={type}
          width={150}
          height={100}
          className="rounded-md"
        />
        <div className="space-y-3">
          <h2 className="text-lg font-semibold leading-none">{type}</h2>
          <ul
            className="grid grid-cols-2 gap-2"
            role="list"
            aria-label="Hotel amenities list">
            {amenities.slice(0, 5).map((amenity, index) => (
              <li
                key={index}
                className="flex items-center gap-2"
                role="listitem">
                <Icon
                  icon="check"
                  size="18"
                  className="text-green-600"
                  aria-hidden="true"
                />
                <p
                  className="text-sm font-medium text-muted-foreground"
                  aria-label={`Amenity: ${amenity}`}>
                  {amenity}
                </p>
              </li>
            ))}
            {amenities.length > 5 && (
              <li className="flex items-center gap-2" role="listitem">
                <Icon
                  icon="check"
                  size="18"
                  className="text-green-600"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-muted-foreground">
                  {`+${amenities.length - 3} More`}
                </p>
              </li>
            )}
          </ul>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              {`Capacity : ${capacity}`}
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              {`Inventory : ${totalRoomsCount}`}
            </p>
          </div>
        </div>
      </div>
      {showRoomSettings && (
        <RoomSettings roomId={id} refetchHotelRooms={refetchHotelRooms} />
      )}
    </article>
  );
}

function DeleteHotelConfirmationDialog({
  openDialog,
  setOpenDialog,
  roomId,
  refetchHotelRooms,
}) {
  const { hotelId } = useParams();
  const { mutate, isLoading } = useMutation(
    `/admin/hotels/${hotelId}/rooms/${roomId}`,
    "DELETE"
  );

  function deleteRoomHandler() {
    mutate(null, {
      onSuccess: () => {
        toast("Room deleted successfully", {
          type: "success",
        });
        setOpenDialog(false);
        refetchHotelRooms();
      },
      onError: (error) => {
        toast(error.message || ERROR_FALLBACK.TITLE, {
          type: "error",
        });
      },
    });
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deleting the Room</AlertDialogTitle>
          <AlertDialogDescription className="leading-relaxed">
            Are you sure you want to delete this room? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={"cursor-pointer"}>
            Cancel
          </AlertDialogCancel>
          <Button
            className={"cursor-pointer"}
            variant="destructive"
            disabled={isLoading}
            onClick={deleteRoomHandler}>
            Yes, Delete My Room
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function RoomSettings({ roomId, refetchHotelRooms }) {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  function openDeleteConfirmationDialog() {
    setOpenDialog(true);
    setDropdownOpen(false);
  }

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="w-8 h-8 cursor-pointer"
            variant="ghost">
            <Icon icon="more" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className={"cursor-pointer"}
            onClick={() =>
              navigate(`/admin/hotels/${hotelId}/rooms/${roomId}/edit`)
            }>
            Edit Room Details
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"cursor-pointer"}
            onClick={() =>
              navigate(`/admin/hotels/${hotelId}/rooms/${roomId}/inventory`)
            }>
            Manage Inventory
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={openDeleteConfirmationDialog}
            className="text-destructive focus:text-destructive cursor-pointer">
            Delete Room
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteHotelConfirmationDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        roomId={roomId}
        refetchHotelRooms={refetchHotelRooms}
      />
    </>
  );
}

export default RoomCard;
