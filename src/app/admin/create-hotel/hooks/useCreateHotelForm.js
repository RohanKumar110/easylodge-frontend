import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";
import { newHotelSchema } from "@/lib/validators/new-hotel-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function useCreateHotelForm() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    API_CONFIG.ADMIN.CREATE_NEW_HOTEL,
    "POST"
  );

  const form = useForm({
    resolver: zodResolver(newHotelSchema),
    defaultValues: {
      name: "",
      active: true,
      images: [],
      amenities: [],
      email: "",
      phone: "",
      city: "",
      coordinates: "",
      address: "",
    },
  });

  async function handleCreateHotelFormSubmit(data) {
    await mutate(data, {
      onSuccess: (res) => {
        toast("Hotel Created Successfully", {
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

  return { form, isLoading, handleCreateHotelFormSubmit };
}

export default useCreateHotelForm;
