import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DateSelectInput from "@/features/search/date-select-input";
import { Switch } from "@/components/ui/switch";
import { ButtonWithIcon } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUpdateInventoryForm from "./hooks/useUpdateInventoryForm";

function UpdateInventoryForm({ refetchInventories }) {
  const { form, handleInventoryFormSubmit, isLoading } =
    useUpdateInventoryForm(refetchInventories);

  return (
    <section className="p-4 border rounded-md">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold">Update Inventory</h2>
        <p className="text-sm text-muted-foreground">
          Modify availability, pricing, and status to keep the inventory up to
          date.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleInventoryFormSubmit)}
          className="space-y-6 max-w-100 pt-6">
          <div className="flex flex-col gap-2">
            <FormLabel className="text-sm">Select Date Range</FormLabel>
            <DateSelectInput
              form={form}
              className="border rounded-lg border-border"
            />
          </div>

          <FormField
            control={form.control}
            name="surgeFactor"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Surge Factor</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. 1.2, 2"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/[^0-9.]/, ""))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="closed"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <FormLabel className="text-sm">Closed</FormLabel>
                <FormControl>
                  <Switch
                    className={`cursor-pointer`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <ButtonWithIcon
            className="cursor-pointer"
            icon={"check"}
            disabled={isLoading}
            isLoading={isLoading}>
            Update Inventory
          </ButtonWithIcon>
        </form>
      </Form>
    </section>
  );
}

export default UpdateInventoryForm;
