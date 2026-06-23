import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useRemoveGuest from "./hooks/useRemoveGuest";

function RemoveTraveller({ id, isDialogOpen, setIsDialogOpen }) {
  const { removeGuest, isLoading } = useRemoveGuest({
    guestId: id,
    setIsDialogOpen,
  });

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Remove Traveller</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this traveller? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} className="cursor-pointer">
            No, Keep it
          </AlertDialogCancel>
          <Button
            disabled={isLoading}
            variant="destructive"
            className={"cursor-pointer"}
            onClick={removeGuest}>
            Yes, Remove Traveller
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RemoveTraveller;
