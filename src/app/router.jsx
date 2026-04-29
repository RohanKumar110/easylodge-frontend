import React from "react";
import Home from "./home";
import SearchPage from "./search";
import HotelDetails from "./hotel-details";
import { SignInPage, SignUpPage } from "./auth";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "@/components/layouts/header.layout";
import Footer from "@/components/layouts/footer.layout";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
