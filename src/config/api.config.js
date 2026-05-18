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
    ADD_GUEST: (bookingId) => `/bookings/${bookingId}/addGuests`,
    BOOKING_PAYMENT: (bookingId) => `/bookings/${bookingId}/payments`,
    BOOKING_STATUS: (bookingId) => `/bookings/${bookingId}/status`,
    BOOKING_CANCEL: (bookingId) => `/bookings/${bookingId}/cancel`,
  },
};

export default API_CONFIG;
