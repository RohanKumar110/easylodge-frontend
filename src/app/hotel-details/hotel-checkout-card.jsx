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

  const numberOfGuests = useMemo(
    () => Math.floor(Math.random() * (10000 - 300 + 1)) + 300,
    []
  );

  if (!selectedRoomDetails.selectedRoom) {
    return <p className="text-sm text-muted-foreground">No room selected.</p>;
  }

  return (
    <div className="space-y-6">
      <HotelCheckoutSummary selectedRoomDetails={selectedRoomDetails} />

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
