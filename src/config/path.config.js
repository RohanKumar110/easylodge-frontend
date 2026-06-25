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

  ADMIN: {
    ROOT: "/admin",
    LIST_HOTELS: "hotels",
    CREATE_HOTEL: "hotels/create",
    DASHBOARD: {
      ROOT: "hotels/:hotelId",
      OVERVIEW: "overview",
      BOOKINGS: "bookings",
      EDIT_HOTEL: "edit",
      ROOMS: {
        ROOT: "rooms",
        INVENTORY: "rooms/:roomId/inventory",
        EDIT: "rooms/:roomId/edit",
        CREATE: "rooms/create",
      },
    },
  },
};

export default PATHS;
