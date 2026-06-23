# BloodLink

BloodLink is a full-stack blood donation platform built to connect blood donors with people who need urgent support. It provides donor discovery, donation-request management, role-based dashboards, secure funding, and a responsive experience for donors, volunteers, and administrators.

## Live Site

- **Client:** [https://blood-link-client-swdg.vercel.app](https://blood-link-client-swdg.vercel.app)
- **API:** [https://blood-link-server-nine.vercel.app](https://blood-link-server-nine.vercel.app)

## Source Code

- **Client repository:** [BloodLink-Client](https://github.com/ruhul1845/BloodLink-Client)
- **Server repository:** [BloodLink-Server](https://github.com/ruhul1845/BloodLink-Server)

## Purpose

BloodLink makes blood donation coordination faster and easier. Users can find compatible donors by location, publish urgent blood requests, respond to pending requests, manage the complete request lifecycle, and financially support blood donation operations.

## Key Features

- Email and password authentication with JWT-protected private APIs
- Donor registration with ImgBB avatar upload and instant image preview
- Bangladesh district and upazila selection
- Public donor search by blood group, district, and upazila
- Public listing of pending blood donation requests
- Private request details and donation confirmation workflow
- Donation statuses: `pending`, `inprogress`, `done`, and `canceled`
- Active/blocked user control; blocked users cannot create donation requests
- Personal profile viewing and editing with a protected email field
- Role-based dashboards for donors, volunteers, and administrators
- Admin user management with block/unblock and role assignment
- Stripe Checkout funding with role-aware funding history
- Daily, weekly, and monthly donation-request charts using ApexCharts
- Six-item pagination on search results, requests, users, and funding records
- Status filtering, confirmation modals, toast notifications, and custom 404 page
- Responsive layouts and complete light/dark theme support
- Scroll-triggered homepage transitions with reduced-motion accessibility

## User Roles

### Donor

- Search for compatible donors
- View and respond to pending blood requests
- Create and manage personal donation requests while active
- View the three most recent personal requests on the dashboard
- Maintain personal profile information
- Give funds and view personal funding history

### Volunteer

- View dashboard statistics and request charts
- Create and view personal donation requests
- View all blood donation requests
- Filter requests and update request status only
- View all funding records

### Admin

- View platform statistics, charts, and recent users
- View and manage all blood donation requests
- Block or unblock users
- Promote donors to volunteers or administrators
- View all funding records

## Main Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Homepage, featured services, contact form, and navigation |
| `/register` | Public | Donor registration with avatar upload |
| `/login` | Public | Email and password login |
| `/search` | Public | Search active donors by blood group and location |
| `/donation-requests` | Public | Browse pending donation requests |
| `/donation-requests/[id]` | Private | View request details and confirm a donation |
| `/funding` | Private | Give funds and view permitted funding history |
| `/dashboard` | Private | Role-aware dashboard home |
| `/dashboard/profile` | Private | View and update profile information |
| `/dashboard/my-donation-requests` | Private | Manage personal requests with filtering and pagination |
| `/dashboard/create-donation-request` | Private/Active | Create a blood donation request |
| `/dashboard/all-users` | Admin | Manage users, status, and roles |
| `/dashboard/all-blood-donation-request` | Admin/Volunteer | Manage or update all donation requests based on role |

## Technology Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Token and bcryptjs
- **Payments:** Stripe Checkout
- **Image hosting:** ImgBB
- **Deployment:** Vercel

## NPM Packages

### Client

- `next`
- `react` and `react-dom`
- `tailwindcss` and `@tailwindcss/postcss`
- `react-icons`
- `apexcharts` and `react-apexcharts`
- `eslint` and `eslint-config-next`

### Server

- `express`
- `mongodb`
- `bcryptjs`
- `jsonwebtoken`
- `cors`
- `dotenv`
- `stripe`

## Environment Variables

Create a `.env` file in the client project:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Create a `.env` file in the server project:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=Blood
JWT_SECRET=your_secure_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

Never commit real credentials or API keys to source control.

## Run Locally

### 1. Clone the repositories

```bash
git clone https://github.com/ruhul1845/BloodLink-Server.git
git clone https://github.com/ruhul1845/BloodLink-Client.git
```

### 2. Start the server

```bash
cd BloodLink-Server
npm install
npm run dev
```

### 3. Start the client

```bash
cd BloodLink-Client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The local API runs at `http://localhost:5000`.

## Available Client Scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Start the production server
npm run lint   # Run ESLint
```

## Security

- Private API requests require a valid JWT bearer token.
- Passwords are hashed before database storage.
- MongoDB, JWT, Stripe, and ImgBB credentials are stored in environment variables.
- Funding records and dashboard operations are filtered by authenticated role.
- The API verifies account status before allowing donation-request creation.

## Responsive Design

The public website and dashboard support mobile, tablet, and desktop layouts. The dashboard uses a full-height sidebar, responsive data tables, user profile controls, ApexCharts visualizations, and consistent light/dark themes.
