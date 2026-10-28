# AGENTS.md — CBS Collective

## Project Overview

CBS Collective is an academic website for the Centre for Budget Studies (CBS), CUSAT.
It consists of a public-facing Next.js website and a secure admin dashboard backed by Supabase.

## Tech Stack

- Next.js 15 App Router + TypeScript
- Tailwind CSS (custom design tokens)
- Framer Motion (animations)
- Lucide React (icons)
- Supabase (PostgreSQL + Auth + Storage)

## Critical Rules

### Security
- NEVER trust client-side role checks for authorization
- Admin role MUST be verified server-side using `createServiceClient()` (service role key)
- The `SUPABASE_SERVICE_ROLE_KEY` must NEVER appear in browser-side code
- Admin role is stored in `app_metadata.role = 'admin'` — NEVER in `user_metadata`
- All mutating operations (create, update, delete, upload) use `createServiceClient()` in Server Actions

### Content
- Institutional facts (vision, mission, faculty, curriculum) live in `config/` files
- NEVER add fake/invented facts about CBS or CUSAT
- Student records are managed only through the Admin dashboard — no hardcoded student data

### Database
- Only ONE main table: `students`
- RLS is enabled — never disable it
- Public read: `published = true` rows only, public fields only
- All writes require `admin` role

### File Storage
- Photos → `student-photos` bucket (public read)
- CVs → `student-cvs` bucket (public read for published students)
- Always validate file type (image/jpeg|png|webp, application/pdf) and size (photos ≤5MB, CVs ≤10MB)
- Use `generateFilename()` from `lib/utils.ts` for all uploads (never trust client filenames)
- When a student is unpublished or deleted, their CV is removed from storage

## Directory Structure

```
app/                  # Next.js App Router pages
components/
  layout/             # Navbar, Footer
  institution/        # About section UI
  students/           # StudentCard, StudentGrid
  admin/              # AdminNav, StudentForm, StudentTable
config/               # Local institutional content (NO DB)
lib/
  actions.ts          # All server actions
  supabase/           # client.ts (browser), server.ts (server + service)
  utils.ts            # cn(), getStorageUrl(), generateFilename()
  validations.ts      # File and URL validation
  placeholder-students.ts  # 26 placeholders when DB not connected
types/
  student.ts          # Student, StudentWithUrls interfaces
supabase/
  migrations/         # SQL migrations
middleware.ts         # Route protection for /admin/*
```

## Common Patterns

### Fetching public students (server component)
```ts
const supabase = await createClient();
const { data } = await supabase
  .from('students')
  .select('*')
  .eq('published', true)
  .order('display_order');
```

### Admin mutation (server action)
```ts
'use server'
async function someAdminAction() {
  await requireAdmin(); // Always first
  const service = createServiceClient();
  // ... mutation using service client
}
```

### Getting a storage URL
```ts
import { getStorageUrl } from '@/lib/utils';
const url = getStorageUrl('student-photos', student.photo_path);
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
