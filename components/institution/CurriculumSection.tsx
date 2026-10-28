import { curriculum } from "@/config/curriculum";
import { BookOpen } from "lucide-react";

export function CurriculumSection() {
  return (
    <div className="space-y-8">
      {/* Programme meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Programme", value: curriculum.programName },
          { label: "Duration", value: curriculum.duration },
          { label: "Intake", value: curriculum.intake },
          { label: "Eligibility", value: curriculum.eligibility },
        ].map((item, i) => (
          <div key={i} className="bg-[var(--ivory-100)] rounded-lg p-4 border border-[var(--ivory-200)]">
            <p className="text-xs font-semibold text-[var(--navy-500)] uppercase tracking-wide mb-1">
              {item.label}
            </p>
            <p className="text-sm font-medium text-[var(--navy-800)]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Semesters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {curriculum.semesters.map((sem) => (
          <div key={sem.number} className="card overflow-hidden">
            <div className="bg-[var(--navy-800)] px-5 py-3 flex items-center gap-2">
              <BookOpen size={15} className="text-[var(--gold-400)]" />
              <h4 className="text-sm font-semibold text-white">{sem.title}</h4>
            </div>
            <div className="divide-y divide-[var(--ivory-200)]">
              {sem.courses.map((course, ci) => (
                <div key={ci} className="px-5 py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-[var(--navy-400)] mr-2">
                      {course.code}
                    </span>
                    <span className="text-sm text-[var(--navy-700)]">{course.title}</span>
                  </div>
                  <span className="text-xs font-semibold text-[var(--navy-500)] shrink-0">
                    {course.credits} cr
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
