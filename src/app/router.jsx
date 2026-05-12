import React from "react";
import Home from "./home";
import SearchPage from "./search";
import HotelDetails from "./hotel-details";
import { SignInPage, SignUpPage } from "./auth";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "@/components/layouts/header.layout";
import Footer from "@/components/layouts/footer.layout";
import PATHS from "@/config/path.config";

function Router() {
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={PATHS.LANDING} element={<Home />} />
        <Route path={PATHS.SIGN_IN} element={<SignInPage />} />
        <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />
        <Route path={PATHS.SEARCH_HOTEL} element={<SearchPage />} />
        <Route path={PATHS.HOTEL_DETAIL} element={<HotelDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
