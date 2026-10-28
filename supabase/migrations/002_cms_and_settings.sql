-- CBS Collective — Migration 002: Visual CMS & Theme Settings
-- Run this in the Supabase SQL Editor

-- ============================================================
-- 1. SITE CONTENT TABLE
-- Stores page sections, text blocks, and structured CMS data
-- ============================================================
create table if not exists public.site_content (
  id              text primary key, -- e.g. 'hero', 'about', 'vision_mission', 'programme', 'curriculum', 'research', 'faculty', 'announcements', 'footer'
  section_key     text not null,
  content         jsonb not null default '{}'::jsonb,
  status          text not null default 'published' check (status in ('draft', 'published')),
  updated_at      timestamptz not null default now(),
  updated_by      text
);

create index if not exists idx_site_content_section on public.site_content (section_key);
create index if not exists idx_site_content_status on public.site_content (status);

-- Auto-update updated_at trigger
drop trigger if exists on_site_content_updated on public.site_content;
create trigger on_site_content_updated
  before update on public.site_content
  for each row execute function public.handle_updated_at();

-- Enable RLS
alter table public.site_content enable row level security;

-- Public read access: published records only
create policy "Public can read published site content"
  on public.site_content
  for select
  using (status = 'published');

-- Admin write access
create policy "Admins have full access to site content"
  on public.site_content
  for all
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
  )
  with check (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
  );

-- ============================================================
-- 2. SITE SETTINGS TABLE
-- Stores theme tokens, appearance, section order, visibility
-- ============================================================
create table if not exists public.site_settings (
  key             text primary key, -- 'theme', 'navigation', 'sections_config'
  value           jsonb not null default '{}'::jsonb,
  status          text not null default 'published' check (status in ('draft', 'published')),
  updated_at      timestamptz not null default now(),
  updated_by      text
);

-- Auto-update updated_at trigger
drop trigger if exists on_site_settings_updated on public.site_settings;
create trigger on_site_settings_updated
  before update on public.site_settings
  for each row execute function public.handle_updated_at();

-- Enable RLS
alter table public.site_settings enable row level security;

-- Public read access: published settings only
create policy "Public can read published site settings"
  on public.site_settings
  for select
  using (status = 'published');

-- Admin write access
create policy "Admins have full access to site settings"
  on public.site_settings
  for all
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
  )
  with check (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
  );
