export const ADMIN_SIDEBAR = [
  {
    id: "1",
    label: "Overview",
    to: ({ hotelId }) => `/admin/hotels/${hotelId}/overview`,
    logo: "dashboard",
  },
  {
    id: "2",
    label: "Bookings",
    to: ({ hotelId }) => `/admin/hotels/${hotelId}/bookings`,
    logo: "calendar",
  },
  {
    id: "3",
    label: "Rooms",
    to: ({ hotelId }) => `/admin/hotels/${hotelId}/rooms`,
    logo: "hotel",
  },
];

export const SEARCH_PARAMS_KEYS = {
  DURATION: "duration",
};

export const DURATION_FILTER_OPTIONS = [
  {
    label: "7 days",
    value: 7,
  },
  {
    label: "30 days",
    value: 30,
  },
  {
    label: "90 days",
    value: 90,
  },
  {
    label: "1 year",
    value: 365,
  },
];

export const TOP_BOOKING_TABLE_HEADERS = [
  {
    id: 0,
    label: "Id",
    className: "w-[80px] text-center",
  },
  {
    id: 8,
    label: "User",
    className: "w-[140px]",
  },
  {
    id: 7,
    label: "Room Type",
    className: "w-[100px]",
  },
  {
    id: 1,
    label: "Count",
    className: "w-[50px]",
  },
  {
    id: 2,
    label: "Check In",
    className: "w-[140px]",
  },
  {
    id: 3,
    label: "Check Out",
    className: "w-[140px]",
  },
  {
    id: 4,
    label: "Status",
    className: "w-[160px]",
  },
  {
    id: 5,
    label: "Amount",
    className: "w-[10%]",
  },
];

export const ROOM_INVENTORY_TABLE_HEADERS = [
  {
    id: 0,
    label: "S.NO",
    className: "w-[12%]",
  },
  {
    id: 1,
    label: "Date",
    className: "w-[120px]",
  },
  {
    id: 2,
    label: "Booking Count",
    className: "w-[50px]",
  },
  {
    id: 3,
    label: "Reserved Count",
    className: "w-[50px]",
  },
  {
    id: 4,
    label: "Surge Count",
    className: "w-[50px]",
  },
  {
    id: 5,
    label: "Amount",
    className: "w-[12%]",
  },
  {
    id: 6,
    label: "Status",
    className: "w-[12%]",
  },
];

export const INVENTORY_ROOM_STATUS = {
  active: {
    className:
      "bg-green-200 text-green-600 dark:bg-green-900 dark:text-green-300 ",
    text: "Active",
  },
  inactive: {
    className: "bg-gray-200 text-gray-600 dark:bg-gray-900 dark:text-gray-300",
    text: "Inactive",
  },
};
