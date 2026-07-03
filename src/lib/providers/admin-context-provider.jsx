import React, { createContext, useContext } from "react";
import { useAuthContext } from "./auth-context-provider";
import { Navigate, Outlet, useParams } from "react-router";
import { isAdmin } from "../utils";
import useQuery from "../hooks/useQuery";
import API_CONFIG from "@/config/api.config";

const AdminContext = createContext();

function WithAdminProvider() {
  const { authenticatedUser, authChecked } = useAuthContext();
  if (!authChecked) return null;

  if (!isAdmin(authenticatedUser)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

function AdminContextProvider({ children }) {
  const { hotelId } = useParams();
  const { data, isLoading, refetchQuery, error } = useQuery(
    API_CONFIG.ADMIN.GET_HOTEL_BY_ID(hotelId)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <AdminContext.Provider
      value={{ hotel: data, isLoading, refetchQuery, error }}>
      {children}
    </AdminContext.Provider>
  );
}

function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useAdminContext must be used within the AdminContextProvider"
    );
  }
  return context;
}

export default AdminContextProvider;
export { useAdminContext, WithAdminProvider };
