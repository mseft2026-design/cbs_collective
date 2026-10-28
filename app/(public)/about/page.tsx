import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  ExternalLink,
  Users,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";


import { getAllCmsContent } from "@/lib/cms";

import { institution } from "@/config/institution";

import { FacultyCard } from "@/components/institution/FacultyCard";

import { faculty } from "@/config/faculty";

import {
  UniversityGatewayEmblem,
  NirfUniversityRankEmblem,
  StatePublicRankEmblem,
  TheWorldRankingsEmblem,
  NirfOverallRankEmblem,
  QuantitativeAnalysisEmblem,
  EconometricsModellingEmblem,
  FintechComputationalEmblem,
  StrategicVisionEmblem,
  PublicMissionEmblem,
  IntegrityPillarEmblem,
  OpennessPillarEmblem,
  QualityEducationPillarEmblem,
  SocietalWelfarePillarEmblem,
  FreedomInquiryPillarEmblem,
  ContinuousImprovementPillarEmblem,
  PublicFinanceDomainEmblem,
  StateBudgetsDomainEmblem,
  TaxationGstDomainEmblem,
  QuantitativePolicyDomainEmblem,
} from "@/components/ui/BespokeIcons";

export const metadata: Metadata = {
  title: "About the Centre | Centre for Budget Studies (CBS), CUSAT",
  description:
    "Institutional dossier of the Centre for Budget Studies, established in 2012 by Cochin University of Science and Technology (CUSAT). Vision, mission, CUSAT heritage, flagship M.Sc. programme, and research orientation.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const cms = await getAllCmsContent();
  const { about, vision_mission, programme, research } = cms;
  const cusat = institution.cusat;

  return (
    <div className="space-y-0 selection:bg-[var(--site-accent)] selection:text-[#090d16]">
      {/* ── 1. EDITORIAL MASTHEAD & MONOGRAPH ────────────────────── */}
      <section className="bg-[#070a10] pt-32 pb-20 relative overflow-hidden border-b border-white/8">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-[#1a2d54]/25 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-site relative z-10 max-w-5xl">
          {/* Breadcrumb / Category Tag */}
          <div className="flex items-center gap-2.5 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#d4af37] font-semibold">Institutional Profile &amp; Dossier</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-semibold tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span>CENTRE FOR BUDGET STUDIES · ESTD. 2012 · CUSAT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Pioneering Fiscal Governance &amp; Budgetary Science in India
          </h1>

          <p className="text-base sm:text-xl text-white/70 leading-relaxed font-normal max-w-3xl">
            Established in 2012 by Cochin University of Science and Technology (CUSAT), the Centre for Budget Studies is dedicated to advancing empirical knowledge in budgetary processes, public financial management, and their profound implications for governance.
          </p>

          {/* Quick Monograph Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 mt-10 border-t border-white/10">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/6">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 block">
                Founding Year
              </span>
              <span className="text-2xl font-black text-[#d4af37] font-mono mt-1 block">
                2012
              </span>
              <span className="text-[11px] text-white/60">Established by CUSAT</span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/6">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 block">
                NIRF 2025 Rank
              </span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">
                32nd
              </span>
              <span className="text-[11px] text-white/60">University Category (CUSAT)</span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/6">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 block">
                State Public Rank
              </span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">
                6th
              </span>
              <span className="text-[11px] text-white/60">Among State Public Universities</span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/6">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 block">
                Academic Batch
              </span>
              <span className="text-2xl font-black text-[#d4af37] font-mono mt-1 block">
                2026–2028
              </span>
              <span className="text-[11px] text-white/60">26 Enrolled Scholars</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CHAPTER 1: INSTITUTIONAL ORIGINS & MANDATE ───────── */}
      <section className="section-py bg-[#090d16] border-b border-white/8" id="mandate">
        <div className="container-site max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="section-label">Chapter 01 · Statutory Purpose</span>
                <div className="w-10 h-1 bg-[#d4af37] rounded-full" />
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight pt-1">
                  The Mandate of the Centre for Budget Studies
                </h2>
              </div>

              <p className="text-base text-white/80 leading-relaxed font-normal">
                The Centre for Budget Studies (CBS), established in 2012 by Cochin University of Science and Technology (CUSAT), is a pioneering institution dedicated to studying budgetary processes, fiscal management and their implications for governance in India.
              </p>

              <div className="p-6 rounded-2xl bg-[#0c1222] border border-white/10 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">
                  Addressing Structural Gaps in Indian Governance
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  As one of the few institutions in the country specializing in budget studies, CBS aims to address critical gaps in budgeting practices at the national, state and local levels. From Union fiscal allocations and state-level deficit financing to grassroots panchayat budgeting, CBS examines resource mobilization, public expenditure efficiency, and statutory accountability.
                </p>
              </div>

              <p className="text-sm text-white/70 leading-relaxed font-normal">
                Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement. By fostering an intellectual environment rooted in empirical discipline, CBS equips students and policymakers with the computational tools required to understand and influence modern fiscal decisions.
              </p>

              {/* Quotation / Principle Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#121a2d] to-[#0a0f1d] border-l-4 border-l-[#d4af37] border border-white/10 space-y-3">
                <p className="text-sm sm:text-base font-serif italic text-white/90 leading-relaxed">
                  &ldquo;By fostering a safe environment that encourages freedom of inquiry and continuous improvement, the Centre aims to overcome challenges through strategic planning and innovation, ultimately positioning itself as a leader in budget studies and fiscal governance in India.&rdquo;
                </p>
                <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                  — CBS Institutional Charter &amp; Statement of Purpose
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              {/* Quick Profile Summary Card */}
              <div className="glass-card p-6 border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center">
                  <UniversityGatewayEmblem size={22} />
                </div>
                <h3 className="text-base font-bold text-white">Centre Profile Summary</h3>
                <ul className="space-y-3 text-xs text-white/70">
                  <li className="flex justify-between pb-2 border-b border-white/6">
                    <span className="text-white/40">Established</span>
                    <span className="font-semibold text-white">2012</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-white/6">
                    <span className="text-white/40">Parent University</span>
                    <span className="font-semibold text-white">CUSAT</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-white/6">
                    <span className="text-white/40">Specialization</span>
                    <span className="font-semibold text-white">Budget Studies</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-white/6">
                    <span className="text-white/40">Governance Tiers</span>
                    <span className="font-semibold text-[#d4af37]">National · State · Local</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/40">Flagship Degree</span>
                    <span className="font-semibold text-white">M.Sc. Programme</span>
                  </li>
                </ul>
              </div>

              {/* Scholar Cohort Callout */}
              <div className="glass-card p-6 border-white/10 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37]">
                  Active Cohort
                </span>
                <h3 className="text-base font-bold text-white">Academic Batch 2026–2028</h3>
                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  26 scholars selected through competitive university evaluation, undergoing intensive instruction in quantitative methods, econometrics, and fiscal systems.
                </p>
                <Link
                  href="/#our-batch"
                  className="btn-primary text-xs py-2 px-3.5 inline-flex items-center gap-1.5 mt-2"
                >
                  <span>Meet the 26 Scholars</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CHAPTER 2: CUSAT UNIVERSITY HERITAGE & STANDING ──── */}
      <section className="section-py bg-[#070a10] border-b border-white/8" id="cusat-heritage">
        <div className="container-site max-w-5xl space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="section-label">Chapter 02 · Institutional Anchor</span>
              <div className="w-10 h-1 bg-[#d4af37] rounded-full" />
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Cochin University of Science and Technology (CUSAT)
              </h2>
              <p className="text-base text-white/70 leading-relaxed font-normal">
                The University of Cochin was reconstituted as Cochin University of Science and Technology (CUSAT) in February 1986, with the objective of promoting graduate and postgraduate studies and advanced research in Applied Sciences, Technology, Industry, Commerce, Management and Social Sciences.
              </p>
            </div>

            {/* Official CUSAT Logo */}
            <div className="shrink-0 p-3.5 bg-white rounded-2xl shadow-xl border border-white/20 self-start md:self-center">
              <Image
                src="/images/cusat-logo.jpg"
                alt="Cochin University of Science and Technology (CUSAT) logo"
                width={180}
                height={110}
                className="h-20 sm:h-24 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* CUSAT Accolades & NIRF 2025 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-[#0c1222] border border-[#d4af37]/35 shadow-lg space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                <NirfUniversityRankEmblem size={18} />
              </div>
              <div className="text-3xl font-black text-[#d4af37] font-mono">32nd</div>
              <h4 className="text-sm font-bold text-white">NIRF University Category</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                NIRF India Rankings 2025 by the Ministry of Education.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1222] border border-white/10 shadow-lg space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <StatePublicRankEmblem size={18} />
              </div>
              <div className="text-3xl font-black text-white font-mono">6th</div>
              <h4 className="text-sm font-bold text-white">State Public Universities</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Ranked 6th nationwide among state public universities in India.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1222] border border-white/10 shadow-lg space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <TheWorldRankingsEmblem size={18} />
              </div>
              <div className="text-3xl font-black text-white font-mono">Top 1,500</div>
              <h4 className="text-sm font-bold text-white">THE World Rankings</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Featured globally in Times Higher Education Rankings since 2017 &amp; QS World Rankings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1222] border border-[#a81d34]/40 shadow-lg space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#a81d34]/20 text-[#f87171] flex items-center justify-center">
                <NirfOverallRankEmblem size={18} />
              </div>
              <div className="text-3xl font-black text-white font-mono">50th</div>
              <h4 className="text-sm font-bold text-white">NIRF Overall Category</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Overall national rank encompassing all higher educational institutions in India.
              </p>
            </div>
          </div>

          {/* Research Funding & Recruiter Talent Ecosystem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="p-8 rounded-2xl bg-[#0c1222] border border-white/8 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <PublicFinanceDomainEmblem size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">
                Global Collaborations &amp; Central Research Funding
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-normal">
                The University has established collaborations with reputed universities and institutions worldwide and hosts numerous national and international academic discussions, seminars and workshops every year.
              </p>
              <p className="text-sm text-white/70 leading-relaxed font-normal">
                Its research activities receive support and funding from central government agencies such as UGC, DST, DBT and MHRD, as well as international research partners through various Memoranda of Understanding (MoUs).
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {["UGC", "DST", "DBT", "MHRD", "International MoUs"].map((agency) => (
                  <span
                    key={agency}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/80"
                  >
                    {agency} Supported
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0c1222] border border-white/8 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                  <FintechComputationalEmblem size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Exceptional Talent Pool for Global Recruiters
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-normal">
                  For recruiters, CUSAT provides access to an exceptional talent pool, with a strong record of successful campus placements and graduates equipped with cutting-edge knowledge and industry-ready skills across technology, engineering, commerce and management, prepared to excel in a globally competitive professional environment.
                </p>
              </div>
              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                <a
                  href="https://cusat.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#d4af37] hover:underline font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Visit CUSAT Official University Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CHAPTER 3: THE FLAGSHIP M.SC. PROGRAMME ───────────── */}
      <section className="section-py bg-[#090d16] border-b border-white/8" id="programme">
        <div className="container-site max-w-5xl space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="section-label">Chapter 03 · Academic Architecture</span>
            <div className="w-10 h-1 bg-[#d4af37] rounded-full" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Flagship M.Sc. Programme
            </h2>
            <p className="text-base text-white/70 leading-relaxed font-normal">
              Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement.
            </p>
          </div>

          {/* Three Pedagogical Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-[#0c1222] border border-white/10 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                <QuantitativeAnalysisEmblem size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Quantitative Analysis</h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Advanced mathematical modeling, optimization techniques, and macroeconomic frameworks designed to quantify state and union revenue trajectories, public expenditure priorities, and fiscal health.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#d4af37]">
                Pillar 01 · Mathematical Rigor
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#0c1222] border border-white/10 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <EconometricsModellingEmblem size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Applied Econometrics</h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Empirical evaluation of real-world budget datasets, panel regression, time-series forecasting, and structural equation modeling applied to intergovernmental transfers and tax policy.
              </p>
              <div className="pt-2 text-[11px] font-mono text-blue-400">
                Pillar 02 · Empirical Modeling
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#0c1222] border border-white/10 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <FintechComputationalEmblem size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Financial Technology</h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Modern computational tools, digital public financial management (PFM) architectures, and data-driven FinTech platforms enabling agile, transparent, and auditable budgetary governance.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-400">
                Pillar 03 · Computational FinTech
              </div>
            </div>
          </div>

          {/* Key Programme Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#0c1222] border border-white/8 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                Programme Duration
              </span>
              <p className="text-base font-bold text-white">2 Years (4 Semesters)</p>
              <p className="text-xs text-white/50">Full-time residential postgraduate instruction</p>
            </div>

            <div className="p-6 rounded-xl bg-[#0c1222] border border-white/8 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                Cohort Intake
              </span>
              <p className="text-base font-bold text-white">26 Enrolled Scholars</p>
              <p className="text-xs text-white/50">Academic Batch 2026–2028</p>
            </div>

            <div className="p-6 rounded-xl bg-[#0c1222] border border-white/8 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                Eligibility Standard
              </span>
              <p className="text-base font-bold text-white truncate" title="Quantitative Economics / Mathematics / Commerce">
                Bachelor's with University Evaluation
              </p>
              <p className="text-xs text-white/50">Quantitative Economics, Math, Commerce</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CHAPTER 4: VISION, MISSION & INSTITUTIONAL VALUES ── */}
      <section className="section-py bg-[#070a10] border-b border-white/8" id="vision-values">
        <div className="container-site max-w-5xl space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="section-label">Chapter 04 · Guiding Principles</span>
            <div className="w-10 h-1 bg-[#d4af37] rounded-full" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Vision, Strategic Mission &amp; Core Values
            </h2>
          </div>

          {/* Dual Vision & Mission Statements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#0c1222] border border-[#d4af37]/30 shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                <StrategicVisionEmblem size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Institutional Vision</h3>
              <p className="text-sm text-white/80 leading-relaxed font-normal">
                {vision_mission.vision ||
                  "Its vision is to establish itself as a Centre of Excellence in teaching, research and community outreach within the next decade."}
              </p>
              <div className="pt-2 text-xs font-mono text-[#d4af37]">
                Ten-Year Horizon: Centre of Excellence
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0c1222] border border-[#a81d34]/40 shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#a81d34]/20 text-[#f87171] flex items-center justify-center">
                <PublicMissionEmblem size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Strategic Mission</h3>
              <p className="text-sm text-white/80 leading-relaxed font-normal">
                {vision_mission.mission ||
                  "To achieve this, CBS is committed to academic scholarship, rigorous research and meaningful social engagement while upholding institutional integrity, openness to knowledge and change, quality education and societal welfare. By fostering a safe environment that encourages freedom of inquiry and continuous improvement, the Centre aims to overcome challenges through strategic planning and innovation, ultimately positioning itself as a leader in budget studies and fiscal governance in India."}
              </p>
              <div className="pt-2 text-xs font-mono text-[#f87171]">
                Empirical Scholarship · Societal Welfare
              </div>
            </div>
          </div>

          {/* Five Pillars of Core Commitments */}
          <div className="p-8 rounded-2xl bg-[#0c1222] border border-white/8 space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide">
              Core Commitments Defining CBS Governance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <IntegrityPillarEmblem size={15} className="text-[#d4af37] shrink-0" />
                  <span>Institutional Integrity</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed pl-5 font-normal">
                  Upholding ethical rigor, transparent methodologies, and uncompromised intellectual honesty in all academic analyses.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <OpennessPillarEmblem size={15} className="text-[#d4af37] shrink-0" />
                  <span>Openness to Knowledge &amp; Change</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed pl-5 font-normal">
                  Embracing new economic frameworks, computational paradigms, and evolving fiscal policies across federal and state levels.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <QualityEducationPillarEmblem size={15} className="text-[#d4af37] shrink-0" />
                  <span>Quality Education</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed pl-5 font-normal">
                  Delivering cutting-edge training in quantitative analysis, econometrics, and FinTech to create high-performing economists.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <SocietalWelfarePillarEmblem size={15} className="text-[#d4af37] shrink-0" />
                  <span>Societal Welfare</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed pl-5 font-normal">
                  Anchoring budget analysis in social equity, poverty eradication, public health, education, and human development priorities.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <FreedomInquiryPillarEmblem size={15} className="text-[#d4af37] shrink-0" />
                  <span>Freedom of Inquiry</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed pl-5 font-normal">
                  Fostering a safe, intellectually curious environment that welcomes critical debate, rigorous questioning, and innovative thinking.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <ContinuousImprovementPillarEmblem size={15} className="text-[#d4af37] shrink-0" />
                  <span>Continuous Improvement</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed pl-5 font-normal">
                  Overcoming institutional challenges through deliberate strategic planning, modernization, and evidence-driven development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CHAPTER 5: RESEARCH ORIENTATION & DOMAINS ─────────── */}
      <section className="section-py bg-[#090d16] border-b border-white/8" id="research">
        <div className="container-site max-w-5xl space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="section-label">Chapter 05 · Scholarly Enquiry</span>
            <div className="w-10 h-1 bg-[#d4af37] rounded-full" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Research Orientation &amp; Community Outreach
            </h2>
            <p className="text-base text-white/70 leading-relaxed font-normal">
              Scholarly inquiry at CBS focuses on closing the gap between academic economic models and practical public budgeting across local, state, and national tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {institution.researchAreas.map((area, idx) => (
              <div
                key={area.title}
                className="p-7 rounded-2xl bg-[#0c1222] border border-white/8 space-y-3 hover:border-[#d4af37]/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#d4af37]">
                    <PublicFinanceDomainEmblem size={18} />
                  </div>
                  <span className="text-xs font-mono text-white/30">Domain 0{idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-white pt-1">{area.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CHAPTER 6: FACULTY & INSTITUTIONAL LEADERSHIP ──── */}
      <section className="section-py bg-[#070a10] border-b border-white/8" id="faculty">
        <div className="container-site max-w-5xl space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="section-label">Chapter 06 · Academic Mentorship</span>
            <div className="w-10 h-1 bg-[#d4af37] rounded-full" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Faculty &amp; Institutional Leadership
            </h2>
            <p className="text-base text-white/70 leading-relaxed font-normal">
              Distinguished university leaders, senior professors, and academic mentors guiding the scholars of the Centre for Budget Studies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CHAPTER 7: ACADEMIC BATCH 2026–2028 DIRECTORY ────── */}
      <section className="section-py bg-[#090d16]" id="our-batch">
        <div className="container-site max-w-5xl">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c1222] to-[#070a13] border border-white/10 relative overflow-hidden shadow-2xl space-y-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                Academic Batch 2026–2028
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                The Scholars Behind CBS Collective
              </h2>
              <p className="text-sm text-white/70 leading-relaxed font-normal">
                CBS Collective represents the 26 scholars of Academic Batch 2026–2028. Trained in quantitative analysis, econometrics, and financial technology, these scholars represent the future of evidence-based public economics and fiscal leadership in India.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/8">
              <Link
                href="/#our-batch"
                className="btn-primary text-xs uppercase tracking-wider py-3 px-6 flex items-center gap-2 shadow-lg shadow-[#d4af37]/20"
              >
                <span>View Full Batch Directory (26 Scholars)</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/students"
                className="btn-outline text-xs uppercase tracking-wider py-3 px-6 hover:border-white/30"
              >
                <span>Browse Student Profiles</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
