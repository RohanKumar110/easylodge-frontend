const { createContext } = require("react");

const AuthContext = createContext({
  authenticatedUser: null,
  isAuthenticated: false,
});

function AuthContextProvider({ children }) {

  

  return <AuthContext>{children}</AuthContext>;
}
