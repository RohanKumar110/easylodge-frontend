import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import InputDOB from "@/components/ui/input-dob";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { travellerSchema } from "@/lib/validators/traveller-validator";

function AddEditTravellerDialog({
  isDialogOpen,
  setIsDialogOpen,
  triggerNode,
  title,
  desc,
  submitButtonText,
  formInitialData = {},
  mutate,
  isLoading,
  isDisabled,
}) {
  return (
    <AlertDialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      {triggerNode && (
        <AlertDialogTrigger asChild>{triggerNode}</AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">{title}</AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            {desc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AddUpdateTravellerForm
          submitButtonText={submitButtonText}
          formInitialData={formInitialData}
          mutate={mutate}
          isLoading={isLoading}
          isDisabled={isDisabled}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}

function AddUpdateTravellerForm({
  submitButtonText,
  formInitialData,
  mutate,
  isDisabled = false,
}) {
  const form = useForm({
    resolver: zodResolver(travellerSchema),
    defaultValues: {
      name: formInitialData.name ?? "",
      dateOfBirth: formInitialData.dateOfBirth
        ? dayjs(formInitialData.dateOfBirth).format("YYYYMMDD")
        : "",
      gender: formInitialData.gender ?? "",
    },
  });

  function handleTravellerFormSubmit(data) {
    if (mutate && typeof mutate === "function") {
      const year = data.dateOfBirth.slice(0, 4);
      const month = data.dateOfBirth.slice(4, 6);
      const day = data.dateOfBirth.slice(6, 8);

      mutate({
        ...data,
        dateOfBirth: `${year}-${month}-${day}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleTravellerFormSubmit)}
        className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name (as per ID)</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <InputDOB {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-3">
                  <FormItem className="flex items-center px-4 rounded-md border h-10 space-x-1 [&:has([aria-checked=true])]:bg-blue-50 cursor-pointer [&:has([aria-checked=true])]:border-primary space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="MALE"
                        id="gender-male"
                        className="w-auto h-auto border-0 rounded-none">
                        <Icon icon="male" size={20} />
                      </RadioGroupItem>
                    </FormControl>
                    <FormLabel
                      htmlFor="gender-male"
                      className="font-normal cursor-pointer">
                      Male
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center px-4 rounded-md border h-10 space-x-1 [&:has([aria-checked=true])]:bg-pink-50 cursor-pointer [&:has([aria-checked=true])]:border-pink-500 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="FEMALE"
                        id="gender-female"
                        className="w-auto h-auto text-pink-400 border-0 rounded-none">
                        <Icon icon="female" size={20} />
                      </RadioGroupItem>
                    </FormControl>
                    <FormLabel
                      htmlFor="gender-female"
                      className="font-normal cursor-pointer">
                      Female
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDisabled} className="cursor-pointer">
            Discard
          </AlertDialogCancel>
          <Button
            type="submit"
            aria-label={submitButtonText}
            disabled={isDisabled}
            className="cursor-pointer">
            {submitButtonText}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}

export default AddEditTravellerDialog;
