import Icon from "@/components/ui/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DESTINATIONS } from "@/config/app.config";
import { Button } from "@/components/ui/button";

function LocationInput({ form }) {
  const city = form.watch("city");
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  function handleCloseButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    form.setValue("city", "");
  }

  function handleDestinationSelect(e, selectedDest) {
    e.preventDefault();
    form.setValue("city", selectedDest?.city || "");
    setIsPopOverOpen(false);
  }

  return (
    <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
      <PopoverTrigger asChild>
        <div className="h-12 flex flex-auto gap-2 items-center px-4 py-2 rounded bg-background lg:min-w-90">
          <Icon
            icon="bed"
            size="24"
            className="text-muted-foreground shrink-0"
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    id="city"
                    className="w-full h-full px-2 text-sm bg-transparent dark:bg-transparent border-0 shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent placeholder:font-normal placeholder:text-foreground focus:placeholder-muted-foreground"
                    placeholder="Where are you going?"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`cursor-pointer ${city ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={handleCloseButtonClick}>
            <Icon
              icon="close"
              size="18"
              className="text-muted-foreground shrink-0"
            />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        sideOffset="1"
        align="start"
        className="bg-background w-[calc(100vw-2rem)] max-w-90"
        onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="p-3">
          <p className="text-sm font-semibold ">Popular destinations</p>
        </div>
        <div className="max-h-75 overflow-y-auto">
          {DESTINATIONS.map((dest, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-3 py-2 hover:bg-accent cursor-pointer transition-colors duration-200 border-b border-border rounded"
              onClick={(e) => handleDestinationSelect(e, dest)}>
              <Icon icon="location" />
              <div>
                <p className="text-sm font-semibold">{dest.city}</p>
                <p className="text-sm text-muted-foreground">{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default LocationInput;
