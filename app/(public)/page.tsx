import type { Metadata } from "next";
import { Megaphone, ArrowRight } from "lucide-react";
import { getAllCmsContent } from "@/lib/cms";
import { getPublishedStudents } from "@/lib/students";
import { getPageSectionsConfig } from "@/lib/actions";
import { SectionRenderer } from "@/components/builder/SectionRenderer";
import { NetflixSectionRail } from "@/components/navigation/NetflixSectionRail";

export const metadata: Metadata = {
  title: "CBS Collective — Academic Batch 2026–2028 | Centre for Budget Studies",
  description:
    "Official website of the Centre for Budget Studies, Cochin University of Science and Technology (CUSAT). Representing Academic Batch 2026–2028.",
};

export const revalidate = 60;

export default async function HomePage() {
  const [cms, students, sectionsConfig] = await Promise.all([
    getAllCmsContent(),
    getPublishedStudents(),
    getPageSectionsConfig(false), // Published config only
  ]);

  const { announcements } = cms;

  // Get visible sections sorted by order
  const visibleSections = (sectionsConfig?.sections || [])
    .filter((s: any) => !s.isHidden && !s.isDeleted)
    .sort((a: any, b: any) => a.order - b.order);

  return (
    <div className="space-y-0 selection:bg-[var(--site-accent)] selection:text-[#070a13]">
      {/* ── ANNOUNCEMENT NOTICE BAR ───────────────────────────── */}
      {announcements?.enabled && (
        <aside
          aria-label="Announcement"
          className="bg-[#121624] border-b border-white/10 text-white text-xs py-2.5 px-4 text-center sticky top-0 z-40 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 font-bold text-[#d4af37] uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30">
              <Megaphone size={11} /> {announcements.badge || "Announcement"}
            </span>
            <span className="text-white/90">{announcements.message}</span>
            {announcements.linkText && announcements.linkUrl && (
              <a
                href={announcements.linkUrl}
                className="font-semibold text-[#d4af37] hover:underline inline-flex items-center gap-1 ml-1"
              >
                <span>{announcements.linkText}</span>
                <ArrowRight size={11} />
              </a>
            )}
          </div>
        </aside>
      )}

      {/* ── NETFLIX-STYLE STICKY SECTION RAIL ──────────────────── */}
      <NetflixSectionRail />

      {/* ── DYNAMIC SECTIONS FROM BUILDER CONFIG ───────────────── */}
      {visibleSections.map((section: any) => (
        <SectionRenderer
          key={section.id}
          section={section}
          students={students}
          cmsFallback={cms}
        />
      ))}
    </div>
  );
}
