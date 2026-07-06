import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonWithIcon } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import TokenInput from "@/components/ui/token-input";
import useCreateHotelForm from "./hooks/useCreateHotelForm";
import ImageHolder from "@/components/ImageHolder";

function CreateHotelForm() {
  const { form, isLoading, handleCreateHotelFormSubmit } = useCreateHotelForm();

  function handleFiles(e, field) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const previews = files.map((f) => URL.createObjectURL(f));
    field.onChange([...(field.value ?? []), ...previews]);
    e.target.value = "";
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateHotelFormSubmit)}
          className="space-y-6">
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={"flex-1"}>
                  <FormLabel>Hotel Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Grand Plaza Hotel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className={"flex-1"}>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="New York" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <div className="flex flex-wrap gap-6 p-4 border rounded-md">
                  <FormControl>
                    <Input
                      type={"file"}
                      multiple
                      accept="image/*"
                      className={"hidden"}
                      onChange={(e) => handleFiles(e, field)}
                    />
                  </FormControl>
                  {field.value?.map((image, index) => (
                    <ImageHolder
                      key={index}
                      image={image}
                      onRemove={() =>
                        field.onChange(
                          field.value.filter((_, i) => i !== index)
                        )
                      }
                    />
                  ))}
                  <FormLabel className="flex items-center justify-center w-24 h-24 border-2 border-dashed rounded-md cursor-pointer group hover:bg-secondary ">
                    <Icon
                      icon="addImage"
                      size="28"
                      className="text-muted-foreground group-hover:text-primary"
                      strokeWidth={1.5}
                    />
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amenities</FormLabel>
                <FormControl>
                  <TokenInput {...field} placeholder="Wifi, Pool, Parking..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Hotel Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123 Main St, Suite 100" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="40.7128,-74.0060" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123-456-7890" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="contact@hotel.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ButtonWithIcon
            icon={"save"}
            className="px-8 h-11 cursor-pointer"
            isLoading={isLoading}
            disabled={isLoading}>
            Create Hotel
          </ButtonWithIcon>
        </form>
      </Form>
    </div>
  );
}

export default CreateHotelForm;
