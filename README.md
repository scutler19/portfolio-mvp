# ProjectTrack

A live SaaS-style portfolio demo: project and task management with authentication, dashboard UI, and full CRUD. Built to showcase modern full-stack delivery—Next.js, TypeScript, Tailwind, Supabase—deployed and runnable locally.

---

## What This Is

This repo is a **showroom project**. It demonstrates the ability to ship a complete, production-style MVP: auth, protected routes, dashboard, projects/tasks CRUD, demo mode with seeded data, and a polished UI. It is not a generic template; it reflects real product structure and developer workflow.

**Why it exists:** To give potential clients and employers a concrete, deployable example of SaaS-style work—something they can run, explore, and evaluate.

---

## Live Demo

<!-- Add your live demo URL when deployed (e.g. Vercel). -->
**Live demo:** _[Add link when deployed]_

---

## Demo Account

<!-- If you deploy with seeded demo data, document the demo login here. -->
- **Demo login:** Use **Demo Login** on the sign-in page to explore without creating an account.
- **Credentials** (if you prefer to sign in manually): `demo@example.com` / `demo1234` — only available if the demo user and seed data are set up (see [Demo data](#demo-data) below).

---

## Screenshots

<!-- Add 1–3 screenshots (e.g. dashboard, projects list, task detail) to show layout and UI. -->
_Screenshots coming soon._

---

## Features

- **Authentication** — Sign up, sign in, protected routes; session handled via Supabase Auth.
- **Dashboard** — Overview with project/task counts, recent tasks, and recent projects.
- **Projects** — List, create, edit, delete; status: Planning, Active, On Hold, Completed.
- **Tasks** — List, create, edit, delete; linked to projects; status: To Do, In Progress, Completed; optional due date.
- **Demo mode** — One-click Demo Login and optional seeded demo data for instant exploration.
- **UI** — Responsive layout, theme (light/dark), palette switcher, consistent design system.

---

## Tech Stack

| Layer        | Technology |
|-------------|------------|
| Framework   | Next.js 16 (App Router) |
| UI          | React 19, TypeScript, Tailwind CSS 4 |
| Backend     | Supabase (Postgres, Auth) |
| Hosting     | Vercel (recommended) |

---

## Project Structure

```
├── app/
│   ├── (dashboard)/          # Protected app: dashboard, projects, tasks
│   │   ├── dashboard/
│   │   ├── projects/         # List, new, [id], [id]/edit
│   │   └── tasks/            # List, new, [id], [id]/edit
│   ├── login/                # Sign in + Demo Login
│   ├── signup/
│   ├── layout.tsx
│   └── page.tsx              # Landing
├── components/
│   ├── dashboard/            # Sidebar, header, demo banner, palette switcher
│   ├── providers/            # Theme, dashboard, toast
│   └── ui/                   # Status badge, confirm dialog, skeleton
├── lib/
│   ├── supabase/             # Client, server, middleware (session)
│   ├── types/                # Project, Task types
│   └── utils.ts
├── supabase/
│   ├── schema.sql            # Tables + RLS
│   └── seed-demo.sql        # Demo projects/tasks (replace demo user UUID)
└── middleware.ts             # Protects /dashboard, /projects, /tasks
```

---

## Local Development

### Prerequisites

- Node.js 18+
- A Supabase project ([supabase.com](https://supabase.com))

### 1. Clone and install

```bash
git clone <your-repo-url>
cd portfolio-mvp
npm install
```

### 2. Environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get both values from Supabase: **Project Settings → API**.

### 3. Supabase setup

1. In the [Supabase Dashboard](https://supabase.com/dashboard), open **SQL Editor**.
2. Run the contents of `supabase/schema.sql`. This creates `projects` and `tasks` plus RLS so users only see their own data.
3. (Optional) Create a demo user under **Authentication → Users** (e.g. `demo@example.com` / `demo1234`), copy its UUID, then run `supabase/seed-demo.sql` in the SQL Editor after replacing the placeholder UUID in that file with your demo user’s UUID.

Detailed steps are in [supabase/README.md](supabase/README.md).

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Sign in** / **Sign up**, or **Demo Login** if the demo user and seed data are configured.

---

## Demo Data

- **Purpose:** Let visitors try the app with realistic projects and tasks.
- **How:** Run `supabase/seed-demo.sql` after creating the demo user and replacing the UUID in the script. This inserts several projects and ~14 tasks.
- **Demo Login:** The app’s sign-in page has a **Demo Login** button that signs in with the seeded demo user so visitors don’t need to create an account.

---

## Deployment (Vercel)

1. Push the repo to GitHub and import the project in [Vercel](https://vercel.com).
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in **Settings → Environment Variables**.
3. Deploy. The app uses the same Supabase project; ensure the demo user and seed data exist there if you want Demo Login on the live site.

---

## Portfolio / Demo Notes

- This is a **portfolio piece**, not a long-term product. The codebase is kept clear and minimal on purpose.
- RLS and auth are real; data is scoped per user. Demo Login is for convenience only.
- No billing, teams, or real production hardening—by design, to keep the repo evaluable and maintainable.

---

## Possible Future Enhancements

- Screenshots and a short video in the README.
- Optional: due-date reminders, filters on tasks/projects, or simple search.
- Optional: Markdown or rich text for task/project descriptions.

---

## License

Private / portfolio use. See repo for terms.
