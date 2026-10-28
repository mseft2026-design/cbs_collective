import { Target, Eye } from "lucide-react";
import { institution } from "@/config/institution";

export function VisionMission() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card p-8 border-l-4 border-l-[var(--gold-500)]">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-[var(--navy-800)] flex items-center justify-center">
            <Eye size={18} className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-[var(--navy-800)]">Vision</h3>
        </div>
        <p className="text-[var(--navy-600)] leading-relaxed italic">
          &ldquo;{institution.vision}&rdquo;
        </p>
      </div>

      <div className="card p-8 border-l-4 border-l-[var(--navy-600)]">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-[var(--gold-500)] flex items-center justify-center">
            <Target size={18} className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-[var(--navy-800)]">Mission</h3>
        </div>
        <p className="text-[var(--navy-600)] leading-relaxed italic">
          &ldquo;{institution.mission}&rdquo;
        </p>
      </div>
    </div>
  );
}
