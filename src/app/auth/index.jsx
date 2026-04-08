import AuthLayout from "@/components/layouts/auth.layout";
import React from "react";
import SignUp from "./signup";
import SignIn from "./signin";

function SignInPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      desc="Please enter your details to sign in">
      <SignIn />
    </AuthLayout>
  );
}

function SignUpPage() {
  return (
    <AuthLayout title="Create Account" desc="Please fill the form to sign up">
      <SignUp />
    </AuthLayout>
  );
}

export { SignInPage, SignUpPage };
