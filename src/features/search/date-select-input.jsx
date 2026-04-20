import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem } from "@/components/ui/form";
import Icon from "@/components/ui/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import React from "react";

function DateSelectInput({ form }) {
  return (
    <Popover>
      <FormField
        control={form.control}
        name="bookingDates"
        render={({ field }) => (
          <>
            <PopoverTrigger asChild>
              <FormItem className="h-12 px-4 py-2 rounded bg-background flex-auto">
                <div
                  role="button"
                  className="flex flex-auto items-center w-full h-full cursor-pointer">
                  <Icon
                    icon="calendar"
                    size="24"
                    className="text-muted-foreground shrink-0"
                  />
                  <div className="flex items-center flex-1 gap-2 px-2">
                    <p className="text-sm">
                      {field.value?.from
                        ? dayjs(field.value.from).format("ddd D MMM")
                        : "Check-In date"}
                    </p>
                    <span aria-hidden>-</span>
                    <p className="text-sm">
                      {field.value?.to
                        ? dayjs(field.value.to).format("ddd D MMM")
                        : "Check-Out date"}
                    </p>
                  </div>
                </div>
              </FormItem>
            </PopoverTrigger>

            <PopoverContent
              sideOffset={4}
              align="start"
              className="bg-background w-[calc(100vw-2rem)] lg:w-auto"
              onOpenAutoFocus={(e) => e.preventDefault()}>
              <Calendar
                required
                mode="range"
                min={2}
                numberOfMonths={2}
                selected={field.value}
                fromMonth={new Date()}
                disabled={(date) => dayjs().isAfter(dayjs(date), "date")}
                onSelect={(value) => field.onChange(value)}
              />
            </PopoverContent>
          </>
        )}
      />
    </Popover>
  );
}

export default DateSelectInput;
