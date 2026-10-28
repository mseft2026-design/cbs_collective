import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  Compass,
  Trophy,
  GraduationCap,
  BookOpenCheck,
  Microscope,
  Users,
  Megaphone,
  Footprints,
  ArrowRight,
  CheckCircle2,
  Palette,
  FileEdit,
} from "lucide-react";
import { CMS_SECTIONS, getAllCmsContent } from "@/lib/cms";
import { SectionKey } from "@/types/cms";

export const metadata: Metadata = { title: "Visual CMS — Content Studio" };

const iconMap: Record<string, any> = {
  Sparkles,
  Building2,
  Compass,
  Trophy,
  GraduationCap,
  BookOpenCheck,
  Microscope,
  Users,
  Megaphone,
  Footprints,
};

export default async function AdminContentPage() {
  const content = await getAllCmsContent(true);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Visual CMS Studio</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--site-accent)]/15 text-[var(--site-accent)] border border-[var(--site-accent)]/30">
              10 Sections
            </span>
          </div>
          <p className="text-sm text-white/50 mt-1">
            Customize the editorial content, banners, curriculum, faculty, and milestones displayed across the website.
          </p>
        </div>

        <Link href="/admin/settings" className="btn-outline text-xs py-2 px-4 self-start sm:self-auto">
          <Palette size={14} />
          <span>Appearance & Theme</span>
        </Link>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CMS_SECTIONS.map((section) => {
          const Icon = iconMap[section.iconName] || FileEdit;
          const sectionData = content[section.key as SectionKey];

          return (
            <Link
              key={section.key}
              href={`/admin/content/${section.key}`}
              className="group glass-card p-6 flex flex-col justify-between hover:border-[var(--site-accent)]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-[var(--site-accent)] flex items-center justify-center group-hover:scale-105 transition-transform border border-white/8">
                    <Icon size={20} />
                  </div>
                  <span className="badge-published text-[11px]">
                    <CheckCircle2 size={11} /> Live
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[var(--site-accent)] transition-colors">
                  {section.name}
                </h3>
                <p className="text-xs text-white/50 mt-1.5 leading-relaxed">
                  {section.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-white/40">Customizable</span>
                <span className="font-semibold text-[var(--site-accent)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Edit Content <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
