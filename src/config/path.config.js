const PATHS = {
  LANDING: "/",

  SIGN_IN: "/signin",
  SIGN_UP: "/signup",

  HOTEL_DETAIL: "/hotels/:hotelId",
  SEARCH_HOTELS: "/hotels/search",

  CHECKOUT: "/hotels/:hotelId/checkout",
  PAYMENT_STATUS: "payments/:bookingId/status",

  SETTINGS: {
    PROFILE: "/me/profile",
    BOOKING_HISTORY: "/me/booking-history",
    TRAVELLERS_MANAGEMENT: "/me/travellers",
  },
};

export default PATHS;
