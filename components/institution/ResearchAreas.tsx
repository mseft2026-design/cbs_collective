import { institution } from "@/config/institution";
import { TrendingUp } from "lucide-react";

const iconColors = [
  { bg: "var(--navy-800)", text: "white" },
  { bg: "var(--gold-500)", text: "var(--navy-950)" },
  { bg: "var(--navy-600)", text: "white" },
  { bg: "var(--gold-400)", text: "var(--navy-950)" },
  { bg: "var(--navy-700)", text: "white" },
  { bg: "var(--gold-300)", text: "var(--navy-800)" },
];

export function ResearchAreas() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {institution.researchAreas.map((area, i) => {
        const colors = iconColors[i % iconColors.length];
        return (
          <div key={i} className="card p-6 group">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
              style={{ background: colors.bg }}
            >
              <TrendingUp size={18} style={{ color: colors.text }} />
            </div>
            <h4 className="font-semibold text-[var(--navy-800)] mb-2 text-sm">{area.title}</h4>
            <p className="text-xs text-[var(--navy-500)] leading-relaxed">{area.description}</p>
          </div>
        );
      })}
    </div>
  );
}
