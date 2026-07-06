import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";
import { newRoomSchema } from "@/lib/validators/new-room-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

function useEditRoomForm(room) {
    
  const navigate = useNavigate();
  const { hotelId } = useParams();

  const { mutate, isLoading } = useMutation(
    API_CONFIG.ADMIN.EDIT_ROOM_BY_ID(hotelId, room?.id),
    "PUT"
  );

  const form = useForm({
    resolver: zodResolver(newRoomSchema),
    defaultValues: {
      type: room?.type,
      basePrice: room?.basePrice,
      images: room?.images,
      amenities: room?.amenities,
      totalRoomsCount: room?.totalRoomsCount,
      capacity: room?.capacity,
    },
  });

  function handleEditRoomFormSubmit(data) {
    mutate(data, {
      onSuccess: () => {
        toast("Room Updated successfully", {
          type: "success",
        });
        navigate(`/admin/hotels/${hotelId}/rooms`);
      },
      onError: (err) => {
        toast("Error: " + (err.status || ""), {
          description: err.message,
          type: "error",
        });
      },
    });
  }

  return {
    form,
    isLoading,
    handleEditRoomFormSubmit,
  };
}

export default useEditRoomForm;
