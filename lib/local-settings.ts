import fs from "fs";
import path from "path";
import { SiteTheme } from "@/types/theme";
import { DEFAULT_THEME } from "@/lib/theme";
import { SectionKey } from "@/types/cms";

const CONFIG_DIR = path.join(process.cwd(), "config");
const THEME_FILE = path.join(CONFIG_DIR, "theme-settings.json");
const CMS_FILE = path.join(CONFIG_DIR, "cms-content.json");

interface SavedThemeRecord {
  value: SiteTheme;
  status: "draft" | "published";
  updated_at: string;
}

// ── THEME FALLBACK STORAGE ───────────────────────────────────────────────────

export function getLocalThemeSettings(): SavedThemeRecord | null {
  try {
    if (fs.existsSync(THEME_FILE)) {
      const data = fs.readFileSync(THEME_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Ignore read errors
  }
  return null;
}

export function saveLocalThemeSettings(
  theme: SiteTheme,
  status: "draft" | "published" = "published"
): void {
  try {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
    const record: SavedThemeRecord = {
      value: theme,
      status,
      updated_at: new Date().toISOString(),
    };
    fs.writeFileSync(THEME_FILE, JSON.stringify(record, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write local theme settings:", err);
  }
}

export function resetLocalThemeSettings(): void {
  try {
    if (fs.existsSync(THEME_FILE)) {
      fs.unlinkSync(THEME_FILE);
    }
  } catch {
    // Ignore unlink error
  }
}

// ── CMS CONTENT FALLBACK STORAGE ─────────────────────────────────────────────

interface SavedCmsStore {
  [key: string]: {
    content: Record<string, any>;
    status: "draft" | "published";
    updated_at: string;
  };
}

export function getLocalCmsContent(): SavedCmsStore {
  try {
    if (fs.existsSync(CMS_FILE)) {
      const data = fs.readFileSync(CMS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Ignore read errors
  }
  return {};
}

export function saveLocalCmsContent(
  sectionKey: SectionKey,
  content: Record<string, any>,
  status: "draft" | "published" = "published"
): void {
  try {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
    const current = getLocalCmsContent();
    current[sectionKey] = {
      content,
      status,
      updated_at: new Date().toISOString(),
    };
    fs.writeFileSync(CMS_FILE, JSON.stringify(current, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write local cms content:", err);
  }
}

// ── PAGE SECTIONS BUILDER STORAGE ────────────────────────────────────────────

const SECTIONS_FILE = path.join(CONFIG_DIR, "page-sections.json");

export function getLocalPageSections(): any | null {
  try {
    if (fs.existsSync(SECTIONS_FILE)) {
      const data = fs.readFileSync(SECTIONS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Ignore read errors
  }
  return null;
}

export function saveLocalPageSections(config: any): void {
  try {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
    fs.writeFileSync(SECTIONS_FILE, JSON.stringify(config, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write local page sections config:", err);
  }
}

export function resetLocalPageSections(): void {
  try {
    if (fs.existsSync(SECTIONS_FILE)) {
      fs.unlinkSync(SECTIONS_FILE);
    }
  } catch {
    // Ignore unlink error
  }
}

