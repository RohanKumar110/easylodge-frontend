import { createContext, useContext, useEffect, useState } from "react";
import useQuery from "../hooks/useQuery";
import API_CONFIG from "@/config/api.config";

const AuthContext = createContext({
  isAuthenticated: false,
  authenticatedUser: null,
  setAuth: () => {},
  refetchCurrentUser: () => {},
});

function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
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
    } else {
      setAuth({
        authenticatedUser: null,
        isAuthenticated: false,
      });
    }
  }, [data, isLoading, error]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider
      value={{ refetchCurrentUser: refetchQuery, setAuth, ...auth }}>
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

export { useAuthContext };
export default AuthContextProvider;
