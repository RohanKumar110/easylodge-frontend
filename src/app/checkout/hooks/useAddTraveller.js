import API_CONFIG from "@/config/api.config";
import { ERROR_FALLBACK } from "@/config/app.config";
import useMutation from "@/lib/hooks/useMutation";
import { useTravellerContext } from "@/lib/providers/travellers-context-provider";
import { toast } from "sonner";

function useAddTraveller({ setIsAddGuestDialogOpen }) {
  const { setTravellers, refetchGuests } = useTravellerContext();
  const { mutate, data, isLoading, error } = useMutation(
    API_CONFIG.TRAVELLER.CREATE_TRAVELLERS,
    "POST"
  );

  async function addGuest(data) {
    await mutate([data], {
      onSuccess: (res) => {
        setTravellers((prevTravellers) => [...prevTravellers, res.data]);
        toast("Guest Added Successfully", {
          type: "success",
        });
        if (
          setIsAddGuestDialogOpen &&
          typeof setIsAddGuestDialogOpen === "function"
        ) {
          setIsAddGuestDialogOpen(false);
        }
        refetchGuests();
      },
      onError: (error) => {
        console.log("Error While Adding Guest", error);
        toast(error.status || ERROR_FALLBACK.TITLE, {
          type: "error",
        });
      },
    });
  }

  return { data, isLoading, addGuest, error };
}

export default useAddTraveller;
