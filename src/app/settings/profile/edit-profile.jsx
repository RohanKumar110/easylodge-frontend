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
import InputDOB from "@/components/ui/input-dob";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import useProfileForm from "./hooks/useProfileForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function EditProfile() {
  const { form, updateProfileHandler, isLoading } = useProfileForm();

  function formatUSPhone(value) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length < 4) return digits;
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(updateProfileHandler)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
              <FormLabel className="inline-flex items-center gap-2">
                Email
                <div className="text-[10px] text-primary bg-blue-100 px-2 py-1 rounded-full">
                  Not Editable
                </div>
              </FormLabel>
              <FormControl>
                <Input readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex-1">
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
          name="contactNumber"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="(555) 000-0000"
                  {...field}
                  onChange={(e) =>
                    field.onChange(formatUSPhone(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarImage src={field.value} />
                    <AvatarFallback>
                      <Icon icon="user" size="20" />
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="https://example.com/photo.jpg"
                    {...field}
                  />
                </div>
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
                  value={field.value ?? ""}
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
        <Button
          disabled={isLoading}
          size="lg"
          type="submit"
          className="cursor-pointer">
          <Icon icon="save" />
          Save Changes
        </Button>
      </form>
    </Form>
  );
}

export default EditProfile;
