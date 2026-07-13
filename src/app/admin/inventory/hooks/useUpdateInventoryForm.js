import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";
import editInventorySchema from "@/lib/validators/edit-inventory-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";

function useUpdateInventoryForm(refetchInventoriesfetch) {
    
  const { roomId } = useParams();
  const { mutate, isLoading } = useMutation(
    API_CONFIG.ADMIN.EDIT_INVENTORY_BY_ROOM_ID(roomId),
    "PATCH"
  );

  const form = useForm({
    resolver: zodResolver(editInventorySchema),
    defaultValues: {
      bookingDates: {
        from: dayjs().toDate(),
        to: dayjs().toDate(),
      },
      surgeFactor: 1,
      closed: false,
    },
  });

  function handleInventoryFormSubmit(data) {
    
    const queries = {
      startDate: dayjs(data.bookingDates.from).format("YYYY-MM-DD"),
      endDate: dayjs(data.bookingDates.to).format("YYYY-MM-DD"),
      surgeFactor: data.surgeFactor,
      closed: data.closed,
    };

    mutate(queries, {
      onSuccess: () => {
        form.reset();
        refetchInventoriesfetch();
        toast("Inventory updated successfully", {
          type: "success",
        });
      },
      onError: (error) => {
        toast(error.message || ERROR_FALLBACK.TITLE, {
          type: "error",
        });
      },
    });
  }

  return {
    form,
    handleInventoryFormSubmit,
    isLoading,
  };
}

export default useUpdateInventoryForm;
