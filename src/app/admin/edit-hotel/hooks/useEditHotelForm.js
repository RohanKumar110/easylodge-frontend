import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";
import { useAdminContext } from "@/lib/providers/admin-context-provider";
import { newHotelSchema } from "@/lib/validators/new-hotel-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function useEditHotelForm(hotel) {
  const navigate = useNavigate();
  const { refetch } = useAdminContext();

  const { mutate, isLoading } = useMutation(
    API_CONFIG.ADMIN.EDIT_HOTEL_BY_ID(hotel.id),
    "PUT"
  );

  const form = useForm({
    resolver: zodResolver(newHotelSchema),
    defaultValues: {
      name: hotel?.name,
      active: hotel?.active,
      images: hotel?.images,
      amenities: hotel?.amenities,
      email: hotel?.email,
      phone: hotel?.phone,
      city: hotel?.city,
      coordinates: hotel?.coordinates,
      address: hotel?.address,
    },
  });

  async function handleEditHotelFormSubmit(data) {
    await mutate(data, {
      onSuccess: async (res) => {
        await refetch();
        toast("Hotel Updated Successfully", {
          type: "success",
        });
        navigate(`/admin/hotels/${res.data.id}`);
      },
      onError: (err) => {
        toast("Error: " + (err.status || ""), {
          description: err.message,
          type: "error",
        });
      },
    });
  }

  return { form, isLoading, handleEditHotelFormSubmit };
}

export default useEditHotelForm;
