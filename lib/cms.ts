import {
  SectionKey,
  SectionContentMap,
  SectionMeta,
  HeroContent,
  AboutContent,
  VisionMissionContent,
  AchievementsContent,
  ProgrammeContent,
  CurriculumContent,
  ResearchContent,
  FacultyContent,
  AnnouncementContent,
  FooterContent,
} from "@/types/cms";
import { institution } from "@/config/institution";
import { faculty } from "@/config/faculty";
import { curriculum } from "@/config/curriculum";
import { createClient } from "@/lib/supabase/server";

export const CMS_SECTIONS: SectionMeta[] = [
  {
    key: "hero",
    name: "Hero Section",
    description: "Main banner, headline, tagline, and call to action",
    iconName: "Sparkles",
  },
  {
    key: "about",
    name: "About Centre",
    description: "Institutional overview, description, and key statistics",
    iconName: "Building2",
  },
  {
    key: "vision_mission",
    name: "Vision & Mission",
    description: "Core statements and institutional pillars",
    iconName: "Compass",
  },
  {
    key: "achievements",
    name: "Achievements & Milestones",
    description: "Historical timeline of Centre accomplishments",
    iconName: "Trophy",
  },
  {
    key: "programme",
    name: "Academic Programme",
    description: "Degree details, intake, eligibility, and outcomes",
    iconName: "GraduationCap",
  },
  {
    key: "curriculum",
    name: "Curriculum & Semesters",
    description: "Semester breakdown and course modules",
    iconName: "BookOpenCheck",
  },
  {
    key: "research",
    name: "Research Activities",
    description: "Key focus areas, initiatives, and publications",
    iconName: "Microscope",
  },
  {
    key: "faculty",
    name: "Faculty Profiles",
    description: "Academic staff, specialisations, and credentials",
    iconName: "Users",
  },
  {
    key: "announcements",
    name: "Announcements Banner",
    description: "Notice bar for events, admissions, and alerts",
    iconName: "Megaphone",
  },
  {
    key: "footer",
    name: "Footer & Official Info",
    description: "Official address, contact details, and links",
    iconName: "Footprints",
  },
];

export const DEFAULT_CMS_CONTENT: SectionContentMap = {
  hero: {
    badge: "Academic Batch 2026–2028",
    title: "Pioneering Budget Studies & Fiscal Governance",
    titleHighlight: "CBS Collective · Batch 2026–2028",
    subtitle: "Cochin University of Science and Technology (CUSAT)",
    description:
      "The Centre for Budget Studies (CBS), established in 2012 by Cochin University of Science and Technology (CUSAT), is a pioneering institution dedicated to studying budgetary processes, fiscal management and their implications for governance in India.",
    bgImageUrl: "",
    overlayOpacity: 70,
    primaryBtnText: "Meet Our Scholars",
    primaryBtnLink: "#our-batch",
    secondaryBtnText: "Discover CBS",
    secondaryBtnLink: "/about",
  },
  about: {
    badge: "Institutional Mandate",
    title: "Advancing Fiscal Governance & Budgetary Science",
    description:
      "As one of the few institutions in India specializing in budget studies, CBS addresses critical gaps in budgeting practices across national, state, and local governance levels.",
    paragraphs: [
      "The Centre for Budget Studies (CBS), established in 2012 by Cochin University of Science and Technology (CUSAT), is a pioneering institution dedicated to studying budgetary processes, fiscal management and their implications for governance in India. As one of the few institutions in the country specializing in budget studies, CBS aims to address gaps in budgeting practices at the national, state and local levels.",
      "Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement. Its vision is to establish itself as a Centre of Excellence in teaching, research and community outreach within the next decade.",
      "Cochin University of Science and Technology (CUSAT) was reconstituted in February 1986 to promote advanced research across applied sciences, technology, commerce, and social sciences. In the NIRF India Rankings 2025, CUSAT secured the 32nd rank in the university category, 50th in the overall category and 6th among state public universities, featured among the top 1,500 universities globally in Times Higher Education World University Rankings.",
    ],
    stats: [
      { label: "Cohort Scholars", value: "26", helper: "Batch 2026–2028" },
      { label: "Established", value: "2012", helper: "Pioneering Centre at CUSAT" },
      { label: "NIRF University", value: "32nd", helper: "6th State Public University" },
      { label: "Global Standing", value: "Top 1500", helper: "THE World University Rankings" },
    ],
  },
  vision_mission: {
    badge: "Guiding Principles",
    title: "Vision & Strategic Mission",
    vision:
      "To establish itself as a Centre of Excellence in teaching, research and community outreach within the next decade, positioning itself as a leader in budget studies and fiscal governance in India.",
    mission:
      "CBS is committed to academic scholarship, rigorous research and meaningful social engagement while upholding institutional integrity, openness to knowledge and change, quality education and societal welfare. By fostering a safe environment that encourages freedom of inquiry and continuous improvement, the Centre aims to overcome challenges through strategic planning and innovation, ultimately positioning itself as a leader in budget studies and fiscal governance in India.",
    pillars: [
      {
        title: "Centre of Excellence",
        description:
          "Establishing CBS as a national leader in teaching, research, and community outreach within the next decade.",
      },
      {
        title: "Quantitative & FinTech Rigor",
        description:
          "Providing advanced training in quantitative analysis, econometrics, and financial technology for public finance.",
      },
      {
        title: "Societal Welfare & Integrity",
        description:
          "Upholding institutional integrity, openness to knowledge, freedom of inquiry, quality education, and societal welfare.",
      },
    ],
  },
  achievements: {
    badge: "Milestones",
    title: "Institutional Milestones & Impact",
    description: "Foundational moments defining CUSAT's legacy and the pioneering journey of CBS.",
    items: institution.achievements,
  },
  programme: {
    badge: "Academic Excellence",
    title: "Flagship Postgraduate Programme",
    degreeName: "M.Sc. Budget Studies",
    duration: "2 Years (4 Semesters)",
    intake: "26 Scholars (Academic Batch 2026–2028)",
    eligibility:
      "Bachelor's degree with university qualification in Quantitative Economics, Mathematics, Commerce, or allied disciplines.",
    description:
      "Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement.",
    learningOutcomes: institution.programmeObjectives,
  },
  curriculum: {
    badge: "Structure",
    title: "Academic Curriculum & Focus Tracks",
    description:
      "Advanced coursework balancing theoretical public economics, quantitative econometrics, and financial technology applications.",
    semesters: curriculum.semesters,
  },
  research: {
    badge: "Scholarly Enquiry",
    title: "Research Focus & Specialisations",
    description:
      "Rigorous academic scholarship addressing budgetary practices, quantitative analytics, and fiscal governance in India.",
    areas: institution.researchAreas,
  },
  faculty: {
    badge: "Mentorship",
    title: "Academic Mentorship & Leadership",
    description:
      "Experienced academicians and research supervisors guiding the Academic Batch 2026–2028.",
    members: faculty,
  },
  announcements: {
    enabled: true,
    badge: "Academic Cohort",
    message: "CBS Collective · Academic Batch 2026–2028 at Centre for Budget Studies, CUSAT.",
    linkText: "Meet the Scholars",
    linkUrl: "#our-batch",
  },
  footer: {
    name: "Centre for Budget Studies",
    university: "Cochin University of Science and Technology",
    tagline: "CBS Collective · Academic Batch 2026–2028",
    address: "Centre for Budget Studies, CUSAT Main Campus, South Kalamassery, Kochi, Kerala 682022, India",
    email: "cbs@cusat.ac.in",
    phone: "+91 484 2577290",
    copyrightYear: "2026",
    socialLinks: {
      website: "https://cusat.ac.in",
      linkedin: "https://linkedin.com",
      twitter: "",
    },
  },
};

export async function getSectionContent<K extends SectionKey>(
  key: K,
  previewDraft = false
): Promise<SectionContentMap[K]> {
  try {
    const supabase = await createClient();
    const query = supabase
      .from("site_content")
      .select("content, status")
      .eq("id", key);

    if (!previewDraft) {
      query.eq("status", "published");
    }

    const { data, error } = await query.maybeSingle();

    if (!error && data && data.content) {
      return {
        ...DEFAULT_CMS_CONTENT[key],
        ...data.content,
      };
    }
  } catch {
    // Database connection or table not found
  }

  // Fallback to local storage
  try {
    const { getLocalCmsContent } = await import("@/lib/local-settings");
    const local = getLocalCmsContent();
    if (local[key]?.content) {
      if (!previewDraft && local[key].status !== "published") {
        return DEFAULT_CMS_CONTENT[key];
      }
      return {
        ...DEFAULT_CMS_CONTENT[key],
        ...local[key].content,
      };
    }
  } catch {
    // Ignore fallback errors
  }

  return DEFAULT_CMS_CONTENT[key];
}

export async function getAllCmsContent(previewDraft = false): Promise<SectionContentMap> {
  const result = { ...DEFAULT_CMS_CONTENT };

  try {
    const supabase = await createClient();
    const query = supabase.from("site_content").select("id, content, status");

    if (!previewDraft) {
      query.eq("status", "published");
    }

    const { data } = await query;

    if (data && Array.isArray(data)) {
      for (const row of data) {
        const key = row.id as SectionKey;
        if (result[key] && row.content) {
          result[key] = {
            ...result[key],
            ...row.content,
          } as any;
        }
      }
    }
  } catch {
    // Return default content on database connection issues
  }

  // Merge with local fallback overrides
  try {
    const { getLocalCmsContent } = await import("@/lib/local-settings");
    const local = getLocalCmsContent();
    for (const [key, val] of Object.entries(local)) {
      const sectionKey = key as SectionKey;
      if (result[sectionKey] && val.content) {
        if (!previewDraft && val.status !== "published") continue;
        result[sectionKey] = {
          ...result[sectionKey],
          ...val.content,
        } as any;
      }
    }
  } catch {
    // Ignore fallback errors
  }

  return result;
}

export async function getSiteTheme(previewDraft = false): Promise<any> {
  const { DEFAULT_THEME } = await import("@/lib/theme");
  try {
    const supabase = await createClient();
    const query = supabase
      .from("site_settings")
      .select("value, status")
      .eq("key", "theme");

    if (!previewDraft) {
      query.eq("status", "published");
    }

    const { data, error } = await query.maybeSingle();
    if (!error && data && data.value) {
      return {
        ...DEFAULT_THEME,
        ...data.value,
      };
    }
  } catch {
    // Supabase query failed or table not found
  }

  // Fallback to local settings
  try {
    const { getLocalThemeSettings } = await import("@/lib/local-settings");
    const local = getLocalThemeSettings();
    if (local?.value) {
      if (!previewDraft && local.status !== "published") {
        return DEFAULT_THEME;
      }
      return {
        ...DEFAULT_THEME,
        ...local.value,
      };
    }
  } catch {
    // Ignore fallback errors
  }

  return DEFAULT_THEME;
}

