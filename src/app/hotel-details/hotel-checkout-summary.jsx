import React from "react";
import useConfirmCheckout from "./hooks/useConfirmCheckout";
import DateSelectInput from "@/features/search/date-select-input";
import OccupancyInput from "@/features/search/occupancy-input";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

function HotelCheckoutSummary({ selectedRoomDetails }) {
  const { form, handleUpdateDetailsFormSubmit } = useConfirmCheckout();

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateDetailsFormSubmit)}>
          <DateSelectInput form={form} />
          <OccupancyInput form={form} />
          {form.formState.isDirty && (
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="w-full cursor-pointer mt-2"
              aria-label="Apply Changes">
              Apply Changes
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default HotelCheckoutSummary;
