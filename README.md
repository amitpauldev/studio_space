# StudioSpace

**Discover, book, and manage creative spaces.**

StudioSpace is a photography and creative-studio booking platform designed for photographers, filmmakers, podcasters, musicians, and other creative professionals.

Guests can explore creative spaces, view studio details, and request bookings. Hosts can list their studios, manage bookings, and monitor their listings through a dedicated dashboard.

🔗 **Live Website:** https://studiospaces.vercel.app/

---

## Features

- **Authentication:** Secure email and password authentication using Better Auth.
- **Interactive Hero Slider:** Responsive homepage banner with multiple slides powered by Swiper.js.
- **Explore Studios:** Browse creative spaces by category and discover available studios.
- **Studio Booking:** Request studio bookings by selecting a date, time, duration, and number of guests.
- **Host Dashboard:** Update name and photo, add new studios, manage existing listings.
- **My Bookings:** View booking history and track booking statuses.
- **Booking Management:** Manage pending, confirmed, completed, and cancelled bookings.
- **Booking Cancellation:** Cancel eligible pending booking requests.
- **Responsive Design:** Enjoy a seamless experience across desktop, tablet, and mobile devices.
- **Modern UI:** Clean and intuitive interface built with reusable components.

---

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) – React framework with App Router
- [React](https://react.dev/) – UI development
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) – Styling
- [shadcn/ui](https://ui.shadcn.com/) – Reusable UI components

### Authentication & Database

- [Better Auth](https://www.better-auth.com/) – Authentication and session management
- [MongoDB](https://www.mongodb.com/) – Database

### Development & Deployment

- Git & GitHub
- Vercel
- Node.js
- npm

---

## Getting Started

Follow these instructions to run StudioSpace locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS recommended)
- npm
- Git
- MongoDB database (local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/amitpauldev/studio_space
```

Navigate to the project directory:

```bash
cd studio_space
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=<your-mongodb-connection-string>

BETTER_AUTH_SECRET=<your-random-secret>

BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_BACKEND_URL=<your-backend-api-url>

BASE_URL=http://localhost:3000
```

Replace the placeholder values with your actual configuration.

**Note:** Never commit your `.env` file or expose your authentication secrets.

### 4. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

[http://localhost:3000](http://localhost:3000)

---

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint                           |

---

## Project Structure

```text
src/
├── app/
│   ├── (auth)/              # Login and registration
│   ├── (main)/              # Homepage and studio pages
│   ├── (dashboard)/         # Dashboard and booking management
│   └── api/
│       └── auth/            # Better Auth API handlers
│
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── shared/              # Header, footer, studio cards
│   ├── home/                # Homepage sections
│   ├── studio-details/      # Studio details and booking UI
│   └── dashboard/           # Dashboard components
│
├── lib/                      # Utilities and authentication config
├── type/                     # Shared TypeScript types
│
└── ...
```

---

## Deployment

The frontend is deployed on Vercel.

**Live Website:** https://studiospaces.vercel.app/

Ensure the required environment variables are configured in your deployment platform.

If the application uses a separate backend API, make sure the backend is deployed and accessible, and that `NEXT_PUBLIC_BACKEND_URL` points to the correct API endpoint.

---

## Project Purpose

StudioSpace aims to simplify the process of discovering and booking creative spaces while providing studio owners with an efficient platform to manage their listings and booking requests.

---

---

## Developer

**Amit Paul**  
Full Stack Developer | Next.js & React

- **GitHub:** [amitpauldev](https://github.com/amitpauldev)
- **LinkedIn:** [Amit Paul](https://www.linkedin.com/in/amitpauldev/)
- **Email:** amitpaul.per@gmail.com

---

## Acknowledgements

**Developed as a web development project** to demonstrate modern frontend development, authentication, and booking management workflows.
