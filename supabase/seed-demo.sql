-- Demo Data Seeding Instructions
-- ==============================
--
-- STEP 1: Create the demo user in Supabase
-- Go to Authentication > Users > Add user
-- Email: demo@example.com
-- Password: demo1234 (or your choice)
-- Copy the user's UUID after creation.
--
-- STEP 2: Replace cc83d8eb-f832-4410-b28d-8cfa8ea2c084 below with that UUID, then run in SQL Editor.

-- Option A: If you know the demo user UUID, set it here:
-- \set demo_user_id 'your-uuid-here'

-- Run as a single transaction. Replace the UUID in the first line.
insert into public.projects (id, user_id, name, description, status) values
  (gen_random_uuid(), 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', 'Website Redesign', 'Modernize the company website with new branding and responsive design.', 'active'),
  (gen_random_uuid(), 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', 'Mobile App MVP', 'Build initial version of the mobile application for iOS and Android.', 'planning'),
  (gen_random_uuid(), 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', 'API Integration', 'Integrate third-party payment and analytics APIs.', 'active'),
  (gen_random_uuid(), 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', 'Q4 Marketing Campaign', 'Launch holiday marketing initiative across social channels.', 'on_hold'),
  (gen_random_uuid(), 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', 'Documentation Overhaul', 'Update and migrate technical documentation to new platform.', 'completed');

-- Insert tasks (using subqueries to get project IDs)
insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Create wireframes', 'Design wireframes for homepage', 'completed', current_date - 7
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Website Redesign' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Implement header component', 'Build responsive header', 'in_progress', current_date + 2
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Website Redesign' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Style contact form', 'Apply design system to form', 'todo', current_date + 5
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Website Redesign' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Cross-browser testing', 'Test on major browsers', 'todo', current_date + 10
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Website Redesign' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Set up React Native project', 'Initialize project structure', 'todo', current_date + 14
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Mobile App MVP' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Define API contract', 'Document endpoints for mobile', 'todo', current_date + 7
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Mobile App MVP' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Stripe payment integration', 'Implement checkout flow', 'in_progress', current_date + 3
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'API Integration' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Analytics dashboard setup', 'Configure event tracking', 'completed', current_date - 2
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'API Integration' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Webhook handlers', 'Handle payment webhooks', 'todo', current_date + 5
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'API Integration' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Design ad creatives', 'Create social media assets', 'completed', current_date - 14
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Q4 Marketing Campaign' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Campaign scheduling', 'Schedule posts', 'todo', null
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Q4 Marketing Campaign' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Audit existing docs', 'Review current documentation', 'completed', current_date - 21
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Documentation Overhaul' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Migrate to new platform', 'Transfer content', 'completed', current_date - 7
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Documentation Overhaul' limit 1;

insert into public.tasks (user_id, project_id, title, description, status, due_date)
select 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084', id, 'Add code examples', 'Include snippets in API docs', 'completed', current_date - 3
from public.projects where user_id = 'cc83d8eb-f832-4410-b28d-8cfa8ea2c084' and name = 'Documentation Overhaul' limit 1;
