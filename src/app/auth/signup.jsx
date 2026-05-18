import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link } from "react-router";
import useSignUpForm from "./hooks/useSignUpForm";

function SignUp() {
  const { form, isLoading, handleSignUpFormSubmit } = useSignUpForm();

  const [showPassword, setShowPassword] = useState(false);

  function handleToggleShowPassword(e) {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUpFormSubmit)}
          className="mt-8 w-full space-y-5">
          <div className="space-y-5">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="signup-name" className="gap-1">
                    Name<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="signup-name"
                      className="h-10 rounded"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="signup-email" className="gap-1">
                    Email<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="signup-email"
                      type="email"
                      className="h-10 rounded"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="signup-password" className="gap-1">
                    Password<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        className="h-10 rounded flex-1"
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || form.formState.isSubmitting}
            className="w-full h-10 bg-brand cursor-pointer"
            aria-label="Create a new Account">
            {isLoading ? "Creating..." : "Create New Account"}
          </Button>
        </form>
      </Form>

      <div className="flex items-center justify-center mt-3">
        <span className="text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Sign In
          </Link>
        </span>
      </div>
    </>
  );
}

export default SignUp;
