import React from "react";
import useConfirmCheckout from "./hooks/useConfirmCheckout";
import DateSelectInput from "@/features/search/date-select-input";
import OccupancyInput from "@/features/search/occupancy-input";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

function HotelCheckoutSummary({ selectedRoomDetails }) {
  const { form, handleUpdateDetailsFormSubmit, handleCheckoutConfirmSubmit } =
    useConfirmCheckout();
  const {
    nightlyPrice,
    totalPrice,
    originalPrice,
    savings,
    nights,
    roomsCount,
  } = selectedRoomDetails;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            ${totalPrice.toLocaleString()}
          </span>

          {originalPrice > totalPrice && (
            <span className="text-base line-through text-muted-foreground">
              ${originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          ${nightlyPrice.toLocaleString()} per night × {nights} night
          {nights > 1 ? "s" : ""} × {roomsCount} room
          {roomsCount > 1 ? "s" : ""}
        </p>
      </div>

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

      <div className="space-y-3">
        <PriceRow label="Your Savings" value={savings} />
        <PriceRow label="Total Price" value={totalPrice} />
      </div>

      <Button
        onClick={handleCheckoutConfirmSubmit}
        className="w-full h-12 text-base font-semibold cursor-pointer"
        aria-label="Continue to Book">
        Continue to Book
      </Button>
    </div>
  );
}

function PriceRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <span className="text-sm font-bold">${value.toFixed(2)}</span>
    </div>
  );
}

export default HotelCheckoutSummary;
