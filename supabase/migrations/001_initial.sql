-- CBS Collective — Supabase Initial Migration
-- Run this in the Supabase SQL Editor or via the Supabase CLI

-- ============================================================
-- STUDENTS TABLE
-- ============================================================
create table if not exists public.students (
  id              uuid primary key default gen_random_uuid(),
  full_name       text not null,
  photo_path      text,
  interests       text[],
  introduction    text,
  linkedin_url    text,
  cv_path         text,
  published       boolean not null default false,
  display_order   integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Indexes
create index if not exists idx_students_published on public.students (published);
create index if not exists idx_students_display_order on public.students (display_order);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_students_updated on public.students;
create trigger on_students_updated
  before update on public.students
  for each row execute function public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.students enable row level security;

-- Anonymous / logged-in non-admin users: read only published records
create policy "Public can read published students"
  on public.students
  for select
  using (published = true);

-- Admins: full access (role set in app_metadata by service role only)
create policy "Admins have full access"
  on public.students
  for all
  using (
    coalesce(
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
      false
    )
  )
  with check (
    coalesce(
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
      false
    )
  );

-- ============================================================
-- STORAGE BUCKETS
-- (Run AFTER creating buckets in Supabase dashboard or via CLI)
-- ============================================================

-- student-photos bucket: public read
-- student-cvs bucket: public read for published student CVs

-- Storage policies for student-photos
-- Note: Run these after creating the bucket named 'student-photos'
/*
create policy "Public read student photos"
  on storage.objects for select
  using (bucket_id = 'student-photos');

create policy "Admin upload student photos"
  on storage.objects for insert
  with check (
    bucket_id = 'student-photos'
    and coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
  );

create policy "Admin update student photos"
  on storage.objects for update
  using (
    bucket_id = 'student-photos'
    and coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
  );

create policy "Admin delete student photos"
  on storage.objects for delete
  using (
    bucket_id = 'student-photos'
    and coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
  );
*/

-- Storage policies for student-cvs
/*
create policy "Public read student CVs"
  on storage.objects for select
  using (bucket_id = 'student-cvs');

create policy "Admin upload student CVs"
  on storage.objects for insert
  with check (
    bucket_id = 'student-cvs'
    and coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
  );

create policy "Admin update student CVs"
  on storage.objects for update
  using (
    bucket_id = 'student-cvs'
    and coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
  );

create policy "Admin delete student CVs"
  on storage.objects for delete
  using (
    bucket_id = 'student-cvs'
    and coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
  );
*/
