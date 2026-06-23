import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";
import { toast } from "sonner";

function useUpdateGuest({ guestId, setIsUpdateDialogOpen, onGuestUpdate }) {
  const { data, isLoading, mutate } = useMutation(
    API_CONFIG.TRAVELLER.UPDATE_TRAVELLER(guestId),
    "PUT"
  );

  async function updateGuestInfo(data) {
    await mutate(data, {
      onSuccess: () => {
        toast("Guest updated successfully", {
          type: "success",
        });
        if (onGuestUpdate && typeof onGuestUpdate === "function") {
          onGuestUpdate(data);
        }
        setIsUpdateDialogOpen(false);
      },
      onError: (err) => {
        toast("Error: " + (err.status || ""), {
          description: err.message,
          type: "error",
        });
      },
    });
  }
  return { updateGuestInfo, isLoading, data };
}

export default useUpdateGuest;
