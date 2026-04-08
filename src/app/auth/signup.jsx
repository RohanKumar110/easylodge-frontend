import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import React from "react";
import { Controller, useForm } from "react-hook-form";

function SignUp() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log("data");
    console.log(data);
  }

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 w-full space-y-5">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-name">
                  Name<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="signup-name"
                  className="h-10 rounded"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-email">
                  Email<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="signup-email"
                  type="email"
                  className="h-10 rounded"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-password">
                  Password<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="signup-password"
                  type="password"
                  className="h-10 rounded"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          type="submit"
          className="w-full h-10 bg-brand cursor-pointer"
          aria-label="Create a new Account">
          Create New Account
        </Button>
      </form>

      <div className="flex items-center justify-center mt-3">
        <span className="text-sm">
          Already have an account?{" "}
          <a href="" className="text-primary hover:underline">
            Sign In
          </a>
        </span>
      </div>
    </>
  );
}

export default SignUp;
