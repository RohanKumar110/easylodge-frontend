import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Icon from "@/components/ui/icon";
import API_CONFIG from "@/config/api.config";
import { ERROR_FALLBACK } from "@/config/app.config";
import PATHS from "@/config/path.config";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import useMutation from "@/lib/hooks/useMutation";

function HotelMetaInfo({ name, address, image, active }) {
  return (
    <article className="flex items-center justify-between p-4 border rounded-md">
      <div className="flex gap-4">
        <img
          src={image}
          alt={name}
          width={150}
          height={100}
          className="rounded-md"
        />
        <div className="space-y-3">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold leading-none">{name}</h2>
            <p className="text-muted-foreground">{address}</p>
          </div>
        </div>
      </div>
      <HotelSettings />
    </article>
  );
}

function DeleteHotelConfirmationDialog({ openDialog, setOpenDialog }) {
  const navigate = useNavigate();
  const { hotelId } = useParams();

  const { mutate, isLoading } = useMutation(
    API_CONFIG.ADMIN.DELETE_HOTEL_BY_ID(hotelId),
    "DELETE"
  );

  function deleteHotelHandler() {
    mutate(null, {
      onSuccess: () => {
        setOpenDialog(false);
        navigate(`${PATHS.ADMIN.ROOT}/${PATHS.ADMIN.LIST_HOTELS}`);
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
          <AlertDialogTitle>Confirm Hotel Hotel</AlertDialogTitle>
          <AlertDialogDescription className="leading-relaxed cursor-pointer">
            Are you sure you want to delete this hotel? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={deleteHotelHandler}
            className={"cursor-pointer"}
            disabled={isLoading}>
            Yes, Delete My Hotel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function HotelSettings() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            onClick={() => navigate(`/admin/hotels/${hotelId}/edit`)}>
            Edit Hotel Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={openDeleteConfirmationDialog}
            className="text-destructive focus:text-destructive cursor-pointer">
            Delete Hotel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteHotelConfirmationDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}

export default HotelMetaInfo;
