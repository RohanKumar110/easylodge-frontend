import React from "react";
import Home from "./home";
import SearchPage from "./search";
import HotelDetails from "./hotel-details";
import { SignInPage, SignUpPage } from "./auth";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "@/components/layouts/header.layout";
import Footer from "@/components/layouts/footer.layout";
import PATHS from "@/config/path.config";
import CheckoutPage from "./checkout";
import {
  WithAuthProvider,
  WithoutAuthProvider,
} from "@/lib/providers/auth-context-provider";
import PaymentStatus from "./payment";
import SettingsLayout from "./settings/settings-layout";
import Profile from "./settings/profile";
import BookingHistory from "./settings/bookings";
import TravellersManagement from "./settings/travellers";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={PATHS.LANDING} element={<Home />} />

        <Route element={<WithoutAuthProvider />}>
          <Route path={PATHS.SIGN_IN} element={<SignInPage />} />
          <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />
        </Route>

        <Route path={PATHS.SEARCH_HOTELS} element={<SearchPage />} />
        <Route path={PATHS.HOTEL_DETAIL} element={<HotelDetails />} />

        <Route element={<WithAuthProvider />}>
          <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
          <Route path={PATHS.PAYMENT_STATUS} element={<PaymentStatus />} />

          <Route element={<SettingsLayout />}>
            <Route path={PATHS.SETTINGS.PROFILE} element={<Profile />} />
            <Route
              path={PATHS.SETTINGS.TRAVELLERS_MANAGEMENT}
              element={<TravellersManagement />}
            />
            <Route
              path={PATHS.SETTINGS.BOOKING_HISTORY}
              element={<BookingHistory />}
            />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
