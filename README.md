# EasyLodge — Frontend

The client-side application for EasyLodge, a full-stack hotel booking platform. Built with **React 19** and **Vite 8**, featuring a multi-step booking flow, Stripe payment UI, JWT-based session management, and a fully responsive interface using Shadcn UI and Tailwind CSS v4.

**Backend Repository:** [easylodge](https://github.com/RohanKumar110/easylodge)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router v7 |
| UI Components | Shadcn UI (New York style) + Radix UI |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Date Handling | react-day-picker v9, date-fns, dayjs |
| Notifications | Sonner |
| Icons | Lucide React |
| Carousel | Embla Carousel |
| Theming | next-themes (dark / light mode) |
| Font | Geist Variable |
| Linting | ESLint 9 |

---

## Features

### Guest User
- Browse hotels and view room listings
- Select check-in / check-out dates via an interactive date range picker
- View real-time room availability and dynamic pricing
- Complete a multi-step booking flow: room selection → booking confirmation → payment
- Pay via Stripe (card input handled through Stripe Elements)
- View booking history and booking status
- Cancel pending bookings

### Admin User
- Manage hotel and room inventory
- View all bookings across all users with status filtering
- Update room availability and pricing configuration

### General
- JWT-based authentication with protected routes
- Dark / light mode toggle (persisted via `next-themes`)
- Form validation with real-time field-level error feedback (Zod schemas + React Hook Form)
- Toast notifications for all async operations (Sonner)
- Responsive layout across desktop and mobile viewports

---

## Project Structure

```
src/
├── components/
│   ├── ui/               # Shadcn UI base components (Button, Input, Dialog, etc.)
│   ├── layout/           # Navbar, Footer, Page layout wrappers
│   ├── hotel/            # HotelCard, HotelDetail, RoomList, RoomCard
│   ├── booking/          # BookingForm, BookingSteps, BookingSummary
│   ├── payment/          # PaymentForm, Stripe Elements wrapper
│   └── auth/             # LoginForm, RegisterForm, ProtectedRoute
├── pages/
│   ├── Home.jsx          # Landing page with hotel search
│   ├── Hotels.jsx        # Hotel listing with filters
│   ├── HotelDetail.jsx   # Room availability and booking entry
│   ├── Booking.jsx       # Multi-step booking + payment flow
│   ├── Dashboard.jsx     # User booking history
│   ├── Admin.jsx         # Admin panel (bookings, rooms, hotels)
│   ├── Login.jsx
│   └── Register.jsx
├── hooks/
│   ├── useAuth.js        # Auth state, login/logout, JWT decode
│   ├── useBooking.js     # Booking state across multi-step flow
│   └── usePricing.js     # Dynamic pricing display logic
├── lib/
│   ├── api.js            # Axios instance with JWT interceptor
│   ├── utils.js          # cn() utility (clsx + tailwind-merge)
│   └── validations.js    # Zod schemas for all forms
└── main.jsx              # App entry, React Router setup, ThemeProvider
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- Backend API running at `http://localhost:8080` (see [easylodge backend](https://github.com/RohanKumar110/easylodge))

### 1. Clone the repository
```bash
git clone https://github.com/RohanKumar110/easylodge-frontend.git
cd easylodge-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
The `.env` file is already present in the repository with default local values. Update if your backend runs on a different port:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 4. Run the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 5. Build for production
```bash
npm run build
```

Output is generated in the `dist/` directory.

---

## Authentication Flow

1. User submits login credentials via the `LoginForm`
2. Axios posts to `/api/auth/login` — backend returns a signed JWT
3. The JWT is stored in memory (not `localStorage`) and attached to all subsequent requests via an Axios request interceptor
4. React Router's `ProtectedRoute` component checks auth state before rendering private pages
5. On token expiry or logout, the auth state is cleared and the user is redirected to `/login`

---

## Form Validation

All forms use **React Hook Form** with **Zod** schema resolvers. Validation is schema-driven and applied client-side before any API call is made:

- `registerSchema` — name, email format, password strength, confirm password match
- `loginSchema` — email format, non-empty password
- `bookingSchema` — check-in/check-out dates (check-out must be after check-in, both must be future dates), guest count
- `paymentSchema` — handled by Stripe Elements (card validation is delegated to Stripe)

---

## API Communication

All HTTP requests go through a centralized Axios instance (`src/lib/api.js`) that:
- Sets `baseURL` from `VITE_API_BASE_URL`
- Attaches `Authorization: Bearer <token>` header automatically
- Handles `401` responses globally (redirects to login)
- Provides consistent error handling across all service calls

---

## Theming

The application supports light and dark modes using `next-themes`. The active theme is persisted across sessions. Shadcn UI components inherit the active color scheme via CSS variables configured with the `neutral` base color and New York style.
