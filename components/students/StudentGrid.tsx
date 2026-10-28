"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { StudentCard } from "./StudentCard";
import { StudentWithUrls } from "@/types/student";

interface StudentGridProps {
  students: StudentWithUrls[];
}

export function StudentGrid({ students }: StudentGridProps) {
  const [query, setQuery] = useState("");

  // Filter students by search query
  const filtered = useMemo(() => {
    if (!query.trim()) return students;
    const q = query.toLowerCase();
    return students.filter(
      (s) =>
        s.full_name.toLowerCase().includes(q) ||
        s.introduction?.toLowerCase().includes(q) ||
        s.interests?.some((i) => i.toLowerCase().includes(q))
    );
  }, [students, query]);

  return (
    <div className="space-y-6">
      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search by name or interest…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-site pl-10 pr-10 text-xs py-2.5"
            aria-label="Search students"
            id="student-search"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="text-xs text-white/50 flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[var(--site-accent)]" />
          <span>
            Showing {filtered.length} of {students.length} scholars
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {filtered.map((student, idx) => (
            <StudentCard key={student.id} student={student} index={idx} />
          ))}
        </div>
      ) : (
        <div className="glass-card text-center py-20 border-white/8">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-white/30 border border-white/8">
            <Search size={24} />
          </div>
          <h3 className="font-bold text-white text-base mb-1">No matching student profiles</h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto">
            Try adjusting your search terms.
          </p>
          <button
            onClick={() => setQuery("")}
            className="mt-5 btn-outline text-xs py-2 px-4"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
