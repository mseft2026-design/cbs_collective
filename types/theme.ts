export type ThemePresetKey =
  | "midnight-editorial"
  | "cinematic-dark"
  | "academic-navy"
  | "modern-research"
  | "ivory-burgundy"
  | "academic-minimal"
  | "minimal-light"
  | "midnight-gold";

export interface ThemeColors {
  bg: string;
  bgAlt: string;
  surface: string;
  surfaceHover: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  secondaryAccent: string;
  btnPrimaryBg: string;
  btnPrimaryText: string;
  btnSecondaryBorder: string;
  btnSecondaryText: string;
}

export interface ThemeTypography {
  headingFont: "Inter" | "Geist" | "Playfair Display" | "Cinzel" | "Montserrat" | "Plus Jakarta Sans" | "Manrope" | "DM Sans";
  bodyFont: "Inter" | "Geist" | "System" | "DM Sans";
  headingWeight: "600" | "700" | "800";
  bodyWeight: "400" | "500";
  baseFontSize: "15px" | "16px" | "17px";
  letterSpacing: "normal" | "tight" | "wide";
}

export interface ThemeLayout {
  contentWidth: "1200px" | "1280px" | "1440px";
  sectionSpacing: "compact" | "normal" | "spacious";
  cardRadius: "4px" | "8px" | "12px" | "16px" | "24px";
  cardStyle: "solid" | "glass" | "bordered";
  buttonShape: "rounded-md" | "rounded-lg" | "rounded-full" | "rounded-none";
  animationIntensity: "subtle" | "normal" | "energetic" | "none";
}

export interface SiteTheme {
  preset: ThemePresetKey;
  label?: string;
  description?: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
  customCss?: string;
}
