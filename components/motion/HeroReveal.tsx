"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASINGS, SPRINGS } from "@/lib/motion";
import { Counter } from "@/components/motion/Counter";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";
import {
  UniversityGatewayEmblem,
  ScholarsCohortEmblem,
  NirfUniversityRankEmblem,
  StatePublicRankEmblem,
} from "@/components/ui/BespokeIcons";

interface HeroRevealProps {
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  batchLabel?: string;
  enrolledCount?: string;
  location?: string;
  headingSizeCls?: string;
  textAlignCls?: string;
  showEyebrow?: boolean;
  mobileTextCenter?: boolean;
}

// Split a string into individual words with overflow-hidden masked wrappers
function MaskedWords({
  text,
  className,
  container,
  wordClass,
}: {
  text: string;
  className?: string;
  container: Variants;
  wordClass?: string;
}) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn("inline", className)}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
          <motion.span
            variants={{
              hidden: { y: "110%", opacity: 0, rotateX: -20 },
              visible: {
                y: 0,
                opacity: 1,
                rotateX: 0,
                transition: { duration: 0.8, ease: EASINGS.expo },
              },
            }}
            className={cn("inline-block origin-bottom", wordClass)}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}



export function HeroReveal({
  eyebrow = "CENTRE FOR BUDGET STUDIES · CUSAT",
  title = "Understanding Public Finance.",
  titleHighlight = "Shaping Tomorrow.",
  description = "A premier academic and policy research institute dedicated to public finance, macroeconomic analysis, and state budget evaluation.",
  primaryBtnText = "Meet Our Scholars",
  primaryBtnLink = "#our-batch",
  secondaryBtnText = "About the Centre",
  secondaryBtnLink = "#about-centre",
  batchLabel = "Batch 2026–2028",
  enrolledCount = "26 Enrolled Scholars",
  location = "Kalamassery, Kerala",
  headingSizeCls = "text-4xl sm:text-5xl lg:text-6xl",
  textAlignCls = "text-left",
  showEyebrow = true,
  mobileTextCenter = false,
}: HeroRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);

  // Parallax scroll
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 80]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);

  // Pointer parallax spring
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });
  const orb1X = useTransform(mouseX, [-0.5, 0.5], [-18, 18]);
  const orb1Y = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);
  const orb2X = useTransform(mouseX, [-0.5, 0.5], [14, -14]);
  const orb2Y = useTransform(mouseY, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      if (!hasInteracted) setHasInteracted(true);
    };
    const el = heroRef.current;
    el?.addEventListener("mousemove", handleMove, { passive: true });
    return () => el?.removeEventListener("mousemove", handleMove);
  }, [shouldReduceMotion, hasInteracted, mouseX, mouseY]);

  const wordContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const highlightContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  };

  return (
    <div ref={heroRef} className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* ── CINEMATIC BACKGROUND LAYERS ─────────────────────────── */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={shouldReduceMotion ? {} : { y: bgY }}
      >
        {/* Fine grid overlay — animates in */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.5 }}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 60% at 60% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* Atmospheric orb 1 — pointer-tracked */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={
            shouldReduceMotion
              ? { background: "rgba(212,175,55,0.07)" }
              : { x: orb1X, y: orb1Y, background: "rgba(212,175,55,0.07)" }
          }
          animate={
            shouldReduceMotion
              ? {}
              : { scale: [1, 1.08, 1] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Atmospheric orb 2 — counter-tracks */}
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={
            shouldReduceMotion
              ? { background: "rgba(26,45,84,0.35)" }
              : { x: orb2X, y: orb2Y, background: "rgba(26,45,84,0.35)" }
          }
          animate={shouldReduceMotion ? {} : { scale: [1, 1.12, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Subtle light beam — top right */}
        <motion.div
          className="absolute -top-40 right-20 w-[2px] h-[500px] origin-top"
          style={{
            background: "linear-gradient(to bottom, rgba(212,175,55,0.25), transparent)",
            transform: "rotate(-18deg)",
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: EASINGS.expo }}
        />
        <motion.div
          className="absolute -top-40 right-36 w-[1px] h-[400px] origin-top"
          style={{
            background: "linear-gradient(to bottom, rgba(212,175,55,0.12), transparent)",
            transform: "rotate(-22deg)",
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: EASINGS.expo }}
        />
      </motion.div>

      {/* ── CONTENT CONTAINER ─────────────────────────────────────────── */}
      <motion.div
        className="relative w-full max-w-6xl mx-auto space-y-12 z-10"
        style={shouldReduceMotion ? {} : { y: textY }}
      >
        {/* ── Typographic & Action Sequence ─── */}
        <div
          className={cn(
            "space-y-7 max-w-4xl",
            textAlignCls,
            mobileTextCenter && "text-center sm:text-left"
          )}
        >
          {/* Eyebrow — scrambles in */}
          {showEyebrow && eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASINGS.smoothOut }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-semibold tracking-wider uppercase shadow-sm"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>{eyebrow}</span>
            </motion.div>
          )}

          {/* Headline — masked word-by-word reveal with perspective */}
          <div className={cn("overflow-visible", headingSizeCls)}>
            <h1
              className={cn("font-black text-white tracking-tight leading-[1.06]", headingSizeCls)}
              aria-label={`${title} ${titleHighlight}`}
            >
              {/* Title words */}
              <MaskedWords
                text={title}
                container={wordContainerVariants}
              />

              {/* Highlight words — gold gradient, delayed */}
              {titleHighlight && (
                <span className="block mt-1">
                  <MaskedWords
                    text={titleHighlight}
                    container={highlightContainerVariants}
                    wordClass="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3d98b] to-[#b8860b]"
                  />
                </span>
              )}
            </h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASINGS.smoothOut }}
            className="text-base sm:text-lg text-white/70 leading-relaxed font-normal max-w-3xl"
          >
            {description}
          </motion.p>

          {/* CTA Buttons — wipe reveal */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.7, delay: 1.05, ease: EASINGS.expo }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            {primaryBtnText && (
              <MagneticButton href={primaryBtnLink} strength={14}>
                <span className="btn-primary text-xs uppercase tracking-wider py-3.5 px-8 flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 font-bold group">
                  <span>{primaryBtnText}</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1.5"
                  />
                </span>
              </MagneticButton>
            )}

            {secondaryBtnText && (
              <MagneticButton href={secondaryBtnLink} strength={8}>
                <span className="btn-outline text-xs uppercase tracking-wider py-3.5 px-8 flex items-center justify-center gap-2 font-semibold hover:border-white/30">
                  <span>{secondaryBtnText}</span>
                </span>
              </MagneticButton>
            )}
          </motion.div>
        </div>

        {/* ── EXECUTIVE INSTITUTIONAL CREDENTIALS MONOGRAPH STRIP ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: EASINGS.smoothOut }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10"
        >
          <div className="p-5 rounded-2xl bg-[#0c1222]/85 border border-white/8 backdrop-blur-md space-y-2 hover:border-[#d4af37]/35 transition-all">
            <div className="flex items-center justify-between text-[#d4af37]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/45 block">
                Founding Year
              </span>
              <UniversityGatewayEmblem size={20} />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#d4af37] font-mono block">
              2012
            </span>
            <span className="text-xs text-white/60 block font-normal">
              Estd. by CUSAT for Budget Studies
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c1222]/85 border border-white/8 backdrop-blur-md space-y-2 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/45 block">
                Academic Cohort
              </span>
              <ScholarsCohortEmblem size={20} />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
              {enrolledCount ? enrolledCount.replace(/[^0-9]/g, "") || "26" : "26"} Scholars
            </span>
            <span className="text-xs text-white/60 block font-normal">
              {batchLabel || "Academic Batch 2026–2028"}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c1222]/85 border border-white/8 backdrop-blur-md space-y-2 hover:border-[#d4af37]/35 transition-all">
            <div className="flex items-center justify-between text-[#d4af37]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/45 block">
                NIRF 2025 Rank
              </span>
              <NirfUniversityRankEmblem size={20} />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
              32nd
            </span>
            <span className="text-xs text-white/60 block font-normal">
              University Category in India
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c1222]/85 border border-white/8 backdrop-blur-md space-y-2 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between text-[#d4af37]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/45 block">
                State Public Rank
              </span>
              <StatePublicRankEmblem size={20} />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#d4af37] font-mono block">
              6th
            </span>
            <span className="text-xs text-white/60 block font-normal">
              Among State Public Universities
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2, ease: EASINGS.smoothOut }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
          animate={shouldReduceMotion ? {} : {}}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-[#d4af37]"
            animate={shouldReduceMotion ? {} : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Scroll</span>
      </motion.div>
    </div>
  );
}
