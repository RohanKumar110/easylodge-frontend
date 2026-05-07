import React from "react";
import Router from "./router";
import { Toaster } from "@/components/ui/sonner";
import AuthContextProvider from "@/lib/providers/auth-context-provider";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router />
        <Toaster richColors position="bottom-center" />
      </AuthContextProvider>
    </>
  );
}

export default App;
