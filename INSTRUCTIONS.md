# Dental Chic — Concept Platform

Monorepo for the Dental Chic concept pitch: a marketing site with a real booking
flow behind it, split into `frontend/` and `backend/` — same shape as your other
client projects.

```
dental-chic/
  frontend/     React + Vite + Tailwind — the public site
  backend/      Node.js + Express + PostgreSQL (Neon) — the booking API
```

## Quick start (local)

### 1. Database (Neon)
1. Create a free project at https://neon.tech
2. Copy the connection string it gives you
3. In `backend/.env` (copy from `.env.example`), set `DATABASE_URL` to that string
4. From `backend/`, run:
   ```
   npm install
   npm run migrate
   ```
   This creates the `services`, `appointments`, and `admin_users` tables and seeds
   the six services shown on the site.
5. Create your first admin login (used later for a reception dashboard):
   ```
   node src/seed-admin.js "you@example.com" "a-strong-password"
   ```

### 2. Backend
```
cd backend
npm install
npm run dev        # runs on http://localhost:4000 by default
```

### 3. Frontend
```
cd frontend
npm install
cp .env.example .env    # set VITE_API_URL to http://localhost:4000 for local dev
npm run dev
```

Open the frontend dev URL Vite prints — the booking form on the site now posts
real appointment requests to the backend and stores them in Postgres.

## What the backend does today
- `GET /api/health` — uptime check
- `GET /api/services` — public, powers the service dropdown
- `POST /api/appointments` — public, the booking form submits here
- `GET /api/appointments` — **admin only**, list all bookings (powers the admin dashboard/appointments screen)
- `PATCH /api/appointments/:id` — **admin only**, change a booking's status
- `POST /api/auth/login` — admin login, returns a token for the two routes above

There's deliberately no public signup route — admin accounts are created directly
via `seed-admin.js`, the same way you'd hand a receptionist their login.

## Admin portal
Visit `/admin/login` on the deployed (or local) frontend to sign in with the admin
account you created via `seed-admin.js`. This is the same React app, not a separate
deployment — same pattern as Mahogany's `/admin`.

Built so far:
- **`/admin/login`** — split-screen sign-in
- **`/admin`** — dashboard: today's appointments, pending requests, this week's
  total, total bookings, today's schedule, and a recent bookings table. All figures
  are computed live from real appointment data — there's no patient count or
  revenue card yet, since there's no patient/billing model in the database yet.
- **`/admin/appointments`** — full list with status filters (pending / confirmed /
  completed / cancelled) and inline status updates
- **`/admin/messages`** — inbox of contact form submissions with unread/read
  filters and mark read/unread (backed by `GET`/`PATCH /api/contact`, admin-only)

The session token is stored in the browser's localStorage and sent as a Bearer
token on admin API calls.

## Not built yet (next phase, per the original brief)
- Patients, Staff, Services CMS, Website Content CMS, Gallery Manager,
  Testimonials manager, Billing & Payments, Reports,
  Notifications, Settings — all part of the fuller admin spec but out of scope
  for this first pass
- Patient records, treatment plans, billing (needs its own database tables)
- Real Facebook reviews (still placeholder copy in `Reviews.jsx`)
- Real clinic/team photography
- Embedded Google Map on the Find Us section
- Patient Information and Gallery public pages (from the earlier page-structure brief)

## Deploy

**Frontend → Vercel** (same as Cedar Capital / Mahogany)
- Import `frontend/` as the project root in Vercel
- Framework preset "Vite" auto-detects
- Set the `VITE_API_URL` environment variable in Vercel to your deployed backend URL

**Backend → Render** (per your usual backend deployment target)
1. New Web Service, root directory `backend/`
2. Build command: `npm install`
3. Start command: `npm start`
4. Environment variables: copy everything from `backend/.env.example` — especially
   `DATABASE_URL` (Neon), `JWT_SECRET` (generate a real random string), and
   `CORS_ORIGIN` (set this to your deployed Vercel URL once you have it, so the
   API only accepts requests from your actual site)
