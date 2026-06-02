import { useTravellerContext } from "@/lib/providers/travellers-context-provider";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useMutation from "@/lib/hooks/useMutation";
import API_CONFIG from "@/config/api.config";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

function GuestsPicker({
  bookingId,
  bookingGuests,
  setBookingGuests,
  setIsGuestDialogOpen,
}) {
  const { travellers, isLoading: isTravellersLoading } = useTravellerContext();

  const form = useForm({
    defaultValues: {
      guests: bookingGuests.map((guest) => guest.id),
    },
  });

  const { mutate, isLoading, error } = useMutation(
    API_CONFIG.BOOKING.ADD_BOOKING_TRAVELLERS(bookingId),
    "POST"
  );

  if (isTravellersLoading) {
    return <p>Loading...</p>;
  }

  function handleAddGuestClick(data) {
    mutate(data.guests, {
      onSuccess: (res) => {
        console.log(res);
        setBookingGuests(res.data);
        toast("Guest Added Successfully", {
          type: "success",
        });
        setIsGuestDialogOpen(false);
      },
      onError: (error) => {
        toast("Could not add the guest", {
          type: "error",
          description: `Error: ${error.message}`,
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="guests"
          render={() => (
            <FormItem>
              {travellers.map((traveller) => (
                <FormField
                  key={traveller.id}
                  control={form.control}
                  name="guests"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={traveller.id}
                        className="flex flex-row items-center justify-between space-y-0">
                        <FormItem className="flex flex-row items-center gap-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              className="w-5 h-5 border-muted-foreground data-[state=checked]:border-primary"
                              checked={field.value?.includes(traveller.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      traveller.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== traveller.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-medium">
                            {traveller.name}
                          </FormLabel>
                        </FormItem>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button
            disabled={isLoading || form.formState.isSubmitting}
            onClick={form.handleSubmit(handleAddGuestClick)}
            aria-label="Confirm adding guest to list"
            className="cursor-pointer">
            Add To Guest List
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}

export default GuestsPicker;
