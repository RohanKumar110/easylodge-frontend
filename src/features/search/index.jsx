import React from "react";
import LocationInput from "./location-input";
import DateSelectInput from "./date-select-input";
import OccupancyInput from "./occupancy-input";
import { Button } from "@/components/ui/button";
import useSearchForm from "./hooks/use-search-form";
import { Form } from "@/components/ui/form";

function Search() {
  const { form, handleSearchFormSubmit, handleSearchFormError } =
    useSearchForm();

  return (
    <section className="container">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            handleSearchFormSubmit,
            handleSearchFormError
          )}
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
