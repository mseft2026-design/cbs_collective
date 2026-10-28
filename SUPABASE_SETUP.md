# Supabase Setup Guide — CBS Collective

Complete guide to setting up the Supabase backend for CBS Collective.

---

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New Project**.
3. Choose your organisation, give it a name (e.g. `cbs-collective`), and set a secure database password.
4. Select a region (choose the closest to India, e.g. **Singapore** or **Mumbai**).
5. Click **Create Project** and wait for it to provision.

---

## Step 2: Set Environment Variables

1. In your Supabase project, go to **Settings → API**.
2. Copy the **Project URL** and **anon/public key**.
3. In your project directory, create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

> ⚠️ The **Service Role Key** is secret. Never expose it to the browser. Keep it in `.env.local` only and never commit it to Git.

---

## Step 3: Apply the Database Migration

1. In your Supabase project, go to **SQL Editor**.
2. Click **New Query**.
3. Open `supabase/migrations/001_initial.sql` from your project.
4. Copy the entire contents and paste into the SQL Editor.
5. Click **Run**.

This creates the `students` table with all required columns and Row Level Security policies.

### Step 3B: Apply the CMS & Theme Settings Migration

1. In your Supabase project, open the **SQL Editor** again.
2. Click **New Query**.
3. Open `supabase/migrations/002_cms_and_settings.sql` from your project.
4. Copy the entire contents and paste into the SQL Editor.
5. Click **Run**.

This creates the `site_content` and `site_settings` tables with strict Row Level Security policies, allowing the Visual CMS and Appearance Studio to persist changes directly to Supabase.

---

## Step 4: Create Storage Buckets

### student-photos bucket

1. Go to **Storage** in the Supabase dashboard.
2. Click **New Bucket**.
3. Name: `student-photos`
4. Check **Public bucket** (photos are publicly viewable).
5. Click **Create bucket**.

### student-cvs bucket

1. Click **New Bucket** again.
2. Name: `student-cvs`
3. Check **Public bucket** (CVs are publicly downloadable for published students).
4. Click **Create bucket**.

### Storage Security Policies

For each bucket, go to **Storage → Policies** and add:

**For `student-photos`:**

| Policy | Setting |
|--------|---------|
| SELECT (read) | Allow for everyone: `true` |
| INSERT | Allow if `(auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'` |
| UPDATE | Allow if `(auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'` |
| DELETE | Allow if `(auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'` |

**For `student-cvs`:** Same policies as above.

Or run the commented SQL at the bottom of `supabase/migrations/001_initial.sql` for each bucket.

---

## Step 5: Create the First Administrator

Administrator accounts are created and granted the `admin` role using the **Supabase service role key** — this cannot be done through the regular sign-up flow.

### Option A: Supabase Dashboard (Recommended)

1. Go to **Authentication → Users** in the Supabase dashboard.
2. Click **Add User → Create New User**.
3. Enter the administrator's email and a secure password.
4. After creating the user, click on the user to open their profile.
5. In the **User Metadata** section, add to **App Metadata** (not User Metadata):
   ```json
   { "role": "admin" }
   ```
6. Save.

> ⚠️ **Important**: Set the role in **App Metadata** — not User Metadata. App Metadata can only be set by the service role key (server-side). User Metadata can be edited by the user themselves and must never be trusted for permissions.

### Option B: SQL Editor

```sql
-- Replace with the actual user ID from Auth → Users
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
where email = 'admin@yourorganisation.com';
```

---

## Step 6: Grant Admin Access to Additional Administrators

Repeat Step 5 for each additional administrator.

To revoke admin access:

**Dashboard**: Remove or change `role` in App Metadata.

**SQL**:
```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data - 'role'
where email = 'user@example.com';
```

---

## Step 7: Run Locally

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

Log in with the administrator email and password you created in Step 5.

---

## Step 8: Deploy to Production (Vercel)

1. Push your project to GitHub (ensure `.env.local` is in `.gitignore`).
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy.

---

## Security Checklist

- [x] Row Level Security enabled on `students` table
- [x] Public can only read `published = true` records
- [x] Admin role verified server-side using service role key
- [x] Admin role set only in `app_metadata` (not user-editable)
- [x] `SUPABASE_SERVICE_ROLE_KEY` is server-side only
- [x] All file uploads validated for type and size
- [x] `.env.local` is in `.gitignore`
- [x] Storage buckets restrict writes to admin role

---

## CV Privacy Notice

CVs uploaded for published students are publicly accessible via direct URL. Before publishing a student's profile or CV, ensure the student has given explicit consent for their CV to be publicly downloadable and redistributable.

When a student is unpublished or deleted, their CV file is removed from public storage automatically.
