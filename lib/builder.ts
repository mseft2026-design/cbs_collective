import {
  SectionType,
  SectionInstance,
  SectionLibraryItem,
  SectionLayoutSettings,
  SectionAnimationSettings,
  EntranceAnimation,
  AnimationDuration,
  AnimationDelay,
  AnimationTrigger,
  InteractionEffect,
  MotionIntensity,
  PageSectionsConfig,
  ContentWidth,
  SpacingPreset,
  HorizontalAlign,
  HeadingSize,
} from "@/types/builder";
import { DEFAULT_CMS_CONTENT } from "@/lib/cms";

export const DEFAULT_LAYOUT_SETTINGS: SectionLayoutSettings = {
  horizontalAlign: "left",
  verticalAlign: "center",
  contentWidth: "wide",
  layoutPreset: "single-column",
  spacing: "comfortable",
  headingSize: "large",
  showEyebrow: true,
  mobileStackReverse: false,
  mobileTextCenter: false,
};

export const DEFAULT_ANIMATION_SETTINGS: SectionAnimationSettings = {
  entrance: "fade-up",
  duration: "normal",
  delay: "none",
  trigger: "scroll",
  interaction: "subtle-lift",
  intensity: "balanced",
  disabled: false,
};

export const SECTION_LIBRARY: SectionLibraryItem[] = [
  {
    type: "hero",
    name: "Hero / Executive Welcome",
    description: "Two-column editorial header with headline, narrative, action buttons, and empirical briefing visual.",
    category: "Core",
    isSingleton: true,
    defaultTitle: "Hero & Welcome",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "hero-executive",
      contentWidth: "wide",
      spacing: "spacious",
    },
    defaultContent: {
      eyebrow: "CENTRE FOR BUDGET STUDIES · CUSAT",
      title: "Pioneering Budget Studies & Fiscal Governance",
      titleHighlight: "CBS Collective · Batch 2026–2028",
      description: "The Centre for Budget Studies (CBS), established in 2012 by Cochin University of Science and Technology (CUSAT), is a pioneering institution dedicated to studying budgetary processes, fiscal management and their implications for governance in India.",
      primaryBtnText: "Meet Our Scholars",
      primaryBtnLink: "#our-batch",
      secondaryBtnText: "Discover CBS",
      secondaryBtnLink: "/about",
      batchLabel: "Batch 2026–2028",
      enrolledCount: "26 Enrolled Scholars",
      location: "Kalamassery, Kochi",
    },
  },
  {
    type: "stats",
    name: "Key Statistics / Metrics Band",
    description: "High-impact 3-card metrics highlighting scholars, university foundation, and focus domains.",
    category: "Core",
    defaultTitle: "Key Institutional Metrics",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "three-column-cards",
      contentWidth: "wide",
      spacing: "compact",
    },
    defaultContent: {
      stat1Value: "26",
      stat1Label: "Scholars",
      stat1Desc: "Academic Batch 2026–2028 enrolled in the flagship M.Sc. programme.",
      stat2Value: "NIRF 32",
      stat2Label: "University Category",
      stat2Desc: "CUSAT ranked 32nd in university category and 6th among state public universities in India (NIRF 2025).",
      stat3Value: "2012",
      stat3Label: "CBS Established",
      stat3Desc: "Pioneering institution dedicated to budget studies, fiscal management, and public governance.",
    },
  },
  {
    type: "about",
    name: "About the Centre",
    description: "Editorial narrative presenting institutional background, statutory purpose, and CUSAT governance.",
    category: "Institutional",
    isSingleton: true,
    defaultTitle: "About the Centre",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "two-column-split",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    defaultContent: {
      eyebrow: "Institutional Mandate",
      title: "Advancing Fiscal Governance & Budgetary Science",
      description: "As one of the few institutions in India specializing in budget studies, CBS addresses critical gaps in budgeting practices across national, state, and local governance levels.",
      paragraph1: "The Centre for Budget Studies (CBS), established in 2012 by Cochin University of Science and Technology (CUSAT), is a pioneering institution dedicated to studying budgetary processes, fiscal management and their implications for governance in India. As one of the few institutions in the country specializing in budget studies, CBS aims to address gaps in budgeting practices at the national, state and local levels.",
      paragraph2: "Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement. Its vision is to establish itself as a Centre of Excellence in teaching, research and community outreach within the next decade.",
      sidebarTitle: "CUSAT Institutional Foundation",
      sidebarText: "Operating under Cochin University of Science and Technology (reconstituted Feb 1986), NIRF 32nd ranked university with top 1,500 THE world ranking.",
      sidebarLinkText: "Learn More on About Page",
      sidebarLinkUrl: "/about",
    },
  },
  {
    type: "cusat",
    name: "CUSAT Institutional Profile",
    description: "CUSAT's university legacy, NIRF 2025 rankings, global ranking inclusion, research funding, and placement strengths.",
    category: "Institutional",
    isSingleton: true,
    defaultTitle: "CUSAT Heritage & Global Standing",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "two-column-split",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    defaultContent: {
      eyebrow: "Parent University Heritage",
      title: "Cochin University of Science and Technology",
      description: "Reconstituted in February 1986 to promote graduate and postgraduate studies and advanced research across applied sciences, technology, industry, commerce, management, and social sciences.",
      statRank1: "32nd",
      statRank1Label: "NIRF University Rank",
      statRank2: "6th",
      statRank2Label: "State Public Universities",
      statRank3: "50th",
      statRank3Label: "NIRF Overall Rank",
      statRank4: "Top 1,500",
      statRank4Label: "THE World Rankings",
      fundingAgencies: "UGC · DST · DBT · MHRD",
    },
  },
  {
    type: "vision_mission",
    name: "Vision & Strategic Mission",
    description: "Dual statement cards with core strategic pillars for institutional advancement.",
    category: "Institutional",
    isSingleton: true,
    defaultTitle: "Vision & Mission",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "two-column-split",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    defaultContent: {
      eyebrow: "Guiding Principles",
      title: "Vision & Strategic Mission",
      vision: "To establish itself as a Centre of Excellence in teaching, research and community outreach within the next decade, positioning itself as a leader in budget studies and fiscal governance in India.",
      mission: "CBS is committed to academic scholarship, rigorous research and meaningful social engagement while upholding institutional integrity, openness to knowledge and change, quality education and societal welfare. By fostering a safe environment that encourages freedom of inquiry and continuous improvement, the Centre aims to overcome challenges through strategic planning and innovation, ultimately positioning itself as a leader in budget studies and fiscal governance in India.",
      pillar1Title: "Academic Scholarship & Rigor",
      pillar1Desc: "Rigorous empirical research in quantitative analysis, econometrics, and financial technology.",
      pillar2Title: "Social Engagement & Welfare",
      pillar2Desc: "Meaningful community outreach, public policy advisory, and participatory budgeting governance.",
      pillar3Title: "Freedom of Inquiry & Integrity",
      pillar3Desc: "Upholding institutional integrity, openness to knowledge, and continuous academic improvement.",
    },
  },
  {
    type: "programme",
    name: "Academic Programme",
    description: "Postgraduate degree specifications including intake, duration, eligibility, and core competencies.",
    category: "Academic",
    isSingleton: true,
    defaultTitle: "Academic Programme Overview",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "single-column",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    defaultContent: {
      eyebrow: "Flagship Postgraduate Program",
      degreeName: "M.Sc. Budget Studies",
      description: "Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement.",
      duration: "2 Years (4 Semesters)",
      intake: "26 Enrolled Scholars",
      eligibility: "Bachelor's degree with university entrance qualification in Quantitative Economics, Mathematics, Commerce, or allied disciplines.",
    },
  },
  {
    type: "curriculum",
    name: "Curriculum Scheme (4 Semesters)",
    description: "Detailed semester module breakdowns with course codes, credit weightages, and core subjects.",
    category: "Academic",
    isSingleton: true,
    defaultTitle: "Curriculum & Semesters",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "two-column-split",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    defaultContent: {
      eyebrow: "Academic Scheme",
      title: "Four-Semester Course Structure",
      description: "Structured academic roadmap covering theoretical foundations, empirical techniques, and state budgeting practicums.",
    },
  },
  {
    type: "milestones",
    name: "Achievements & Milestones",
    description: "Timeline cards highlighting Centre accomplishments, government engagements, and research outputs.",
    category: "Institutional",
    defaultTitle: "Achievements & Milestones",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "three-column-cards",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    defaultContent: {
      eyebrow: "Milestones & Impact",
      title: "Institutional Milestones & Legacy",
      description: "Key milestones in policy advisement, budget symposia, and academic research.",
    },
  },
  {
    type: "research",
    name: "Research & Focus Areas",
    description: "4-column domain cards spotlighting state finance, econometrics, public expenditure, and taxation.",
    category: "Academic",
    defaultTitle: "Research Focus Areas",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "four-column-cards",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    defaultContent: {
      eyebrow: "Research Domains",
      title: "Research Focus & Specialisations",
      description: "Key focus areas guiding empirical enquiry and student research thesis projects.",
    },
  },
  {
    type: "faculty",
    name: "Faculty & Mentorship",
    description: "Profiles of faculty members, advisors, and mentors with designations and specialisations.",
    category: "Institutional",
    defaultTitle: "Faculty & Mentors",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "three-column-cards",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    defaultContent: {
      eyebrow: "Mentorship",
      title: "Faculty & Academic Mentors",
      description: "Distinguished academic staff and mentors guiding the 2026–2028 batch scholars.",
    },
  },
  {
    type: "students",
    name: "Scholar Batch Directory (26 Students)",
    description: "Interactive directory with live search, specialisation filter chips, 1:1 square photo cards, and CV download.",
    category: "Directory",
    isSingleton: true,
    defaultTitle: "Scholar Batch 2026–2028 Directory",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "single-column",
      contentWidth: "wide",
      spacing: "spacious",
    },
    defaultContent: {
      eyebrow: "Academic Batch 2026–2028",
      title: "Our Batch",
      description: "Meet all scholars in Academic Batch 2026–2028 at the Centre for Budget Studies. Browse specialisations, backgrounds, and access verified CVs.",
    },
  },
  {
    type: "cta",
    name: "Call to Action / Invitation",
    description: "Prominent conversion band inviting research collaborations, inquiries, or directory exploration.",
    category: "Content",
    defaultTitle: "Call to Action",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "single-column",
      contentWidth: "standard",
      spacing: "comfortable",
      horizontalAlign: "center",
    },
    defaultContent: {
      eyebrow: "Collaborate With Us",
      title: "Connect with the Centre for Budget Studies",
      description: "Explore opportunities for collaborative economic research, student placements, and public policy symposiums.",
      primaryBtnText: "Explore Scholar Profiles",
      primaryBtnLink: "#our-batch",
      secondaryBtnText: "Contact the Centre",
      secondaryBtnLink: "mailto:cbs@cusat.ac.in",
    },
  },
  {
    type: "editorial",
    name: "Rich Text / Editorial Story",
    description: "Clean single-column longform editorial block for special announcements or institutional reports.",
    category: "Content",
    defaultTitle: "Editorial Feature",
    defaultLayout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "single-column",
      contentWidth: "standard",
      spacing: "comfortable",
    },
    defaultContent: {
      eyebrow: "Special Feature",
      title: "Fiscal Governance in the Modern Economy",
      bodyText: "State-level budgetary governance requires a balance between revenue mobilisation, social sector allocation, and capital infrastructure investment. The Centre for Budget Studies undertakes critical evaluation of expenditure trends to provide data-backed insights for academic and public discourse.",
    },
  },
];

// Initial baseline sections for new page config
export const INITIAL_SECTIONS: SectionInstance[] = [
  {
    id: "sec-hero",
    type: "hero",
    title: "Executive Hero & Briefing",
    order: 0,
    isHidden: false,
    isDeleted: false,
    isProtected: true,
    layout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "hero-executive",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    content: {
      eyebrow: "CENTRE FOR BUDGET STUDIES · CUSAT",
      title: "Pioneering Budget Studies & Fiscal Governance",
      titleHighlight: "CBS Collective · Batch 2026–2028",
      description: "The Centre for Budget Studies (CBS), established in 2012 by Cochin University of Science and Technology (CUSAT), is a pioneering institution dedicated to studying budgetary processes, fiscal management and their implications for governance in India.",
      primaryBtnText: "Meet Our Scholars",
      primaryBtnLink: "#our-batch",
      secondaryBtnText: "Discover CBS",
      secondaryBtnLink: "/about",
      batchLabel: "Batch 2026–2028",
      enrolledCount: "26 Enrolled Scholars",
      location: "Kalamassery, Kochi",
    },
  },
  {
    id: "sec-stats",
    type: "stats",
    title: "Key Metrics & Statistics",
    order: 1,
    isHidden: false,
    isDeleted: false,
    layout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "three-column-cards",
      contentWidth: "wide",
      spacing: "compact",
    },
    content: {
      stat1Value: "26",
      stat1Label: "Scholars",
      stat1Desc: "Academic Batch 2026–2028 enrolled in the flagship M.Sc. programme.",
      stat2Value: "NIRF 32",
      stat2Label: "University Category",
      stat2Desc: "CUSAT ranked 32nd in university category and 6th among state public universities in India (NIRF 2025).",
      stat3Value: "2012",
      stat3Label: "CBS Established",
      stat3Desc: "Pioneering institution dedicated to budget studies, fiscal management, and public governance.",
    },
  },
  {
    id: "sec-about",
    type: "about",
    title: "About the Centre",
    order: 2,
    isHidden: false,
    isDeleted: false,
    layout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "two-column-split",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    content: {
      eyebrow: "Institutional Mandate",
      title: "Advancing Fiscal Governance & Budgetary Science",
      description: "As one of the few institutions in India specializing in budget studies, CBS addresses critical gaps in budgeting practices across national, state, and local governance levels.",
      paragraph1: "The Centre for Budget Studies (CBS), established in 2012 by Cochin University of Science and Technology (CUSAT), is a pioneering institution dedicated to studying budgetary processes, fiscal management and their implications for governance in India. As one of the few institutions in the country specializing in budget studies, CBS aims to address gaps in budgeting practices at the national, state and local levels.",
      paragraph2: "Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement. Its vision is to establish itself as a Centre of Excellence in teaching, research and community outreach within the next decade.",
      sidebarTitle: "CUSAT Institutional Foundation",
      sidebarText: "Operating under Cochin University of Science and Technology (reconstituted Feb 1986), NIRF 32nd ranked university with top 1,500 THE world ranking.",
      sidebarLinkText: "Learn More on About Page",
      sidebarLinkUrl: "/about",
    },
  },
  {
    id: "sec-cusat",
    type: "cusat",
    title: "CUSAT University Heritage & Standing",
    order: 3,
    isHidden: false,
    isDeleted: false,
    layout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "two-column-split",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    content: {
      eyebrow: "Parent University Heritage",
      title: "Cochin University of Science and Technology",
      description: "Reconstituted in February 1986 to promote graduate and postgraduate studies and advanced research across applied sciences, technology, industry, commerce, management, and social sciences.",
      statRank1: "32nd",
      statRank1Label: "NIRF University Rank",
      statRank2: "6th",
      statRank2Label: "State Public Universities",
      statRank3: "50th",
      statRank3Label: "NIRF Overall Rank",
      statRank4: "Top 1,500",
      statRank4Label: "THE World Rankings",
      fundingAgencies: "UGC · DST · DBT · MHRD",
    },
  },
  {
    id: "sec-programme",
    type: "programme",
    title: "Flagship M.Sc. Programme",
    order: 4,
    isHidden: false,
    isDeleted: false,
    layout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "single-column",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    content: {
      eyebrow: "Flagship Postgraduate Program",
      degreeName: "M.Sc. Budget Studies",
      description: "Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement.",
      duration: "2 Years (4 Semesters)",
      intake: "26 Enrolled Scholars",
      eligibility: "Bachelor's degree with university entrance qualification in Quantitative Economics, Mathematics, Commerce, or allied disciplines.",
    },
  },
  {
    id: "sec-research",
    type: "research",
    title: "Research Focus Domains",
    order: 5,
    isHidden: false,
    isDeleted: false,
    layout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "four-column-cards",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    content: {
      eyebrow: "Research Domains",
      title: "Research Focus & Specialisations",
      description: "Key focus areas guiding empirical enquiry and student research thesis projects.",
    },
  },
  {
    id: "sec-vision-mission",
    type: "vision_mission",
    title: "Vision & Strategic Mission",
    order: 6,
    isHidden: false,
    isDeleted: false,
    layout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "two-column-split",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    content: {
      eyebrow: "Guiding Principles",
      title: "Vision & Strategic Mission",
      vision: "To establish itself as a Centre of Excellence in teaching, research and community outreach within the next decade, positioning itself as a leader in budget studies and fiscal governance in India.",
      mission: "CBS is committed to academic scholarship, rigorous research and meaningful social engagement while upholding institutional integrity, openness to knowledge and change, quality education and societal welfare. By fostering a safe environment that encourages freedom of inquiry and continuous improvement, the Centre aims to overcome challenges through strategic planning and innovation, ultimately positioning itself as a leader in budget studies and fiscal governance in India.",
    },
  },
  {
    id: "sec-milestones",
    type: "milestones",
    title: "Achievements & Milestones",
    order: 7,
    isHidden: false,
    isDeleted: false,
    layout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "three-column-cards",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    content: {
      eyebrow: "Milestones & Impact",
      title: "Institutional Milestones & Legacy",
      description: "Foundational moments defining CUSAT's legacy and the pioneering journey of CBS.",
    },
  },
  {
    id: "sec-faculty",
    type: "faculty",
    title: "Academic Leadership & Mentorship",
    order: 8,
    isHidden: false,
    isDeleted: false,
    layout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "three-column-cards",
      contentWidth: "wide",
      spacing: "comfortable",
    },
    content: {
      eyebrow: "Academic Mentorship",
      title: "Faculty & Institutional Leadership",
      description: "Distinguished university leaders, senior professors, and research mentors guiding the Academic Batch 2026–2028.",
    },
  },
  {
    id: "sec-students",
    type: "students",
    title: "Our Batch (26 Scholars Directory)",
    order: 9,
    isHidden: false,
    isDeleted: false,
    isProtected: true,
    layout: {
      ...DEFAULT_LAYOUT_SETTINGS,
      layoutPreset: "single-column",
      contentWidth: "wide",
      spacing: "spacious",
    },
    content: {
      eyebrow: "Academic Batch 2026–2028",
      title: "Our Batch",
      description: "Meet all 26 scholars in Academic Batch 2026–2028 at the Centre for Budget Studies. Browse specialisations, backgrounds, and access verified CVs.",
    },
  },
];

export const INITIAL_PAGE_CONFIG: PageSectionsConfig = {
  version: 1,
  status: "published",
  updated_at: new Date().toISOString(),
  showHeader: true,
  showFooter: true,
  sections: INITIAL_SECTIONS,
  trash: [],
};

// ── UTILITY FUNCTIONS FOR CSS CLASSES ────────────────────────────────────────

export function getWidthClass(width?: ContentWidth): string {
  switch (width) {
    case "narrow":
      return "max-w-4xl mx-auto px-4 sm:px-6";
    case "standard":
      return "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8";
    case "full":
      return "w-full px-4 sm:px-6 lg:px-10";
    case "wide":
    default:
      return "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  }
}

export function getSpacingClass(spacing?: SpacingPreset): string {
  switch (spacing) {
    case "compact":
      return "py-10 sm:py-14";
    case "spacious":
      return "py-24 sm:py-32";
    case "comfortable":
    default:
      return "py-16 sm:py-24";
  }
}

export function getTextAlignClass(align?: HorizontalAlign): string {
  switch (align) {
    case "center":
      return "text-center mx-auto";
    case "right":
      return "text-right ml-auto";
    case "left":
    default:
      return "text-left";
  }
}

export function getHeadingSizeClass(size?: HeadingSize): string {
  switch (size) {
    case "medium":
      return "text-2xl sm:text-3xl lg:text-4xl";
    case "extra-large":
      return "text-4xl sm:text-6xl lg:text-7xl";
    case "large":
    default:
      return "text-3xl sm:text-4xl lg:text-5xl";
  }
}

export function getAnimationDurationSec(duration?: AnimationDuration): number {
  switch (duration) {
    case "short":
      return 0.35;
    case "slow":
      return 0.8;
    case "normal":
    default:
      return 0.55;
  }
}

export function getAnimationDelaySec(delay?: AnimationDelay): number {
  switch (delay) {
    case "short":
      return 0.15;
    case "staggered":
      return 0.3;
    case "none":
    default:
      return 0;
  }
}

export function getInteractionClass(interaction?: InteractionEffect): string {
  switch (interaction) {
    case "subtle-lift":
      return "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--site-accent)]/10";
    case "image-zoom":
      return "group transition-all duration-300";
    case "soft-glow":
      return "transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--site-accent)]/20 hover:border-[var(--site-accent)]/50";
    case "border-highlight":
      return "transition-all duration-300 hover:border-[var(--site-accent)]";
    case "none":
    default:
      return "";
  }
}
