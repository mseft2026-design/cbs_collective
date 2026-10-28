"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Microscope,
  Building2,
  Compass,
  TrendingUp,
  BarChart3,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Award,
  Globe,
  GraduationCap,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Minus,
  Maximize2,
  ChevronDown,
} from "lucide-react";
import { SectionInstance } from "@/types/builder";
import {
  getWidthClass,
  getSpacingClass,
  getTextAlignClass,
  getHeadingSizeClass,
} from "@/lib/builder";
import { StudentGrid } from "@/components/students/StudentGrid";
import { StudentWithUrls } from "@/types/student";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { Counter } from "@/components/motion/Counter";
import { InteractiveCard } from "@/components/motion/InteractiveCard";
import { TiltCard } from "@/components/motion/TiltCard";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { AnimatedTimeline } from "@/components/motion/AnimatedTimeline";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { EASINGS, VIEWPORT_ONCE, staggerChild } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { FacultyCard } from "@/components/institution/FacultyCard";
import { faculty as defaultFaculty } from "@/config/faculty";

// Map section types → anchor IDs expected by Navbar hash-links
const SECTION_ANCHOR_MAP: Partial<Record<string, string>> = {
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

interface SectionRendererProps {
  section: SectionInstance;
  students?: StudentWithUrls[];
  cmsFallback?: any;
  isInteractivePreview?: boolean;
  onSelectSection?: (id: string) => void;
  isSelected?: boolean;
}

export function SectionRenderer({
  section,
  students = [],
  cmsFallback,
  isInteractivePreview = false,
  onSelectSection,
  isSelected = false,
}: SectionRendererProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMinimized, setIsMinimized] = useState(false);

  if (section.isHidden && !isInteractivePreview) {
    return null;
  }

  const { layout, content, type } = section;
  const widthCls = getWidthClass(layout?.contentWidth);
  const spacingCls = getSpacingClass(layout?.spacing);
  const textAlignCls = getTextAlignClass(layout?.horizontalAlign);
  const headingSizeCls = getHeadingSizeClass(layout?.headingSize);

  // Content helpers with fallbacks
  const eyebrow = content.eyebrow;
  const title = content.title;
  const description = content.description;

  const innerContent = (
    <>
      {/* ── 1. HERO / EXECUTIVE WELCOME (CINEMATIC MOTION REVEAL) ─── */}
      {type === "hero" && (
        <HeroReveal
          eyebrow={eyebrow}
          title={title}
          titleHighlight={content.titleHighlight}
          description={description}
          primaryBtnText={content.primaryBtnText}
          primaryBtnLink={content.primaryBtnLink}
          secondaryBtnText={content.secondaryBtnText}
          secondaryBtnLink={content.secondaryBtnLink}
          batchLabel={content.batchLabel}
          enrolledCount={content.enrolledCount}
          location={content.location}
          headingSizeCls={headingSizeCls}
          textAlignCls={textAlignCls}
          showEyebrow={layout?.showEyebrow}
          mobileTextCenter={layout?.mobileTextCenter}
        />
      )}

      {/* ── 2. STATS (INTERACTIVE CARDS & ANIMATED COUNTERS) ─────── */}
      {type === "stats" && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
          }}
        >
          <motion.div variants={staggerChild}>
            <TiltCard className="bg-[#0c1222] border border-white/10 rounded-2xl p-7 shadow-lg flex flex-col justify-between hover:border-[#d4af37]/40 transition-colors h-full" maxTilt={5}>
              <div>
                <div className="h-1 w-12 bg-[#d4af37] rounded-full mb-5" />
                <div className="text-4xl sm:text-5xl font-black text-[#d4af37] tracking-tight font-mono">
                  <Counter value={content.stat1Value || "26"} />
                </div>
                <div className="text-base font-bold text-white mt-1">
                  {content.stat1Label || "Scholars"}
                </div>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                  {content.stat1Desc || "Academic Batch 2026–2028 enrolled in specialized economic studies."}
                </p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={staggerChild}>
            <TiltCard className="bg-[#0c1222] border border-white/10 rounded-2xl p-7 shadow-lg flex flex-col justify-between hover:border-white/30 transition-colors h-full" maxTilt={5}>
              <div>
                <div className="h-1 w-12 bg-white/30 rounded-full mb-5" />
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {content.stat2Value || "CUSAT"}
                </div>
                <div className="text-base font-bold text-white mt-1">
                  {content.stat2Label || "University"}
                </div>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                  {content.stat2Desc || "Cochin University of Science and Technology."}
                </p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={staggerChild}>
            <TiltCard className="bg-[#0c1222] border border-white/10 rounded-2xl p-7 shadow-lg flex flex-col justify-between hover:border-[#a81d34]/50 transition-colors h-full" maxTilt={5}>
              <div>
                <div className="h-1 w-12 bg-[#a81d34] rounded-full mb-5" />
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                  <Counter value={content.stat3Value || "6+"} />
                </div>
                <div className="text-base font-bold text-white mt-1">
                  {content.stat3Label || "Focus Areas"}
                </div>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                  {content.stat3Desc || "Fiscal policy, state budgeting, and federal finances."}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      )}

      {/* ── 3. ABOUT ──────────────────────────────────────────────── */}
      {type === "about" && (
        <div>
          <div className="max-w-2xl mb-12">
            {layout.showEyebrow && eyebrow && (
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, ease: EASINGS.smoothOut }}
                className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2"
              >
                {eyebrow}
              </motion.span>
            )}
            <motion.div
              className="w-12 h-1 bg-[#d4af37] rounded-full mb-4"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: 0.1, ease: EASINGS.expo }}
            />
            <MaskedHeading
              as="h2"
              className={cn("font-extrabold text-white tracking-tight leading-tight", headingSizeCls)}
              stagger={0.1}
            >
              {title || "Advancing Fiscal Knowledge & Governance"}
            </MaskedHeading>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.6, delay: 0.3, ease: EASINGS.smoothOut }}
                className="text-sm text-white/60 mt-3 leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div
              className="lg:col-span-8 space-y-4 text-sm text-white/70 leading-relaxed font-normal"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
              }}
            >
              {content.paragraph1 ? (
                <>
                  <motion.div
                    variants={staggerChild}
                    className="bg-[#0c1222] border border-white/8 rounded-xl p-6 text-white/80 shadow-md hover:border-white/12 transition-colors"
                  >
                    {content.paragraph1}
                  </motion.div>
                  {content.paragraph2 && (
                    <motion.div
                      variants={staggerChild}
                      className="bg-[#0c1222] border border-white/8 rounded-xl p-6 text-white/80 shadow-md hover:border-white/12 transition-colors"
                    >
                      {content.paragraph2}
                    </motion.div>
                  )}
                </>
              ) : (
                (cmsFallback?.about?.paragraphs || [
                  "The Centre for Budget Studies (CBS) at Cochin University of Science and Technology (CUSAT) is a dedicated centre for academic enquiry and research into public economics, government budgeting, and fiscal policy.",
                  "Through rigorous research, post-graduate education, and capacity-building programmes, CBS bridges the gap between academic economics and practical governance."
                ]).map((para: string, i: number) => (
                  <motion.div
                    key={i}
                    variants={staggerChild}
                    className="bg-[#0c1222] border border-white/8 rounded-xl p-6 text-white/80 shadow-md hover:border-white/12 transition-colors"
                  >
                    {para}
                  </motion.div>
                ))
              )}
            </motion.div>

            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, delay: 0.3, ease: EASINGS.smoothOut }}
            >
              <TiltCard className="bg-[#0c1222] border border-white/10 rounded-xl p-6 space-y-4 shadow-lg" maxTilt={5}>
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <h3 className="text-base font-bold text-white">
                  {content.sidebarTitle || "CUSAT Institutional Foundation"}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  {content.sidebarText ||
                    "Operating under Cochin University of Science and Technology, combining academic rigor with public finance relevance."}
                </p>
                {content.sidebarLinkUrl && (
                  <div className="pt-2">
                    <a
                      href={content.sidebarLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#d4af37] hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>{content.sidebarLinkText || "Visit CUSAT Portal"}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </TiltCard>
            </motion.div>
          </div>
        </div>
      )}

      {/* ── CUSAT INSTITUTIONAL PROFILE ─────────────────────────── */}
      {type === "cusat" && (
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              {layout.showEyebrow && eyebrow && (
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.5, ease: EASINGS.smoothOut }}
                  className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2"
                >
                  {eyebrow}
                </motion.span>
              )}
              <motion.div
                className="w-12 h-1 bg-[#d4af37] rounded-full mb-4"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: 0.1, ease: EASINGS.expo }}
              />
              <MaskedHeading
                as="h2"
                className={cn("font-extrabold text-white tracking-tight leading-tight", headingSizeCls)}
                stagger={0.08}
              >
                {title || "Cochin University of Science and Technology"}
              </MaskedHeading>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.6, delay: 0.25, ease: EASINGS.smoothOut }}
                className="text-sm sm:text-base text-white/70 mt-3 leading-relaxed"
              >
                {description ||
                  "The University of Cochin was reconstituted as Cochin University of Science and Technology (CUSAT) in February 1986, with the objective of promoting graduate and postgraduate studies and advanced research in Applied Sciences, Technology, Industry, Commerce, Management and Social Sciences."}
              </motion.p>
            </div>

            {/* Official CUSAT Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, ease: EASINGS.smoothOut }}
              className="shrink-0 p-3.5 bg-white rounded-2xl shadow-xl border border-white/20 self-start md:self-center"
            >
              <Image
                src="/images/cusat-logo.jpg"
                alt="Cochin University of Science and Technology (CUSAT) logo"
                width={180}
                height={110}
                className="h-20 sm:h-24 w-auto object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* 4 Ranking & Standing Accolade Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <InteractiveCard className="bg-[#0c1222] border border-[#d4af37]/30 rounded-2xl p-6 relative overflow-hidden shadow-lg group">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-4">
                <Award size={20} />
              </div>
              <div className="text-3xl font-black text-[#d4af37] font-mono tracking-tight">
                32nd
              </div>
              <h4 className="text-sm font-bold text-white mt-1">NIRF University Category</h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                National Institutional Ranking Framework (NIRF) India Rankings 2025.
              </p>
            </InteractiveCard>

            <InteractiveCard className="bg-[#0c1222] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-lg group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <div className="text-3xl font-black text-white font-mono tracking-tight">
                6th
              </div>
              <h4 className="text-sm font-bold text-white mt-1">State Public Universities</h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Ranked 6th nationwide among state public universities in NIRF 2025.
              </p>
            </InteractiveCard>

            <InteractiveCard className="bg-[#0c1222] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-lg group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-4">
                <Globe size={20} />
              </div>
              <div className="text-3xl font-black text-white font-mono tracking-tight">
                Top 1,500
              </div>
              <h4 className="text-sm font-bold text-white mt-1">World University Rankings</h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Featured in Times Higher Education World Rankings since 2017 &amp; QS World Rankings.
              </p>
            </InteractiveCard>

            <InteractiveCard className="bg-[#0c1222] border border-[#a81d34]/40 rounded-2xl p-6 relative overflow-hidden shadow-lg group">
              <div className="w-10 h-10 rounded-xl bg-[#a81d34]/20 text-[#f87171] flex items-center justify-center mb-4">
                <Building2 size={20} />
              </div>
              <div className="text-3xl font-black text-white font-mono tracking-tight">
                50th
              </div>
              <h4 className="text-sm font-bold text-white mt-1">NIRF Overall Category</h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Comprehensive national ranking across all Indian higher education institutions.
              </p>
            </InteractiveCard>
          </div>

          {/* Research Funding & Recruiter Value Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 bg-[#0c1222] border border-white/8 rounded-2xl p-8 space-y-5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37]">
                Research Infrastructure &amp; Funding
              </span>
              <h3 className="text-lg font-bold text-white">
                Supported by Premier National Agencies &amp; Global MoUs
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-normal">
                CUSAT's research activities receive support and funding from central government agencies such as UGC, DST, DBT and MHRD, as well as international research partners through various Memoranda of Understanding (MoUs). The University hosts numerous national and international academic discussions, seminars and workshops every year.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {["UGC Sponsored", "DST Funded", "DBT Supported", "MHRD Recognized", "Global University MoUs"].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0c1222] border border-white/8 rounded-2xl p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37]">
                  Recruiter &amp; Talent Pipeline
                </span>
                <h3 className="text-lg font-bold text-white">
                  Industry-Ready Graduates
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  For recruiters, CUSAT provides access to an exceptional talent pool, with a strong record of successful campus placements and graduates equipped with cutting-edge knowledge and industry-ready skills across technology, engineering, commerce and management, prepared to excel in a globally competitive professional environment.
                </p>
              </div>
              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                <Link
                  href="/about"
                  className="btn-primary text-xs py-2.5 px-4 inline-flex items-center gap-1.5"
                >
                  <span>Read Full About Dossier</span>
                  <ArrowRight size={13} />
                </Link>
                <a
                  href="https://cusat.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/50 hover:text-[#d4af37] inline-flex items-center gap-1"
                >
                  <span>cusat.ac.in</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {type === "vision_mission" && (
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14">
            {layout.showEyebrow && eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, ease: EASINGS.smoothOut }}
                className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2"
              >
                {eyebrow}
              </motion.span>
            )}
            <motion.div
              className="w-12 h-1 bg-[#d4af37] rounded-full mx-auto mb-4"
              initial={{ scaleX: 0, originX: "50%" }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: 0.1, ease: EASINGS.expo }}
            />
            <MaskedHeading
              as="h2"
              className={cn("font-extrabold text-white tracking-tight", headingSizeCls)}
              stagger={0.08}
            >
              {title || "Vision & Strategic Mission"}
            </MaskedHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, ease: EASINGS.expo }}
            >
              <TiltCard
                className="bg-[#0c1222] border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-lg hover:border-[#d4af37]/40 transition-colors h-full"
                maxTilt={6}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-6">
                  <Compass size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Institutional Vision</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {content.vision || cmsFallback?.vision_mission?.vision}
                </p>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, delay: 0.15, ease: EASINGS.expo }}
            >
              <TiltCard
                className="bg-[#0c1222] border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-lg hover:border-[#a81d34]/40 transition-colors h-full"
                maxTilt={6}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#a81d34]/5 to-transparent pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-[#a81d34]/20 text-[#f87171] flex items-center justify-center mb-6">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Strategic Mission</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {content.mission || cmsFallback?.vision_mission?.mission}
                </p>
              </TiltCard>
            </motion.div>
          </div>

          {/* Core Values Strip */}
          <div className="bg-[#0c1222] border border-white/8 rounded-2xl p-6 sm:p-8">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block mb-4">
              Institutional Core Values &amp; Commitments
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { title: "Institutional Integrity", desc: "Honesty and statutory compliance in fiscal inquiry" },
                { title: "Openness to Knowledge", desc: "Welcoming intellectual diversity and evolving models" },
                { title: "Quality Education", desc: "Rigorous quantitative and econometrics instruction" },
                { title: "Societal Welfare", desc: "Translating budget studies into human development" },
                { title: "Freedom of Inquiry", desc: "Safe environment for research and continuous improvement" },
              ].map((val) => (
                <div key={val.title} className="p-4 rounded-xl bg-white/[0.03] border border-white/6 space-y-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mb-2" />
                  <h4 className="text-xs font-bold text-white leading-snug">{val.title}</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 5. CURRICULUM SCHEME ──────────────────────────────────── */}
      {type === "curriculum" && (
        <div>
          <div className="max-w-3xl mb-12">
            {layout.showEyebrow && eyebrow && (
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
                {eyebrow}
              </span>
            )}
            <div className="w-12 h-1 bg-[#d4af37] rounded-full mb-4" />
            <h2 className={cn("font-extrabold text-white tracking-tight", headingSizeCls)}>
              {title || "Four-Semester Course Structure"}
            </h2>
            <p className="text-sm text-white/60 mt-3 leading-relaxed">
              {description ||
                "A specialized 2-year postgraduate program covering theoretical foundations, empirical techniques, and state budgeting practicums."}
            </p>
          </div>

          {cmsFallback?.curriculum?.semesters?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cmsFallback.curriculum.semesters.map((sem: any) => (
                <InteractiveCard
                  key={sem.number}
                  className="bg-[#0c1222] border border-white/8 rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/8">
                    <h4 className="font-extrabold text-white text-base">
                      {sem.title || `Semester ${sem.number}`}
                    </h4>
                    <span className="text-xs font-mono text-[#d4af37] font-semibold">
                      {sem.courses?.length || 0} Modules
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {(sem.courses || []).map((c: any, i: number) => (
                      <li key={i} className="flex items-start justify-between text-xs gap-3">
                        <div>
                          <span className="font-mono text-white/40 mr-2">{c.code}</span>
                          <span className="text-white/85 font-medium">{c.title}</span>
                        </div>
                        <span className="text-white/40 font-mono shrink-0">
                          {c.credits} cr
                        </span>
                      </li>
                    ))}
                  </ul>
                </InteractiveCard>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 6. MILESTONES ─────────────────────────────────────────── */}
      {type === "milestones" && (
        <AnimatedTimeline
          items={(cmsFallback?.achievements?.items || []).map((item: any) => ({
            year: item.year ?? "",
            title: item.title ?? "",
            description: item.description ?? "",
          }))}
          eyebrow={layout.showEyebrow && eyebrow ? eyebrow : undefined}
          title={title || "Institutional Milestones & Legacy"}
          description={description}
          headingSizeCls={headingSizeCls}
        />
      )}

      {/* ── 7. RESEARCH ───────────────────────────────────────────── */}
      {type === "research" && (
        <div>
          <div className="max-w-2xl mb-12">
            {layout.showEyebrow && eyebrow && (
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, ease: EASINGS.smoothOut }}
                className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2"
              >
                {eyebrow}
              </motion.span>
            )}
            <motion.div
              className="w-12 h-1 bg-[#d4af37] rounded-full mb-4"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: 0.1, ease: EASINGS.expo }}
            />
            <MaskedHeading
              as="h2"
              className={cn("font-extrabold text-white tracking-tight", headingSizeCls)}
              stagger={0.08}
            >
              {title || "Research Focus & Specialisations"}
            </MaskedHeading>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: 0.3, ease: EASINGS.smoothOut }}
                className="text-sm text-white/60 mt-3"
              >
                {description}
              </motion.p>
            )}
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            }}
          >
            {(cmsFallback?.research?.areas || []).map((area: any, i: number) => (
              <motion.div key={i} variants={staggerChild}>
                <TiltCard
                  className="bg-[#0c1222] border border-white/8 rounded-xl p-6 flex flex-col justify-between hover:border-purple-500/30 transition-colors h-full"
                  maxTilt={7}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-4">
                      <Microscope size={20} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{area.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed">{area.description}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ── 8. FACULTY ────────────────────────────────────────────── */}
      {type === "faculty" && (
        <div>
          <div className="max-w-2xl mb-12">
            {layout.showEyebrow && eyebrow && (
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, ease: EASINGS.smoothOut }}
                className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2"
              >
                {eyebrow}
              </motion.span>
            )}
            <motion.div
              className="w-12 h-1 bg-[#d4af37] rounded-full mb-4"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: 0.1, ease: EASINGS.expo }}
            />
            <MaskedHeading
              as="h2"
              className={cn("font-extrabold text-white tracking-tight", headingSizeCls)}
              stagger={0.08}
            >
              {title || "Faculty & Academic Mentors"}
            </MaskedHeading>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: 0.3, ease: EASINGS.smoothOut }}
                className="text-sm text-white/60 mt-3"
              >
                {description}
              </motion.p>
            )}
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
          >
            {(cmsFallback?.faculty?.members?.length
              ? cmsFallback.faculty.members
              : defaultFaculty
            ).map((fac: any, i: number) => (
              <motion.div key={fac.id || i} variants={staggerChild} className="h-full">
                <FacultyCard member={fac} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ── 9. STUDENTS BATCH DIRECTORY ───────────────────────────── */}
      {type === "students" && (
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              {layout.showEyebrow && eyebrow && (
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.5, ease: EASINGS.smoothOut }}
                  className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2"
                >
                  {eyebrow}
                </motion.span>
              )}
              <motion.div
                className="w-12 h-1 bg-[#d4af37] rounded-full mb-4"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: 0.1, ease: EASINGS.expo }}
              />
              <MaskedHeading
                as="h2"
                className={cn("font-extrabold text-white tracking-tight", headingSizeCls)}
                stagger={0.08}
              >
                {title || "Our Batch"}
              </MaskedHeading>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.6, delay: 0.3, ease: EASINGS.smoothOut }}
                className="text-sm sm:text-base text-white/60 mt-3 leading-relaxed"
              >
                {description ||
                  "Meet all scholars in the Academic Batch 2026–2028 at the Centre for Budget Studies. Browse specialisations, backgrounds, and access verified CVs."}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: 0.4, ease: EASINGS.smoothOut }}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 self-start md:self-auto flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span className="font-semibold text-white">{students.length} Scholars</span>
              <span>· Verified Cohort</span>
            </motion.div>
          </div>

          <StudentGrid students={students} />
        </div>
      )}

      {/* ── 10. CALL TO ACTION ────────────────────────────────────── */}
      {type === "cta" && (
        <InteractiveCard className="bg-[#0c1222] border border-white/10 rounded-2xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden group hover:border-[#d4af37]/40 transition-colors">
          {/* Subtle light sweep shimmer animation */}
          <div className="absolute inset-0 skeleton-shimmer opacity-20 pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            {layout.showEyebrow && eyebrow && (
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">
                {eyebrow}
              </span>
            )}
            <h2 className={cn("font-extrabold text-white tracking-tight", headingSizeCls)}>
              {title || "Collaborate With Us"}
            </h2>
            <p className="text-sm text-white/70 leading-relaxed max-w-xl mx-auto">
              {description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {content.primaryBtnText && (
                <a
                  href={content.primaryBtnLink || "#our-batch"}
                  className="btn-primary text-xs uppercase tracking-wider py-3 px-6 shadow-lg shadow-[#d4af37]/20 transition-all hover:scale-102 active:scale-98"
                >
                  {content.primaryBtnText}
                </a>
              )}
              {content.secondaryBtnText && (
                <a
                  href={content.secondaryBtnLink || "mailto:cbs@cusat.ac.in"}
                  className="btn-outline text-xs uppercase tracking-wider py-3 px-6 transition-all hover:border-white/30 active:scale-98"
                >
                  {content.secondaryBtnText}
                </a>
              )}
            </div>
          </div>
        </InteractiveCard>
      )}

      {/* ── 11. EDITORIAL CONTENT ─────────────────────────────────── */}
      {type === "editorial" && (
        <div className="space-y-6">
          <div className="max-w-2xl mb-8">
            {layout.showEyebrow && eyebrow && (
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
                {eyebrow}
              </span>
            )}
            <div className="w-12 h-1 bg-[#d4af37] rounded-full mb-4" />
            <h2 className={cn("font-extrabold text-white tracking-tight", headingSizeCls)}>
              {title || "Special Feature"}
            </h2>
          </div>
          <div className="bg-[#0c1222] border border-white/8 rounded-2xl p-8 text-white/80 text-sm leading-relaxed whitespace-pre-line shadow-md">
            {content.bodyText}
          </div>
        </div>
      )}

      {/* ── 12. PROGRAMME OVERVIEW ────────────────────────────────── */}
      {type === "programme" && (
        <div className="space-y-10">
          <div className="max-w-3xl">
            {layout.showEyebrow && eyebrow && (
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
                {eyebrow}
              </span>
            )}
            <div className="w-12 h-1 bg-[#d4af37] rounded-full mb-4" />
            <h2 className={cn("font-extrabold text-white tracking-tight leading-tight", headingSizeCls)}>
              {content.degreeName || "M.Sc. Budget Studies"}
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-3 leading-relaxed">
              {description ||
                "Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement."}
            </p>
          </div>

          {/* 3 Core Academic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InteractiveCard className="bg-[#0c1222] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#d4af37]/40 transition-colors">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-5">
                  <BarChart3 size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Quantitative Analysis</h3>
                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  Rigorous mathematical modeling, public revenue estimation, and quantitative techniques for analyzing fiscal policy and governance.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/6 text-[11px] font-mono text-[#d4af37]">
                Pillar 01 · Mathematical Economics
              </div>
            </InteractiveCard>

            <InteractiveCard className="bg-[#0c1222] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-blue-500/40 transition-colors">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-5">
                  <TrendingUp size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Applied Econometrics</h3>
                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  Empirical inquiry, time-series forecasting, and econometric estimation of union, state, and local government budgets.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/6 text-[11px] font-mono text-blue-400">
                Pillar 02 · Empirical Inquiry
              </div>
            </InteractiveCard>

            <InteractiveCard className="bg-[#0c1222] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-5">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Financial Technology</h3>
                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  Modern computational analytics, digital public finance systems, and FinTech tools transforming contemporary budget management.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/6 text-[11px] font-mono text-emerald-400">
                Pillar 03 · Computational FinTech
              </div>
            </InteractiveCard>
          </div>

          {/* Specs Band */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <InteractiveCard className="bg-[#0c1222] border border-white/8 rounded-xl p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Duration</span>
              <p className="text-base font-bold text-white mt-1">{content.duration || "2 Years (4 Semesters)"}</p>
            </InteractiveCard>
            <InteractiveCard className="bg-[#0c1222] border border-white/8 rounded-xl p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Cohort Intake</span>
              <p className="text-base font-bold text-white mt-1">{content.intake || "26 Enrolled Scholars"}</p>
            </InteractiveCard>
            <InteractiveCard className="bg-[#0c1222] border border-white/8 rounded-xl p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Academic Focus</span>
              <p className="text-base font-bold text-[#d4af37] mt-1 truncate" title={content.eligibility}>
                Budget Studies &amp; Governance
              </p>
            </InteractiveCard>
          </div>
        </div>
      )}
    </>
  );

  const anchorId = SECTION_ANCHOR_MAP[section.type];

  // If hero type, HeroReveal already handles its internal animation; otherwise wrap in ScrollReveal
  const renderedContent =
    type === "hero" ? (
      innerContent
    ) : (
      <ScrollReveal
        key={`${section.id}-${section.animation?.entrance || "default"}`}
        animation={section.animation}
      >
        {innerContent}
      </ScrollReveal>
    );

  return (
    <section
      id={section.id}
      onClick={() => isInteractivePreview && onSelectSection?.(section.id)}
      className={cn(
        "relative transition-all duration-300 border-b border-white/8",
        isMinimized ? "py-4 sm:py-5 bg-[#060911]" : spacingCls,
        section.isHidden ? "opacity-40 grayscale" : "opacity-100",
        isInteractivePreview &&
          "cursor-pointer hover:outline hover:outline-2 hover:outline-[var(--site-accent)]/50",
        isSelected && "outline outline-2 outline-[var(--site-accent)] ring-4 ring-[#d4af37]/15 z-10"
      )}
    >
      {/* Invisible anchor for Navbar hash-links with clearance for header and rail */}
      {anchorId && <div id={anchorId} className="absolute -top-32 pointer-events-none" aria-hidden="true" />}

      {/* Interactive Selection Banner for Preview Mode */}
      {isInteractivePreview && isSelected && (
        <div className="absolute top-2 left-4 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--site-accent)] text-[#070a13] shadow-md flex items-center gap-1.5 pointer-events-none">
          <span>Editing: {section.title}</span>
        </div>
      )}

      {isInteractivePreview && section.isHidden && (
        <div className="absolute top-2 right-4 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 pointer-events-none">
          <span>Hidden from Public</span>
        </div>
      )}

      <div className={widthCls}>
        {type !== "hero" && !isInteractivePreview ? (
          <AnimatePresence mode="wait" initial={false}>
            {isMinimized ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASINGS.smoothOut }}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#0a0f1d] to-[#070a13] border border-white/10 hover:border-[#d4af37]/35 transition-all shadow-md group"
              >
                <div className="flex items-center gap-3 truncate">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-[#d4af37] border border-[#d4af37]/20 uppercase shrink-0">
                    {anchorId || section.type}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white/90 truncate">
                    {section.title}
                  </span>
                  <span className="text-[10px] text-white/40 hidden md:inline shrink-0">
                    (Chapter Minimized)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#070a13] bg-[#d4af37] hover:bg-[#edd685] transition-all shadow-sm active:scale-95 shrink-0 ml-3"
                  aria-label={`Expand chapter: ${section.title}`}
                >
                  <Maximize2 size={12} className="stroke-[2.5]" />
                  <span>Expand</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASINGS.smoothOut }}
              >
                {/* Floating Chapter Control Strip */}
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/6 text-xs">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/35 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    <span>Chapter · {section.title}</span>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMinimized(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-white/40 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/6 hover:border-white/12 transition-all select-none group/min"
                    title="Minimize this chapter"
                    aria-label={`Minimize chapter: ${section.title}`}
                  >
                    <Minus size={11} className="text-white/40 group-hover/min:text-[#d4af37]" />
                    <span>Minimize Chapter</span>
                  </button>
                </div>
                {renderedContent}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          renderedContent
        )}
      </div>
    </section>
  );
}
