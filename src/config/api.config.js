const API_CONFIG = {
  HOTEL: {
    BROWSE_HOTELS: "/hotels/search",
    HOTEL_INFO: (hotelId) => `/hotels/${hotelId}/info`,
  },
};

export default API_CONFIG;
