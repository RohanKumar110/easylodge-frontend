import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import React, { useMemo } from "react";
import { formatCompactNumber } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useFetchSelectedRoom from "./hooks/useFetchSelectedRoom";
import HotelCheckoutSummary from "./hotel-checkout-summary";

function HotelCheckoutCard({ rooms = [], cancellationPolicy = [] }) {
  const selectedRoomDetails = useFetchSelectedRoom(rooms);
  const {
    selectedRoom,
    nightlyPrice,
    totalPrice,
    originalPrice,
    savings,
    nights,
    roomsCount,
  } = selectedRoomDetails;

  const numberOfGuests = useMemo(
    () => Math.floor(Math.random() * (10000 - 300 + 1)) + 300,
    []
  );

  if (!selectedRoom) {
    return <p className="text-sm text-muted-foreground">No room selected.</p>;
  }

  return (
    <div className="space-y-6">
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

      <HotelCheckoutSummary selectedRoomDetails={selectedRoomDetails} />

      <div className="space-y-3">
        <PriceRow label="Your Savings" value={savings} />
        <PriceRow label="Total Price" value={totalPrice} />
      </div>

      <Button
        className="w-full h-12 text-base font-semibold"
        aria-label="Continue to Book">
        Continue to Book
      </Button>

      <div className="flex gap-1">
        <Icon
          icon="zap"
          size="16"
          className="mt-0.75 shrink-0 fill-rose-600 text-rose-600"
        />
        <p className="text-sm font-medium text-rose-600">
          {formatCompactNumber(numberOfGuests)} people booked this room in last
          6 months
        </p>
      </div>

      <CancellationPolicy cancellationPolicy={cancellationPolicy} />
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

function CancellationPolicy({ cancellationPolicy }) {
  if (!cancellationPolicy.length) return null;

  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <button className="flex items-center gap-1 text-rose-600">
          <span className="text-sm font-medium">Cancellation Policy</span>
          <Icon icon="info" size="16" />
        </button>
      </HoverCardTrigger>

      <HoverCardContent
        align="center"
        side="left"
        className="w-87.5 space-y-3 border-border">
        <h3 className="mb-1 text-base font-semibold">Cancellation Policy</h3>

        <ul className="pl-4 space-y-3 list-disc">
          {cancellationPolicy.map((policy, index) => (
            <li key={index}>{policy}</li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}

export default HotelCheckoutCard;
