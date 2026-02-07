## Whodini Frontend (Web)

Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + TanStack Query.

This repo currently runs with **dummy/local data** (saved in `localStorage`). No backend is required yet.

## Getting Started

### Requirements

- **Node.js**: 20+ (recommended)
- **npm**: 10+ (recommended)

### Install

```bash
cd "/Users/russel/Desktop/Delta/whodini-fe"
npm install
```

### Run (development)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build (production)

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Dummy data (localStorage)

The app seeds initial data and saves changes in `localStorage`:

- Session key: `whodini_dummy_session_v1`
- DB key: `whodini_dummy_db_v1`

To reset everything: open DevTools → Application → Local Storage and delete those keys (or clear site data).

## Useful routes

- `/` (Landing)
- `/brands` (Browse brands)
- `/events` (Browse events)
- `/subscribe/WD-B-ACME` (Example brand subscribe page)
- `/join/WD-C-RUNCLUB` (Example community join page)
- `/dashboard` (Personal dashboard)
- `/business` (Business dashboard)
- `/community` (Community dashboard)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - feedback and contributions are welcome.
