import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Plus,
  Palette,
  FileEdit,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { getSiteTheme } from "@/lib/cms";

export const metadata: Metadata = { title: "Admin Overview" };

async function getStats() {
  try {
    const service = createServiceClient();
    const { data } = await service.from("students").select("published");
    if (!data) return { total: 0, published: 0 };
    return {
      total: data.length,
      published: data.filter((s: { published: boolean }) => s.published).length,
    };
  } catch {
    return { total: 0, published: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const theme = await getSiteTheme();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#101828] via-[#142038] to-[#1c1220] border border-white/10 p-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--site-accent)]/15 text-[var(--site-accent)] border border-[var(--site-accent)]/30 mb-4">
            <Sparkles size={13} />
            <span>CBS Collective Admin Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Institutional Management & Visual CMS
          </h1>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            Welcome to the centralized administration console for the Centre for Budget Studies.
            Manage batch scholars, edit website content in real time, and customize the visual theme.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/admin/students/new" className="btn-primary text-xs py-2 px-4">
              <Plus size={14} /> Add New Scholar
            </Link>
            <Link href="/admin/content" className="btn-outline text-xs py-2 px-4">
              <FileEdit size={14} /> Open Visual CMS
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[var(--site-accent)]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-6 border-white/8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Total Cohort
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Users size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
          <p className="text-[11px] text-white/40 mt-1">Students enrolled in database</p>
        </div>

        <div className="glass-card p-6 border-white/8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Published Live
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <UserCheck size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-400">{stats.published}</div>
          <p className="text-[11px] text-white/40 mt-1">Profiles visible to public</p>
        </div>

        <div className="glass-card p-6 border-white/8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              CMS Sections
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Layers size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">10</div>
          <p className="text-[11px] text-white/40 mt-1">Live editable homepage blocks</p>
        </div>

        <div className="glass-card p-6 border-white/8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Active Theme
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Palette size={16} />
            </div>
          </div>
          <div className="text-lg font-bold text-[var(--site-accent)] capitalize truncate">
            {theme?.preset?.replace("-", " ") || "Cinematic Dark"}
          </div>
          <p className="text-[11px] text-white/40 mt-1">Managed via Appearance Studio</p>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/students"
          className="group glass-card p-6 hover:border-[var(--site-accent)]/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Users size={20} />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[var(--site-accent)] transition-colors">
              Student Directory
            </h3>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              Create, edit, and organize all 26 student profiles. Upload high-res photographs,
              attach PDF resumes, and toggle publish states.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[var(--site-accent)]">
            <span>Manage Profiles</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/content"
          className="group glass-card p-6 hover:border-[var(--site-accent)]/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FileEdit size={20} />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[var(--site-accent)] transition-colors">
              Visual CMS
            </h3>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              Edit the Hero banner, Vision & Mission, Curriculum, Faculty profiles, Milestones,
              and Announcements directly through a visual frontend editor.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[var(--site-accent)]">
            <span>Edit Page Content</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="group glass-card p-6 hover:border-[var(--site-accent)]/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Palette size={20} />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[var(--site-accent)] transition-colors">
              Appearance & Theme
            </h3>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              Switch between 5 cinematic presets (Cinematic Dark, Academic Navy, Ivory & Burgundy, etc.)
              or customize palette colors, fonts, and layout styles with live preview.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[var(--site-accent)]">
            <span>Customize Theme</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Security Info Card */}
      <div className="glass-card p-5 border-white/8 flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
          <Shield size={16} />
        </div>
        <div className="flex-1 text-xs">
          <span className="font-semibold text-white">Row Level Security Enforced</span>
          <p className="text-white/50 mt-0.5">
            Public visitors can only read published profiles and published CMS blocks. Mutating
            actions are cryptographically verified server-side via Supabase Service Role.
          </p>
        </div>
      </div>
    </div>
  );
}
