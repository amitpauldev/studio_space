# StudioSpace

A photography-studio booking platform frontend where guests can browse creative spaces, request time slots, and hosts can list and manage their studios.

Built with [Next.js](https://nextjs.org) (App Router), [Tailwind CSS v4](https://tailwindcss.com), [better-auth](https://www.better-auth.com) + MongoDB, and [shadcn-style](https://ui.shadcn.com) components.

## Features

- Email & password authentication (better-auth with JWT sessions)
- Browse studios by category and view studio details
- Book a studio slot (date, time, duration, guests)
- Host dashboard: add studios, manage listings, view profile, upcoming bookings & notifications
- My Bookings with status badges (pending, confirmed, completed, cancelled) and cancel option for pending slots

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root with:

```env
MONGODB_URI=<your-mongodb-connection-string>
BETTER_AUTH_SECRET=<random-secret>
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=<backend-api-url>
BASE_URL=http://localhost:3000
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server at localhost:3000 |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                  # Routes
│   ├── (auth)/           # login / register
│   ├── (main)/           # home, studios, studio details, about
│   ├── (dashboard)/      # dashboard, my-bookings, my-listings, add-new-studio
│   └── api/auth/         # better-auth catch-all handlers
├── components/
│   ├── ui/               # primitives (button, dialog, dropdown-menu, ...)
│   ├── shared/           # header, nav, footer, studio cards
│   ├── home/             # landing sections
│   ├── studio-details/   # details view, booking dialog, reviews
│   └── dashboard/        # listings, bookings, dashboard widgets
├── lib/                  # auth config, JWT helpers, server actions
└── type/                 # shared TypeScript types
```

## Deployment

The frontend deploys with any Node host; the backend/auth API requires a reachable MongoDB instance configured via the `.env` values above.
