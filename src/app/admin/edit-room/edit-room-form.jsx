import { ButtonWithIcon } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TokenInput from "@/components/ui/token-input";
import Icon from "@/components/ui/icon";
import ImageHolder from "@/components/ImageHolder";
import useEditRoomForm from "./hooks/useEditRoomForm";

function EditRoomForm({ room }) {
  const { form, handleEditRoomFormSubmit, isLoading } = useEditRoomForm(room);

  function handleFiles(e, field) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const previews = files.map((f) => URL.createObjectURL(f));
    field.onChange([...(field.value ?? []), ...previews]);
    e.target.value = "";
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEditRoomFormSubmit)}
          className="space-y-6 max-w-142">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Room Type</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Deluxe King Room" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="basePrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Base Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="150"
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D+/g, ""))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="totalRoomsCount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Total Room Count</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="10"
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D+/g, ""))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Total Capacity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="2"
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D+/g, ""))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonWithIcon
            icon="save"
            className="px-8 h-11 cursor-pointer"
            disabled={isLoading}
            isLoading={isLoading}>
            Save Room
          </ButtonWithIcon>
        </form>
      </Form>
    </section>
  );
}

export default EditRoomForm;
