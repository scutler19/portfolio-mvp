# Project Manager MVP

A simple SaaS-style MVP where a founder can manage client projects and clients can log in to view their own projects and notes.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Supabase** (Auth + Postgres DB)
- **Tailwind CSS**
- **Vercel** (deployment)

## Features

### Admin (Founder)
- View all clients and projects
- Create, update, and delete projects
- Assign projects to clients
- Add notes to projects
- Dashboard with statistics

### Client
- Log in to view assigned projects
- View project details and notes (read-only)
- See project status and due dates

### Authentication
- **Email/Password** authentication

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Run the SQL script from `supabase/schema.sql` to create all tables, policies, and triggers
4. Go to **Settings** → **API** to get your project URL and anon key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Admin User

After creating your first user account:

1. Go to **Table Editor** → **profiles** in Supabase
2. Find your user's profile row
3. Update the `role` field from `'client'` to `'admin'`

Alternatively, you can run this SQL in the Supabase SQL Editor:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Deploy!

## Project Structure

```
├── app/
│   ├── admin/              # Admin pages
│   │   ├── page.tsx        # Dashboard
│   │   └── projects/       # Project management
│   ├── app/                # Client pages
│   │   ├── projects/       # Client project views
│   │   └── settings/       # Account settings
│   ├── auth/
│   │   └── callback/       # OAuth callback handler
│   ├── login/              # Auth page
│   └── page.tsx            # Landing page
├── components/             # Reusable components
├── lib/
│   ├── auth.ts             # Auth utilities
│   └── supabase/           # Supabase clients
├── supabase/
│   └── schema.sql          # Database schema
└── types/
    └── database.ts         # TypeScript types
```

## Database Schema

### Tables

- **profiles**: User profiles with roles (admin/client)
- **projects**: Client projects with status, dates, and descriptions
- **project_notes**: Notes added to projects by admins
- **linked_accounts**: Tracks OAuth providers linked to user accounts

### Row Level Security (RLS)

- Admins can see and manage all projects
- Clients can only see their own assigned projects
- All policies are defined in `supabase/schema.sql`

## Routes

- `/` - Landing page (redirects based on role)
- `/login` - Sign in / Sign up with email
- `/auth/callback` - OAuth callback handler
- `/admin` - Admin dashboard
- `/admin/projects` - All projects list
- `/admin/projects/new` - Create new project
- `/admin/projects/[id]` - Edit project and manage notes
- `/app/projects` - Client's project list
- `/app/projects/[id]` - Client's project detail (read-only)
- `/app/settings` - Account settings

## Notes

- New users are automatically assigned the `'client'` role
- Admins must be manually set in the database
- Email verification is disabled for MVP (can be enabled in Supabase settings)
- The app uses server-side authorization checks for security
