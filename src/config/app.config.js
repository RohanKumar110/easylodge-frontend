export const SERVICE_LIST = [
  {
    id: 1,
    title: "Stays",
    icon: "bed",
    active: true,
    show: true,
  },
  {
    id: 2,
    title: "Flights",
    icon: "flight",
    show: false,
  },
  {
    id: 4,
    title: "Car rentals",
    icon: "car",
    show: false,
  },
  {
    id: 5,
    title: "Attractions",
    icon: "attraction",
    show: false,
  },
  {
    id: 6,
    title: "Airport taxis",
    icon: "taxi",
    show: false,
  },
];

export const TRENDING_DESTINATIONS = [
  {
    title: "New Delhi",
    image: "delhi.jpg",
    className: "sm:col-span-3 sm:col-start-1 col-span-full",
  },
  {
    title: "Bangalore",
    image: "bangalore.jpg",
    className: "sm:col-span-3 sm:col-start-4 col-span-full",
  },
  {
    title: "Mumbai",
    image: "mumbai.jpg",
    className: "md:col-span-2 md:col-start-1 col-span-full",
  },
  {
    title: "Chennai",
    image: "chennai.jpg",
    className: "md:col-span-2 md:col-start-3 sm:col-span-3 col-span-full",
  },
  {
    title: "Hyderabad",
    image: "hyderabad.jpg",
    className: "md:col-span-2 md:col-start-5 sm:col-span-3 col-span-full",
  },
];

export const FOOTER_SECTION = [
  {
    title: "Support",
    links: [
      { text: "Coronavirus (COVID-19) FAQs", href: "#" },
      { text: "Manage your trips", href: "#" },
      { text: "Contact Customer Service", href: "#" },
      { text: "Safety resource centre", href: "#" },
    ],
  },
  {
    title: "Discover",
    links: [
      { text: "Genius loyalty programme", href: "#" },
      { text: "Seasonal and holiday deals", href: "#" },
      { text: "Travel articles", href: "#" },
      { text: "Booking.com for Business", href: "#" },
      { text: "Traveller Review Awards", href: "#" },
      { text: "Car hire", href: "#" },
      { text: "Flight finder", href: "#" },
      { text: "Restaurant reservations", href: "#" },
      { text: "Booking.com for Travel Agents", href: "#" },
    ],
  },
  {
    title: "Terms and settings",
    links: [
      { text: "Privacy & cookies", href: "#" },
      { text: "Terms and conditions", href: "#" },
      { text: "Grievance officer", href: "#" },
      { text: "Modern Slavery Statement", href: "#" },
      { text: "Human Rights Statement", href: "#" },
    ],
  },
  {
    title: "Partners",
    links: [
      { text: "Extranet login", href: "#" },
      { text: "Partner help", href: "#" },
      { text: "List your property", href: "#" },
      { text: "Become an affiliate", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { text: "About Booking.com", href: "https://codingshuttle.com" },
      { text: "How we work", href: "#" },
      { text: "Sustainability", href: "#" },
      { text: "Press centre", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Investor relations", href: "#" },
      { text: "Corporate contact", href: "#" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { icon: "pinterest", href: "#", title: "Pinterest" },
  { icon: "twitter", href: "#", title: "Twitter" },
  { icon: "instagram", href: "#", title: "Instagram" },
  { icon: "youtube", href: "#", title: "Youtube" },
];

export const DESTINATIONS = [
  { city: "Jaipur", country: "India" },
  { city: "Delhi", country: "India" },
  { city: "Goa", country: "India" },
  { city: "Gurgaon", country: "India" },
  { city: "North Goa", country: "India" },
  { city: "Mumbai", country: "India" },
  { city: "Bangalore", country: "India" },
  { city: "Hyderabad", country: "India" },
  { city: "Chennai", country: "India" },
  { city: "Pune", country: "India" },
];

export const STAR_FILTERS = [
  { id: 1, label: "5 Stars", value: 5 },
  { id: 2, label: "4 Stars", value: 4 },
  { id: 3, label: "3 Stars", value: 3 },
  { id: 4, label: "2 Stars", value: 2 },
  { id: 5, label: "1 Star", value: 1 },
];

export const PRICE_FILTERS = [
  { id: 1, label: "$0 - $500", value: "0-500" },
  { id: 2, label: "$500 - $1000", value: "500-1000" },
  { id: 3, label: "$1000 - $1500", value: "1000-1500" },
  { id: 4, label: "$1500 - $2000", value: "1500-2000" },
  { id: 5, label: "$2000 - $2500", value: "2000-2500" },
];

export const SEARCH_FILTERS = [
  { id: 1, label: "Price (lowest first)", value: "price", order: "asc" },
  { id: 2, label: "Price (highest first)", value: "price", order: "desc" },
];

export const SEARCH_FILTER_LABEL_KEY = {
  "price-asc": "Price (lowest first)",
  "price-desc": "Price (highest first)",
};

export const SEARCH_RESULT_PAGE_LIMIT = 10;

export const SEARCH_PARAMS_KEYS = {
  CHECKIN: "startDate",
  CHECKOUT: "endDate",
  ROOMS: "roomsCount",
  CITY: "city",
  SELECTED_ROOM: "selectedRcid",
  SORTBY: "sort",
  PAGE: "pageNo",
  STAR_CATEGORY: "starCategory",
  PRICE_RANGE: "priceRange",
  NEXT_REDIRECT: "next",
};

export const ERROR_FALLBACK = {
  TITLE: "Internal Server Error",
  DESCRIPTION: "Something went wrong. Please try again later.",
};

export const HOTEL_TIMINGS = {
  CHECKIN: "12:00 PM",
  CHECKOUT: "11:00 AM",
};

export const bookingStatusVariant = {
  CONFIRMED: {
    className: "border-green-600 bg-green-100 text-green-600",
    text: "Completed",
  },
  CANCELLED: {
    className: "border-red-600 bg-red-100 text-red-600",
    text: "Cancelled",
  },
  PAYMENTS_PENDING: {
    className: "border-amber-600 bg-amber-100 text-amber-600",
    text: "Pending",
  },
};

export const Roles = {
  GUEST: "GUEST",
  HOTEL_MANAGER: "HOTEL_MANAGER",
};

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
