import React from "react";

interface EmblemProps {
  className?: string;
  size?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. STATS & OVERVIEW EMBLEMS
// ─────────────────────────────────────────────────────────────────────────────

/** Scholars Cohort Emblem — Academic Laurel & Cap */
export function ScholarsCohortEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3L2 7.5L12 12L22 7.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 9.5V15.5C6 17.5 8.686 19.5 12 19.5C15.314 19.5 18 17.5 18 15.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 7.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="22" cy="15.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="7.5" r="1.5" fill="#d4af37" />
    </svg>
  );
}

/** University Gateway Emblem — Classical Architectural Colonnade */
export function UniversityGatewayEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 8.5L12 3L21 8.5V9.5H3V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 20.5H22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M4 17.5H20" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.7" />
      {/* 4 Classical Columns */}
      <path d="M6 9.5V17.5M10 9.5V17.5M14 9.5V17.5M18 9.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="6.2" r="1" fill="#d4af37" />
    </svg>
  );
}

/** Focus Compass Emblem — Fiscal Hexagram & Cardinal Navigation */
export function FocusCompassEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.4" />
      <path d="M12 2.5L14.5 9.5L21.5 12L14.5 14.5L12 21.5L9.5 14.5L2.5 12L9.5 9.5L12 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.5" fill="#d4af37" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CUSAT RANKINGS & REPUTATION (4 DISTINCT EMBLEMS)
// ─────────────────────────────────────────────────────────────────────────────

/** NIRF University Category (32nd) — Laurel Wreath Medallion */
export function NirfUniversityRankEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="10" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Laurel leaves left */}
      <path d="M6 6C5 8 5 11 7 13.5C8 14.5 9.5 15.5 11 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* Laurel leaves right */}
      <path d="M18 6C19 8 19 11 17 13.5C16 14.5 14.5 15.5 13 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* Ribbon tails */}
      <path d="M9.5 15.5L8 21.5L12 19.5L16 21.5L14.5 15.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2" fill="#d4af37" />
    </svg>
  );
}

/** State Public University (6th) — Sovereign State Shield of Excellence */
export function StatePublicRankEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2.5L4 6V12C4 16.8 7.4 20.8 12 22C16.6 20.8 20 16.8 20 12V6L12 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 6.5V17.5" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path d="M8 11.5L12 15L16 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="1.5" fill="#34d399" />
    </svg>
  );
}

/** THE World Rankings (Top 1500) — Celestial Armillary Meridian Sphere */
export function TheWorldRankingsEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4.5 7H19.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.5" />
      <path d="M4.5 17H19.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.5" />
      <circle cx="12" cy="12" r="1.5" fill="#60a5fa" />
    </svg>
  );
}

/** NIRF Overall Rank (50th) — Ascending Academic Obelisk / Milestone */
export function NirfOverallRankEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L8.5 7.5H15.5L12 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 7.5L7.5 21H16.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 21H19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M10 12H14" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <path d="M9.5 16H14.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <polygon points="12,3.5 11,5.5 13,5.5" fill="#f87171" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CURRICULUM & PROGRAMME PILLARS
// ─────────────────────────────────────────────────────────────────────────────

/** Quantitative Analysis Emblem — Bell Curve & Coordinates */
export function QuantitativeAnalysisEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Coordinate axes */}
      <path d="M3 20H21M3 20V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Gaussian Normal Curve */}
      <path d="M4 19C7 19 8 16 10 10C11.5 5.5 12.5 5.5 14 10C16 16 17 19 20 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      {/* Sigma mean point */}
      <circle cx="12" cy="7" r="1.8" fill="#d4af37" />
    </svg>
  );
}

/** Econometrics Modelling Emblem — Regression Vectors & Matrix */
export function EconometricsModellingEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      {/* Scatter plot points */}
      <circle cx="7" cy="16" r="1.5" fill="#60a5fa" />
      <circle cx="10" cy="14" r="1.5" fill="#60a5fa" />
      <circle cx="14" cy="9" r="1.5" fill="#60a5fa" />
      <circle cx="17" cy="7" r="1.5" fill="#60a5fa" />
      {/* Best-fit regression line */}
      <path d="M5 18L19 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/** FinTech & Computational Analytics Emblem — Cryptographic Lattice */
export function FintechComputationalEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 21,7.5 21,16.5 12,22 3,16.5 3,7.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <line x1="3" y1="7.5" x2="21" y2="16.5" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <line x1="3" y1="16.5" x2="21" y2="7.5" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <circle cx="12" cy="12" r="2.5" fill="#34d399" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. RESEARCH DOMAINS (4 BESPOKE ICONS)
// ─────────────────────────────────────────────────────────────────────────────

/** Domain 1: Public Finance & Fiscal Federalism — Treasury Vault Crest */
export function PublicFinanceDomainEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      <path d="M12 3V7M12 17V21M3 12H7M17 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#d4af37" />
    </svg>
  );
}

/** Domain 2: State Budgeting & Deficit Management — Balance Ledger Scales */
export function StateBudgetsDomainEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3V20M8 20H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Beam */}
      <path d="M4 7L12 5L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Left pan */}
      <path d="M4 7L2 13H6L4 7Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Right pan */}
      <path d="M20 7L18 13H22L20 7Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="12" cy="5" r="1.5" fill="#38bdf8" />
    </svg>
  );
}

/** Domain 3: Taxation, Revenue & GST Analysis — Fiscal Matrix Pyramid */
export function TaxationGstDomainEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 2,20 22,20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="6" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <line x1="9" y1="7.5" x2="15" y2="7.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <circle cx="12" cy="16.5" r="1.5" fill="#fbbf24" />
    </svg>
  );
}

/** Domain 4: Quantitative Economics & Policy Evaluation — Radar Diagnostic Node */
export function QuantitativePolicyDomainEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,3 20,8 18,18 6,18 4,8" stroke="currentColor" strokeWidth="1.3" opacity="0.4" />
      <polygon points="12,7 17,10 15,16 9,16 7,10" stroke="currentColor" strokeWidth="1.5" fill="rgba(212,175,55,0.15)" strokeLinejoin="round" />
      <line x1="12" y1="3" x2="12" y2="18" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <circle cx="12" cy="7" r="1.5" fill="#d4af37" />
      <circle cx="17" cy="10" r="1.5" fill="#d4af37" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. STRATEGIC VISION & CIVIC MISSION
// ─────────────────────────────────────────────────────────────────────────────

/** Radiant Beacon of Academic Vision */
export function StrategicVisionEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#d4af37" />
    </svg>
  );
}

/** Quadrant Compass of Civic Governance */
export function PublicMissionEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      <path d="M12 6L14 10L18 12L14 14L12 18L10 14L6 12L10 10L12 6Z" fill="#a81d34" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. SIX PILLARS OF CBS COMMITMENT (REPLACING REPEATED CHECKCIRCLES)
// ─────────────────────────────────────────────────────────────────────────────

/** Pillar 1: Institutional Integrity — Scales of Ethical Rigour */
export function IntegrityPillarEmblem({ className = "w-5 h-5", size = 20 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M10 2V17M6 17H14M3 6L10 4L17 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3 6L1 11H5L3 6ZM17 6L15 11H19L17 6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="10" cy="4" r="1.2" fill="#d4af37" />
    </svg>
  );
}

/** Pillar 2: Openness to Knowledge — Refracting Prism */
export function OpennessPillarEmblem({ className = "w-5 h-5", size = 20 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <polygon points="10,3 3,16 17,16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M2 11H6.5L8.5 7.5" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <path d="M11 9L18 7M12 11L18 11M13 13L18 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Pillar 3: Quality Education — Scholarly Folio & Ribbon */
export function QualityEducationPillarEmblem({ className = "w-5 h-5", size = 20 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 5.5C3 4.4 3.9 3.5 5 3.5H16C16.6 3.5 17 3.9 17 4.5V15C17 15.6 16.6 16 16 16H5C3.9 16 3 15.1 3 14V5.5Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 13.5H17" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <path d="M7 6.5H13M7 9.5H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="14" cy="9.5" r="1.2" fill="#d4af37" />
    </svg>
  );
}

/** Pillar 4: Societal Welfare — Civic Heraldic Shield of Equity */
export function SocietalWelfarePillarEmblem({ className = "w-5 h-5", size = 20 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M10 2L3 5V10C3 14 6 17.5 10 18.5C14 17.5 17 14 17 10V5L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 10C7 8.3 8.3 7 10 7C11.7 7 13 8.3 13 10C13 12 10 14 10 14C10 14 7 12 7 10Z" fill="rgba(212,175,55,0.25)" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Pillar 5: Freedom of Inquiry — Eternal Torch of Academic Liberty */
export function FreedomInquiryPillarEmblem({ className = "w-5 h-5", size = 20 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      {/* Handle */}
      <path d="M8 12L7 18H13L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      {/* Bowl */}
      <path d="M6 11H14L13 13H7L6 11Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Flame */}
      <path d="M10 2C8.5 4 8 6 9.5 8C10 6 11.5 5 12 3C13.5 5 14 7.5 12.5 9.5C11.5 11 10 11 10 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="rgba(245,158,11,0.2)" />
    </svg>
  );
}

/** Pillar 6: Continuous Improvement — Ascending Evolution Helix */
export function ContinuousImprovementPillarEmblem({ className = "w-5 h-5", size = 20 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 15L8 10L12 14L17 5M17 5H12M17 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="3" cy="15" r="1.5" fill="#34d399" />
      <circle cx="8" cy="10" r="1.5" fill="#34d399" />
      <circle cx="12" cy="14" r="1.5" fill="#34d399" />
      <circle cx="17" cy="5" r="1.5" fill="#d4af37" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. INSTITUTIONAL MILESTONES (3 DISTINCT EPOCH EMBLEMS)
// ─────────────────────────────────────────────────────────────────────────────

/** Milestone 1: Foundation Genesis (2012) — Cornerstone Monolith */
export function Milestone2012GenesisEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 21,7 12,12 3,7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="3,7 12,12 12,22 3,17" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="21,7 12,12 12,22 21,17" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="1.5" fill="#d4af37" />
    </svg>
  );
}

/** Milestone 2: Global Standing (2017) — Global Horizon Charter */
export function Milestone2017GlobalEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 12C6 14 18 14 21.5 12" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <path d="M12 3C15 6 15 18 12 21" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <polygon points="12,5 14,9 18,10 15,13 16,17 12,15 8,17 9,13 6,10 10,9" fill="rgba(96,165,250,0.3)" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Milestone 3: Academic Pinnacle (2025) — State & National Summit Medallion */
export function Milestone2025PinnacleEmblem({ className = "w-6 h-6", size = 24 }: EmblemProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Outer crown rim */}
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2" />
      <polygon points="12,4 15,8 19,8 16,12 18,16 13,15 12,20 11,15 6,16 8,12 5,8 9,8" stroke="currentColor" strokeWidth="1.4" fill="rgba(212,175,55,0.2)" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" fill="#d4af37" />
    </svg>
  );
}
