import { createContext, useContext, useEffect, useState } from "react";
import useQuery from "../hooks/useQuery";
import API_CONFIG from "@/config/api.config";
import { Navigate, Outlet, useLocation } from "react-router";
import { getEncodedRedirecturl } from "../utils";
import { getLocalStorageItem } from "../store.manager";
import { AUTH_TOKEN_KEY } from "@/config/storage.config";
import PATHS from "@/config/path.config";

const AuthContext = createContext(null);

function WithAuthProvider() {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    const redirectUrl = `${location.pathname}${location.search}`;

    return (
      <Navigate to={`/signin?${getEncodedRedirecturl(redirectUrl)}`} replace />
    );
  }

  return <Outlet />;
}

function WithoutAuthProvider() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={PATHS.LANDING} replace />;
  }

  return <Outlet />;
}

function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: !!getLocalStorageItem(AUTH_TOKEN_KEY),
    authenticatedUser: null,
  });

  const { data, isLoading, refetchQuery, error } = useQuery(
    API_CONFIG.USER.PROFILE
  );

  useEffect(() => {
    if (isLoading) return;

    if (!error && data) {
      setAuth({
        authenticatedUser: data,
        isAuthenticated: true,
      });
    } else if (error) {
      setAuth({
        authenticatedUser: null,
        isAuthenticated: false,
      });
    }
  }, [data, isLoading, error]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  function refetchCurrentUser() {
    return refetchQuery();
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        setAuth,
        refetchCurrentUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within the AuthContextProvider"
    );
  }
  return context;
}

export { useAuthContext, WithAuthProvider, WithoutAuthProvider };
export default AuthContextProvider;
