import React from "react";
import Home from "./home";
import Footer from "@/components/layouts/footer.layout";
import Header from "@/components/layouts/header.layout";
import HotelDetails from "./hotel-details";
import { SignUpPage } from "./auth/index";

function App() {
  return (
    <>
      <Header />
      {/* <Home /> */}
      {/* <HotelDetails /> */}
      <SignUpPage />
      <Footer />
    </>
  );
}

export default App;
