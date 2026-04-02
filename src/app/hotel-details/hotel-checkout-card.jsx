import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import React, { useState } from "react";
import { formatCompactNumber } from "@/lib/utils";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@/components/ui/hover-card";

function HotelCheckoutCard({ rooms, cancellationPolicy }) {
  const selectedRoom = rooms?.find((r) => r.isSelected);

  const [numberofGuest, setNumberOfGuest] = useState(
    Math.floor(Math.random() * (10000 - 300 + 1)) + 100
  );
  return (
    <div className="space-y-6">
      <div>
        <div className="flex-1 flex gap-2 items-center">
          <span className="text-2xl font-bold">{`$${selectedRoom.price.toLocaleString()}`}</span>
          <span className="text-base text-muted-foreground line-through">{`$${(selectedRoom.price * 1.24).toLocaleString()}`}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Your Savings</span>
          <span className="text-sm font-bold">
            ${(selectedRoom.price * 0.24).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Total Price</span>
          <span className="text-sm font-bold">
            ${selectedRoom.price.toFixed(2)}
          </span>
        </div>
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
          {`${formatCompactNumber(numberofGuest)} people booked this room in last 6 months`}
        </p>
      </div>

      <CancellationPolicy cancellationPolicy={cancellationPolicy} />
    </div>
  );
}

function CancellationPolicy({ cancellationPolicy }) {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className="cursor-pointer">
        <div className="flex gap-1 text-rose-600 items-center">
          <p className="text-sm font-medium">Cancellation Policy</p>
          <Icon icon="info" size="16" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        side="left"
        className="w-87.5 space-y-3 border-border">
        <h3 className="text-base font-semibold mb-1">Cancellation Policy</h3>
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
