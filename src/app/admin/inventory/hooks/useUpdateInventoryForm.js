import API_CONFIG from "@/config/api.config";
import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import useMutation from "@/lib/hooks/useMutation";
import editInventorySchema from "@/lib/validators/edit-inventory-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router";
import { toast } from "sonner";

function useUpdateInventoryForm(refetchInventoriesfetch) {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();

  const { mutate, isLoading } = useMutation(
    API_CONFIG.ADMIN.EDIT_INVENTORY_BY_ROOM_ID(roomId),
    "PATCH"
  );

  const checkIn = searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN);
  const checkOut = searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT);

  const form = useForm({
    resolver: zodResolver(editInventorySchema),
    defaultValues: {
      bookingDates: {
        from: checkIn ? dayjs(checkIn).toDate() : dayjs().format("YYYY-MM-DD"),
        to: checkOut
          ? dayjs(checkOut).toDate()
          : dayjs().add(1, "month").format("YYYY-MM-DD"),
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
