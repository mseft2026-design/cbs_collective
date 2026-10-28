# CBS Collective

**Academic website for the Centre for Budget Studies (CBS), Cochin University of Science and Technology (CUSAT). Academic Batch 2026–2028.**

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd cbs_collective
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials.

### 3. Set up Supabase

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for the complete setup guide.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.tsx              # Homepage
  about/page.tsx        # About CBS section
  students/
    page.tsx            # Student directory
    [id]/page.tsx       # Individual student profile
  admin/
    login/page.tsx      # Admin login
    page.tsx            # Admin dashboard
    students/
      page.tsx          # Student management
      new/page.tsx      # Add student
      [id]/edit/page.tsx # Edit student

components/
  layout/               # Navbar, Footer
  institution/          # About section components
  students/             # Student card, grid
  admin/                # Admin UI components

config/
  institution.ts        # CBS institutional content (edit here)
  faculty.ts            # Faculty profiles (edit here)
  curriculum.ts         # Curriculum structure (edit here)

lib/
  actions.ts            # Server actions (CRUD, auth)
  supabase/             # Supabase clients
  utils.ts              # Utility functions
  validations.ts        # Form and file validation

types/
  student.ts            # Student TypeScript types

supabase/
  migrations/001_initial.sql  # Database schema + RLS
```

## Editing Institutional Content

All CBS-specific content is in `config/`. Edit these TypeScript files directly — no database needed:

- `config/institution.ts` — Introduction, vision, mission, achievements, research areas
- `config/faculty.ts` — Faculty profiles
- `config/curriculum.ts` — Programme details and course list

## Adding / Editing Students

Students are managed through the Admin dashboard at `/admin`. No code changes required.

## Admin Setup

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for admin provisioning instructions.

## Deployment

Deploy to [Vercel](https://vercel.com/) (recommended):

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
npm run build    # Verify production build locally
```
