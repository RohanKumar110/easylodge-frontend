import React from "react";
import { useAuthContext } from "./auth-context-provider";
import { Navigate, Outlet } from "react-router";
import { isAdmin } from "../utils";

function WithAdminProvider() {
  const { authenticatedUser, authChecked } = useAuthContext();
  if (!authChecked) return null;

  if (!isAdmin(authenticatedUser)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default WithAdminProvider;
