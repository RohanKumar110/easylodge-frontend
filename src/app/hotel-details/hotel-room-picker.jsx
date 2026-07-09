import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import { SEARCH_PARAMS_KEYS } from "@/config/app.config";

function HotelRoomPicker({ rooms }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedRoomId = searchParams.get(SEARCH_PARAMS_KEYS.SELECTED_ROOM);

  useEffect(() => {
    if (!rooms.find((room) => room?.id === selectedRoomId)) {
      searchParams.set(SEARCH_PARAMS_KEYS.SELECTED_ROOM, rooms[0].id);
      setSearchParams(searchParams, { replace: true });
    }
  }, []);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Choose your room</h2>
      <div className="space-y-4">
        {rooms.map((room) => (
          <Room
            key={room?.id}
            room={room}
            isSelected={selectedRoomId === room?.id}
          />
        ))}
      </div>
    </section>
  );
}

function Room({ room, isSelected }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleRoomSelectClick() {
    searchParams.set(SEARCH_PARAMS_KEYS.SELECTED_ROOM, room?.id);
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <article>
      {isSelected && (
        <div className="flex items-center gap-1 px-5 py-1 rounded-t-lg bg-brand">
          <Icon
            icon="star"
            size="14"
            className="fill-amber-500 stroke-transparent"
          />
          <p className="text-xs font-bold text-white uppercase">
            Selected Category
          </p>
        </div>
      )}

      <div className="flex justify-between items-center border border-border p-4">
        <div className="flex-1 space-y-4">
          <div className="flex gap-1 items-center">
            <h3 className="text-lg font-semibold">{room?.type}</h3>
            {isSelected && (
              <Icon
                icon="circleCheck"
                size="24"
                className="fill-green-600 text-white"
              />
            )}
          </div>
          <div>
            <ul className="flex flex-wrap gap-2">
              {room?.amenities.map((amenity, index) => (
                <li key={index} className="flex gap-2 items-center min-w-45">
                  <Icon icon="check" size="18" className="text-green-600" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {amenity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-45 h-30">
          <img
            src={room?.images[0]}
            alt={room?.images[0]}
            className="object-cover size-full rounded-lg"
          />
        </div>
      </div>

      <div className="flex border-x border-b rounded-b-lg p-4">
        <div className="flex-1 flex gap-2 items-center">
          <span className="text-lg font-bold">{`$${room?.basePrice?.toLocaleString()}`}</span>
          <span className="text-sm text-muted-foreground line-through">{`$${(room?.basePrice * 1.24).toLocaleString()}`}</span>
        </div>
        <Button
          disabled={isSelected}
          onClick={handleRoomSelectClick}
          variant="outline"
          size="lg"
          className={`cursor-pointer h-12 font-semibold gap-1 w-45 disabled:opacity-70 uppercase
              ${!isSelected && "hover:text-destructive text-destructive"}
            `}>
          {isSelected && (
            <Icon icon="circleCheck" className="fill-green-600 text-white" />
          )}
          {isSelected ? "Selected" : "Select"}
        </Button>
      </div>
    </article>
  );
}

export default HotelRoomPicker;
