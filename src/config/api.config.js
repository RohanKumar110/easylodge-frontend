const API_CONFIG = {
  HOTEL: {
    BROWSE_HOTELS: "/hotels/search",
    HOTEL_INFO: (hotelId) => `/hotels/${hotelId}/info`,
  },
  AUTH: {
    SIGN_UP: "/auth/signup",
    SIGN_IN: "/auth/login",
  },
};

export default API_CONFIG;