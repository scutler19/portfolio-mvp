# Supabase Setup

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a project
2. Copy your project URL and anon key from **Settings > API**

## 2. Environment Variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Run the Schema

In Supabase Dashboard > **SQL Editor**, run the contents of `schema.sql`:

```sql
-- Copy and run supabase/schema.sql
```

This creates:
- `projects` table (user_id, name, description, status)
- `tasks` table (user_id, project_id, title, description, status, due_date)
- Row Level Security (RLS) policies so users only see their own data

## 4. Seed Demo Data

1. **Create the demo user** in Authentication > Users > Add user:
   - Email: `demo@example.com`
   - Password: `demo1234` (or your choice)

2. **Copy the demo user's UUID** from the Users list

3. In **SQL Editor**, open `seed-demo.sql` and replace every `DEMO_USER_UUID` with that UUID

4. Run the script

This seeds:
- 5 sample projects (various statuses)
- ~14 tasks across those projects

## 5. Demo Login

After seeding, visitors can click **Demo Login** on the sign-in page to explore the app with pre-populated data.
