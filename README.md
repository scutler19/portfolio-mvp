# ProjectTrack - SaaS MVP Portfolio Demo

A full-stack project tracking SaaS built with Next.js, Supabase, and Tailwind CSS. Designed as a live portfolio demo for freelance clients.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth + Postgres)

## Getting Started

### 1. Environment Variables

Copy `.env.example` to `.env.local` and add your Supabase credentials:

```bash
cp .env.example .env.local
```

Set:

- `NEXT_PUBLIC_SUPABASE_URL` - from Supabase Dashboard > Settings > API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - from Supabase Dashboard > Settings > API

### 2. Supabase Setup

Run the schema and seed demo data. See [supabase/README.md](supabase/README.md) for full instructions.

1. Create a Supabase project
2. Run `supabase/schema.sql` in the SQL Editor
3. Create demo user (`demo@example.com` / `demo1234`) in Authentication > Users
4. Run `supabase/seed-demo.sql` (replace `DEMO_USER_UUID` with the user's UUID)

### 3. Run the App

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
