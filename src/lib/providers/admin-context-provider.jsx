import React from "react";
import { useAuthContext } from "./auth-context-provider";
import { Roles } from "@/config/app.config";
import { Navigate, Outlet } from "react-router";

function WithAdminProvider() {
  const { authenticatedUser, authChecked } = useAuthContext();
  if (!authChecked) return null;

  const isAdmin = authenticatedUser?.roles.includes(Roles.HOTEL_MANAGER);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default WithAdminProvider;