import type { Metadata } from "next";
import { StudentGrid } from "@/components/students/StudentGrid";
import { getPublishedStudents } from "@/lib/students";

export const metadata: Metadata = {
  title: "Our Batch — Academic Batch 2026–2028 | Centre for Budget Studies",
  description:
    "Explore profiles of all 26 scholars in Academic Batch 2026–2028, Centre for Budget Studies, CUSAT.",
};

export const revalidate = 60;

export default async function StudentsPage() {
  const students = await getPublishedStudents();

  return (
    <div className="space-y-0 selection:bg-[var(--site-accent)] selection:text-[#090d16]">
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="bg-[#070a10] pt-36 pb-20 border-b border-white/8 relative">
        <div className="container-site max-w-4xl">
          <span className="section-label mb-3">Academic Batch 2026–2028</span>
          <div className="gold-bar" />
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
            Our Batch
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">
            Meet the {students.length} scholars of the Centre for Budget Studies, CUSAT.
            Review academic specialisations, research areas, and verified CVs.
          </p>
        </div>
      </section>

      {/* ── DIRECTORY GRID ─────────────────────────────────── */}
      <section className="section-py bg-[#090d16]" aria-labelledby="batch-heading">
        <div className="container-site">
          <h2 id="batch-heading" className="sr-only">Student Directory</h2>
          <StudentGrid students={students} />
        </div>
      </section>
    </div>
  );
}
