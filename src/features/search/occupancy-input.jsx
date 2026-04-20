import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Icon from "@/components/ui/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

function OccupancyInput({ form }) {
  const roomsCount = form.watch("roomsCount");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="h-12 px-4 py-2 rounded bg-background border-border min-w-60 flex flex-auto items-center justify-between cursor-pointer"
          role="button">
          <div className="flex items-center gap-2">
            <Icon
              icon="user"
              size="24"
              className="text-muted-foreground shrink-0"
            />
            <p className="text-sm">{roomsCount} rooms</p>
          </div>
          <Icon
            icon="dropdown"
            size="18"
            className="text-muted-foreground shrink-0"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent sideOffset="1" align="start" className="bg-background w-[calc(100vw-2rem)] max-w-80">
        <FormField
          control={form.control}
          name="roomsCount"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Rooms</FormLabel>
              <FormControl>
                <div className="border rounded border-foreground/50 flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer size-10 text-primary hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      if (field.value > 1) field.onChange(field.value - 1);
                    }}>
                    <Icon icon="minus" />
                  </Button>
                  <span>{field.value}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer size-10 text-primary hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      field.onChange(field.value + 1);
                    }}>
                    <Icon icon="plus" />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </PopoverContent>
    </Popover>
  );
}

export default OccupancyInput;
