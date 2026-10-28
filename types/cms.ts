export type SectionKey =
  | "hero"
  | "about"
  | "vision_mission"
  | "achievements"
  | "programme"
  | "curriculum"
  | "research"
  | "faculty"
  | "announcements"
  | "footer";

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  bgImageUrl?: string;
  overlayOpacity: number; // 0 to 100
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

export interface AboutContent {
  badge: string;
  title: string;
  description: string;
  paragraphs: string[];
  stats: Array<{ label: string; value: string; helper?: string }>;
}

export interface VisionMissionContent {
  badge: string;
  title: string;
  vision: string;
  mission: string;
  pillars: Array<{ title: string; description: string }>;
}

export interface AchievementItem {
  year: string;
  title: string;
  description: string;
}

export interface AchievementsContent {
  badge: string;
  title: string;
  description: string;
  items: AchievementItem[];
}

export interface ProgrammeContent {
  badge: string;
  title: string;
  degreeName: string;
  duration: string;
  intake: string;
  eligibility: string;
  description: string;
  learningOutcomes: string[];
}

export interface CourseItem {
  code: string;
  title: string;
  credits: string | number;
}

export interface SemesterItem {
  number: number;
  title: string;
  courses: CourseItem[];
}

export interface CurriculumContent {
  badge: string;
  title: string;
  description: string;
  semesters: SemesterItem[];
}

export interface ResearchAreaItem {
  title: string;
  description: string;
}

export interface ResearchContent {
  badge: string;
  title: string;
  description: string;
  areas: ResearchAreaItem[];
}

export interface FacultyItem {
  id: string;
  name: string;
  title: string;
  department?: string;
  qualification?: string;
  specialisation?: string;
  email?: string;
  photo?: string;
  bio?: string;
}

export interface FacultyContent {
  badge: string;
  title: string;
  description: string;
  members: FacultyItem[];
}

export interface AnnouncementContent {
  enabled: boolean;
  badge: string;
  message: string;
  linkText?: string;
  linkUrl?: string;
}

export interface FooterContent {
  name: string;
  university: string;
  tagline: string;
  address: string;
  email: string;
  phone: string;
  copyrightYear: string;
  socialLinks: {
    linkedin?: string;
    website?: string;
    twitter?: string;
  };
}

export type SectionContentMap = {
  hero: HeroContent;
  about: AboutContent;
  vision_mission: VisionMissionContent;
  achievements: AchievementsContent;
  programme: ProgrammeContent;
  curriculum: CurriculumContent;
  research: ResearchContent;
  faculty: FacultyContent;
  announcements: AnnouncementContent;
  footer: FooterContent;
};

export interface SectionMeta {
  key: SectionKey;
  name: string;
  description: string;
  iconName: string;
}
