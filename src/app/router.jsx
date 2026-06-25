import React from "react";
import Home from "./home";
import SearchPage from "./search";
import HotelDetails from "./hotel-details";
import { SignInPage, SignUpPage } from "./auth";
import { BrowserRouter, Route, Routes } from "react-router";
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
import RegularUserLayout from "@/components/layouts/regular.user.layout";
import WithAdminProvider from "@/lib/providers/admin-context-provider";
import AdminPage from "./admin";
import Hotels from "./admin/hotels";
import CreateHotel from "./admin/create-hotel";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RegularUserLayout />}>
          <Route index path={PATHS.LANDING} element={<Home />} />

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
        </Route>

        <Route element={<WithAuthProvider />}>
          <Route element={<WithAdminProvider />}>
            <Route path={PATHS.ADMIN.ROOT} element={<AdminPage />}>
              <Route index element={<Hotels />} />
              <Route path={PATHS.ADMIN.LIST_HOTELS} element={<Hotels />} />
              <Route
                path={PATHS.ADMIN.CREATE_HOTEL}
                element={<CreateHotel />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
