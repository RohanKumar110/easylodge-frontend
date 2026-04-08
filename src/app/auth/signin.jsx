import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import Icon from "@/components/ui/icon";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleToggleShowPassword(e) {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  }

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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-email" className="gap-1">
                  Email<span className="ml- text-destructive">*</span>
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
                <FieldLabel htmlFor="signup-password" className="gap-1">
                  Password<span className="text-destructive">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    className="h-10 rounded flex-1"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                  />
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={(e) => handleToggleShowPassword(e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-transparent hover:bg-transparent shadow-none">
                    <Icon
                      size={18}
                      icon={showPassword ? "eyeOff" : "eye"}
                      className="text-muted-foreground"
                    />
                  </Button>
                </div>
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
          aria-label="Login to your account">
          Login
        </Button>
      </form>

      <div className="flex items-center justify-center mt-3">
        <span className="text-sm">
          Don't have an account?{" "}
          <a href="" className="text-primary hover:underline">
            Sign Up
          </a>
        </span>
      </div>
    </>
  );
}

export default SignIn;
