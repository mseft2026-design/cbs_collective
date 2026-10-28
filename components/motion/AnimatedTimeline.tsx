"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { timelineNodeVariants, timelineLineVariants, EASINGS, staggerChild } from "@/lib/motion";
import { TiltCard } from "@/components/motion/TiltCard";
import { MaskedHeading } from "@/components/motion/MaskedHeading";

interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

interface AnimatedTimelineProps {
  items: MilestoneItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  headingSizeCls?: string;
}

/**
 * AnimatedTimeline — connected SVG spine with staggered node and card reveals.
 * Spine draws in as content enters viewport. Nodes pop in with back-ease spring.
 */
export function AnimatedTimeline({
  items,
  eyebrow,
  title = "Institutional Milestones & Legacy",
  description,
  headingSizeCls = "text-3xl sm:text-4xl lg:text-5xl",
}: AnimatedTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={containerRef}>
      {/* Section header */}
      <div className="max-w-2xl mb-16">
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
            {eyebrow}
          </span>
        )}
        <div className="w-12 h-1 bg-[#d4af37] rounded-full mb-4" />
        <MaskedHeading as="h2" className={`font-extrabold text-white tracking-tight leading-tight ${headingSizeCls}`}>
          {title}
        </MaskedHeading>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASINGS.smoothOut }}
            className="text-sm text-white/60 mt-4"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Timeline grid */}
      <div className="relative">
        {/* Animated SVG connector spine (horizontal on lg, vertical on mobile) */}
        {!shouldReduceMotion && items.length > 1 && (
          <div className="absolute hidden lg:block top-7 left-0 right-0 h-px overflow-visible pointer-events-none z-0">
            <svg
              className="absolute inset-0 w-full h-8 overflow-visible"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.line
                x1="4%"
                y1="4"
                x2="96%"
                y2="4"
                stroke="url(#timelineGrad)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                variants={timelineLineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
              <defs>
                <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(212,175,55,0)" />
                  <stop offset="20%" stopColor="rgba(212,175,55,0.6)" />
                  <stop offset="80%" stopColor="rgba(212,175,55,0.6)" />
                  <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={staggerChild}
              className="relative"
            >
              {/* Timeline node dot */}
              <motion.div
                variants={timelineNodeVariants}
                className="w-3.5 h-3.5 rounded-full bg-[#d4af37] border-2 border-[#070a13] shadow-lg shadow-[#d4af37]/40 mx-auto mb-4 lg:mx-0"
                style={{ boxShadow: "0 0 12px rgba(212,175,55,0.5)" }}
              />

              <TiltCard
                className="bg-[#0c1222] border border-white/8 rounded-xl p-6 relative flex flex-col justify-between group hover:border-[#d4af37]/30 transition-colors h-full"
                maxTilt={5}
              >
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 inline-block mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
