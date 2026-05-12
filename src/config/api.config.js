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
};

export default API_CONFIG;