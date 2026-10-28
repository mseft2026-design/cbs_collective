"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, Layers, Minus, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RailItem {
  id: string;
  label: string;
  shortLabel?: string;
  badge: string;
}

// Map from section type → anchor id (must match SECTION_ANCHOR_MAP in SectionRenderer)
const TYPE_TO_ANCHOR: Record<string, string> = {
  hero: "hero",
  stats: "stats",
  about: "about-centre",
  cusat: "cusat",
  vision_mission: "vision-mission",
  curriculum: "curriculum",
  programme: "programme",
  faculty: "faculty",
  students: "our-batch",
  milestones: "milestones",
  research: "research",
};

// Map from section type → human-readable rail label
const TYPE_TO_LABEL: Record<string, { label: string; shortLabel: string }> = {
  hero:           { label: "Executive Briefing",   shortLabel: "Overview"   },
  stats:          { label: "Key Statistics",        shortLabel: "Stats"      },
  about:          { label: "About the Centre",      shortLabel: "About"      },
  cusat:          { label: "About CUSAT",           shortLabel: "CUSAT"      },
  vision_mission: { label: "Vision & Mission",      shortLabel: "Vision"     },
  curriculum:     { label: "Curriculum",            shortLabel: "Curriculum" },
  programme:      { label: "M.Sc. Programme",       shortLabel: "Programme"  },
  faculty:        { label: "Faculty & Leadership",  shortLabel: "Faculty"    },
  students:       { label: "2026–2028 Scholars",    shortLabel: "Scholars"   },
  milestones:     { label: "Milestones",            shortLabel: "Milestones" },
  research:       { label: "Research",             shortLabel: "Research"   },
};

export interface RailSection {
  id: string;
  type: string;
  order: number;
}

interface NetflixSectionRailProps {
  sections: RailSection[];
}

export function NetflixSectionRail({ sections }: NetflixSectionRailProps) {
  // Build rail items from live sections config, preserving order
  const RAIL_SECTIONS: RailItem[] = sections
    .sort((a, b) => a.order - b.order)
    .map((sec, idx) => {
      const anchor = TYPE_TO_ANCHOR[sec.type] ?? sec.id;
      const labels = TYPE_TO_LABEL[sec.type] ?? { label: sec.type, shortLabel: sec.type };
      return {
        id: anchor,
        label: labels.label,
        shortLabel: labels.shortLabel,
        badge: String(idx + 1).padStart(2, "0"),
      };
    });

  const [activeId, setActiveId] = useState<string>(RAIL_SECTIONS[0]?.id ?? "hero");
  const [isVisible, setIsVisible] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show rail after scrolling past initial hero billboard
  useEffect(() => {
    function handleScroll() {
      const sy = window.scrollY;
      setIsVisible(sy > 180);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track sections via IntersectionObserver — re-run when RAIL_SECTIONS changes
  const railSectionIds = RAIL_SECTIONS.map((s) => s.id).join(",");
  useEffect(() => {
    const sectionIds = RAIL_SECTIONS.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isClickScrollingRef.current) {
              setActiveId(id);
            }
          });
        },
        { rootMargin: "-25% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [railSectionIds]);

  // Smooth scroll to section
  const handleJump = (id: string) => {
    // Lock observer from overriding active pill during smooth scrolling
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1000);

    setActiveId(id);
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `/#${id}`);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {isDocked ? (
        <motion.div
          key="docked-pill"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            type="button"
            onClick={() => setIsDocked(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#070a13]/95 backdrop-blur-xl border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider shadow-2xl shadow-black/80 hover:bg-[#d4af37] hover:text-[#070a13] transition-all"
          >
            <Layers size={13} />
            <span>Show Chapter Rail</span>
            <Maximize2 size={12} />
          </button>
        </motion.div>
      ) : (
        <motion.aside
          key="expanded-rail"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="sticky top-[68px] z-40 bg-[#070a13]/92 backdrop-blur-2xl border-y border-white/8 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          aria-label="Section Quick Navigator"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Left Category Indicator */}
            <div className="hidden sm:flex items-center gap-2 shrink-0 text-white/40 text-[11px] font-semibold tracking-wider uppercase">
              <Layers size={13} className="text-[#d4af37]" />
              <span>Chapters</span>
              <ChevronRight size={12} className="text-white/20" />
            </div>

            {/* Horizontal Scroll Track with zero ugly scrollbars */}
            <div
              ref={railRef}
              className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5"
            >
              {RAIL_SECTIONS.map((sec) => {
                const isActive = activeId === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleJump(sec.id)}
                    className={cn(
                      "relative shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 outline-none select-none",
                      isActive
                        ? "text-[#070a13] font-bold shadow-md shadow-[#d4af37]/20"
                        : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                    )}
                  >
                    {/* Active Glowing Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeRailPill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#edd685] via-[#d4af37] to-[#e5c158] -z-10 shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 600, damping: 30 }
                        }
                      />
                    )}

                    <span
                      className={cn(
                        "text-[10px] font-mono px-1 py-0.2 rounded transition-colors",
                        isActive
                          ? "bg-black/20 text-[#070a13] font-bold"
                          : "text-[#d4af37]/70"
                      )}
                    >
                      {sec.badge}
                    </span>
                    <span className="truncate">{sec.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Controls: Batch Quick Badge & Minimize Rail */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleJump("our-batch")}
                className="hidden md:flex text-[11px] font-bold tracking-wider uppercase text-[#d4af37] hover:text-white px-2.5 py-1 rounded-md bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 transition-all items-center gap-1.5"
              >
                <Sparkles size={11} />
                <span>26 Scholars</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDocked(true)}
                className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                title="Minimize chapter navigation rail"
                aria-label="Minimize chapter navigation rail"
              >
                <Minus size={14} />
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
