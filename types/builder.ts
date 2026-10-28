export type SectionType =
  | "hero"
  | "stats"
  | "about"
  | "cusat"
  | "vision_mission"
  | "programme"
  | "curriculum"
  | "milestones"
  | "research"
  | "faculty"
  | "students"
  | "announcements"
  | "cta"
  | "editorial"
  | "contact";

export type HorizontalAlign = "left" | "center" | "right";
export type VerticalAlign = "top" | "center" | "bottom";
export type ContentWidth = "narrow" | "standard" | "wide" | "full";
export type SpacingPreset = "compact" | "comfortable" | "spacious";
export type HeadingSize = "medium" | "large" | "extra-large";

export type LayoutPreset =
  | "single-column"
  | "two-column-split"
  | "two-column-reverse"
  | "three-column-cards"
  | "four-column-cards"
  | "centered-editorial"
  | "hero-executive";

export type EntranceAnimation =
  | "none"
  | "fade-in"
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "mask-reveal";

export type AnimationDuration = "short" | "normal" | "slow";
export type AnimationDelay = "none" | "short" | "staggered";
export type AnimationTrigger = "load" | "scroll";
export type InteractionEffect =
  | "none"
  | "subtle-lift"
  | "image-zoom"
  | "soft-glow"
  | "border-highlight";
export type MotionIntensity = "minimal" | "balanced" | "expressive";

export interface SectionAnimationSettings {
  entrance: EntranceAnimation;
  duration: AnimationDuration;
  delay: AnimationDelay;
  trigger: AnimationTrigger;
  interaction: InteractionEffect;
  intensity: MotionIntensity;
  disabled?: boolean;
}

export interface SectionLayoutSettings {
  horizontalAlign: HorizontalAlign;
  verticalAlign: VerticalAlign;
  contentWidth: ContentWidth;
  layoutPreset: LayoutPreset;
  spacing: SpacingPreset;
  headingSize: HeadingSize;
  showEyebrow: boolean;
  mobileStackReverse?: boolean;
  mobileTextCenter?: boolean;
}

export interface SectionInstance {
  id: string; // unique instance ID, e.g. "hero-1", "custom-stats-2"
  type: SectionType;
  title: string; // Admin display label, e.g. "Hero & Welcome Banner"
  order: number;
  isHidden: boolean;
  isDeleted: boolean; // soft-delete flag for Trash recovery
  deletedAt?: string;
  isProtected?: boolean; // protected from accidental hard delete
  layout: SectionLayoutSettings;
  animation?: SectionAnimationSettings;
  content: Record<string, any>;
  customStyles?: {
    accentColor?: string;
    backgroundColor?: string;
  };
}

export interface PageSectionsConfig {
  version: number;
  status: "draft" | "published";
  updated_at: string;
  updated_by?: string;
  showHeader?: boolean; // Controls global header navigation visibility
  showFooter?: boolean; // Controls global footer visibility
  sections: SectionInstance[];
  trash: SectionInstance[];
}

export interface SectionLibraryItem {
  type: SectionType;
  name: string;
  description: string;
  category: "Core" | "Institutional" | "Academic" | "Directory" | "Content";
  isSingleton?: boolean;
  defaultTitle: string;
  defaultLayout: SectionLayoutSettings;
  defaultAnimation?: SectionAnimationSettings;
  defaultContent: Record<string, any>;
}
