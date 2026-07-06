import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";
import { newRoomSchema } from "@/lib/validators/new-room-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

function useCreateRoomForm() {
  const navigate = useNavigate();
  const { hotelId } = useParams();

  const { mutate, isLoading } = useMutation(
    API_CONFIG.ADMIN.CREATE_NEW_ROOM(hotelId),
    "POST"
  );

  const form = useForm({
    resolver: zodResolver(newRoomSchema),
    defaultValues: {
      type: "",
      basePrice: "",
      images: [],
      amenities: [],
      totalRoomsCount: "",
      capacity: "",
    },
  });

  function handleCreateRoomFormSubmit(data) {
    mutate(data, {
      onSuccess: () => {
        toast("Room created successfully", {
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
    handleCreateRoomFormSubmit,
  };
}

export default useCreateRoomForm;
