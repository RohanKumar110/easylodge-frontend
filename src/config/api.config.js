const API_CONFIG = {
  AUTH: {
    SIGN_UP: "/auth/signup",
    SIGN_IN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  USER: {
    PROFILE: "/users/profile",
  },
  HOTEL: {
    BROWSE_HOTELS: "/hotels/search",
    HOTEL_INFO: (hotelId) => `/hotels/${hotelId}/info`,
  },
  BOOKING: {
    INIT_BOOKING: "/bookings/init",
    ADD_BOOKING_GUESTS: (bookingId) => `/bookings/${bookingId}/guests`,
    BOOKING_PAYMENT: (bookingId) => `/bookings/${bookingId}/payments`,
    BOOKING_STATUS: (bookingId) => `/bookings/${bookingId}/status`,
    BOOKING_CANCEL: (bookingId) => `/bookings/${bookingId}/cancel`,
  },
  GUESTS: {
    GET_GUESTS: "/users/guests",
    CREATE_GUESTS: "/users/guests",
    UPDATE_GUEST: (guestId) => `/users/guests/${guestId}`,
    DELETE_GUEST: (guestId) => `/users/guests/${guestId}`,
  },
};

export default API_CONFIG;
