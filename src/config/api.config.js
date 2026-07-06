const API_CONFIG = {
  AUTH: {
    SIGN_UP: "/auth/signup",
    SIGN_IN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  USER: {
    PROFILE: "/users/profile",
    MY_BOOKINGS: "/users/me/bookings",
  },
  HOTEL: {
    BROWSE_HOTELS: "/hotels/search",
    HOTEL_INFO: (hotelId) => `/hotels/${hotelId}/info`,
  },
  BOOKING: {
    INIT_BOOKING: "/bookings/init",
    ADD_BOOKING_TRAVELLERS: (bookingId) => `/bookings/${bookingId}/guests`,
    BOOKING_PAYMENT: (bookingId) => `/bookings/${bookingId}/payments`,
    BOOKING_STATUS: (bookingId) => `/bookings/${bookingId}/status`,
    BOOKING_CANCEL: (bookingId) => `/bookings/${bookingId}/cancel`,
    REMOVE_BOOKING_TRAVELLER: (bookingId) => `/bookings/${bookingId}/guests`,
  },
  TRAVELLER: {
    GET_TRAVELLERS: "/users/guests",
    CREATE_TRAVELLERS: "/users/guests",
    UPDATE_TRAVELLER: (guestId) => `/users/guests/${guestId}`,
    DELETE_TRAVELLER: (guestId) => `/users/guests/${guestId}`,
  },
  ADMIN: {
    GET_ADMIN_HOTELS: "/admin/hotels",
    CREATE_NEW_HOTEL: "/admin/hotels",
    GET_HOTEL_BY_ID: (hotelId) => `/admin/hotels/${hotelId}`,
    GET_HOTEL_REPORTS_BY_ID: (hotelId) => `/admin/hotels/${hotelId}/reports`,
    EDIT_HOTEL_BY_ID: (hotelId) => `/admin/hotels/${hotelId}`,
    DELETE_HOTEL_BY_ID: (hotelId) => `/admin/hotels/${hotelId}`,
    GET_ADMIN_HOTEL_ROOMS_BY_HOTEL_ID: (hotelId) =>
      `/admin/hotels/${hotelId}/rooms`,

    CREATE_NEW_ROOM: (hotelId) => `/admin/hotels/${hotelId}/rooms`,
  },
};

export default API_CONFIG;
