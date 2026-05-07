import { createContext, useContext, useEffect, useState } from "react";
import useQuery from "../hooks/useQuery";
import API_CONFIG from "@/config/api.config";

const AuthContext = createContext({
  isAuthenticated: false,
  authenticatedUser: null,
  setAuthenticatedUser: () => {},
});

function AuthContextProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    authenticatedUser: null,
    isAuthenticated: false,
  });

  const { data, isLoading, error } = useQuery(API_CONFIG.USER.PROFILE);
  useEffect(() => {
    if (!isLoading && !error && data) {
      setAuthenticatedUser({
        authenticatedUser: data,
        isAuthenticated: true,
      });
    }
  }, [data, isLoading, error]);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider
      value={{ ...authenticatedUser, setAuthenticatedUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthConext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within the AuthContextProvider"
    );
  }
  return context;
}

export { useAuthConext };
export default AuthContextProvider;
