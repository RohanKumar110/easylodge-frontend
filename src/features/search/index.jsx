import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import LocationInput from "./location-input";
import DateSelectInput from "./date-select-input";
import OccupancyInput from "./occupancy-input";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

function Search() {
  const form = useForm({
    defaultValues: {
      city: "",
      bookingDates: {
        from: dayjs().toDate(),
        to: dayjs().add(1, "day").toDate(),
      },
      roomsCount: 1,
    },
  });

  function onSubmit(data) {
    console.log("Search data: ", data);
  }

  return (
    <section className="container">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 lg:gap-1 p-2 lg:p-1 bg-yellow-500 lg:flex-row lg:items-center rounded">
          <LocationInput form={form} />
          <DateSelectInput form={form} />
          <OccupancyInput form={form} />
          <Button type="submit" className="h-12 text-lg cursor-pointer">
            Search
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default Search;
