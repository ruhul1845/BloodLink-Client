# BloodLink

BloodLink is a full-stack blood donation platform that connects donors with people who need blood, supports role-based request management, and provides secure organization funding.

## Live URLs

- Frontend: Add the deployed client URL before submission
- API: https://blood-link-server-nine.vercel.app

## Key Features

- Email/password authentication with JWT-protected private APIs
- Donor registration with ImgBB avatar upload and Bangladesh location data
- Public donor search by blood group, district, and upazila
- Public pending requests with authenticated request details and donation response
- Donor dashboard for creating, filtering, editing, deleting, and updating requests
- Admin user management with block/unblock and role updates
- Admin and volunteer request management with role-specific permissions
- Stripe Checkout funding with role-based funding history
- Live daily, weekly, and monthly request charts
- Pagination, confirmation modals, toast feedback, responsive navigation, and dark mode

## Roles

- **Donor:** manages a profile and personal donation requests, searches donors, responds to pending requests, and views personal funding history.
- **Admin:** manages users, roles, all donation requests, funding records, and platform statistics.
- **Volunteer:** views all requests, updates request status, views all funding records, and sees platform statistics.

## Client Packages

- Next.js and React
- Tailwind CSS
- React Icons
- Recharts

## Server Packages

- Express
- MongoDB
- bcryptjs
- jsonwebtoken
- cors and dotenv
- Stripe

## Environment Variables

Create `client/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Create `server/.env` with the MongoDB URI, JWT secret, Stripe secret key, client URL, database name, and port. Never commit either environment file.

## Run Locally

Start the API:

```bash
cd server
npm install
npm run dev
```

Start the client:

```bash
cd client
npm install
npm run dev
```

Open http://localhost:3000. The local API runs at http://localhost:5000.
