"use client";

import { useState } from "react";
import {
  Palette,
  Save,
  Send,
  RotateCcw,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
  Layout,
  Type,
  Eye,
} from "lucide-react";
import { SiteTheme, ThemePresetKey } from "@/types/theme";
import { THEME_PRESETS, DEFAULT_THEME, themeToCssVariables } from "@/lib/theme";
import { saveThemeSettings, resetThemeSettings } from "@/lib/actions";

interface ThemeStudioProps {
  initialTheme: SiteTheme;
}

export function ThemeStudio({ initialTheme }: ThemeStudioProps) {
  const [theme, setTheme] = useState<SiteTheme>(initialTheme || DEFAULT_THEME);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  function applyPreset(presetKey: ThemePresetKey) {
    const selected = THEME_PRESETS[presetKey];
    if (selected) {
      setTheme({ ...selected });
      setStatusMsg({ type: "success", text: `Applied preset: ${presetKey}` });
    }
  }

  function updateColor(key: keyof SiteTheme["colors"], value: string) {
    setTheme((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value,
      },
    }));
  }

  function updateTypography(key: keyof SiteTheme["typography"], value: any) {
    setTheme((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value,
      },
    }));
  }

  function updateLayout(key: keyof SiteTheme["layout"], value: any) {
    setTheme((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        [key]: value,
      },
    }));
  }

  async function handleSave(status: "draft" | "published") {
    if (status === "draft") setSaving(true);
    else setPublishing(true);
    setStatusMsg(null);

    try {
      await saveThemeSettings(theme, status);
      setStatusMsg({
        type: "success",
        text:
          status === "published"
            ? "Theme published live! It is now active across the entire website."
            : "Theme draft saved successfully.",
      });
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err.message || "Failed to save theme settings",
      });
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  }

  async function handleReset() {
    if (!confirm("Reset theme to default Cinematic Dark preset?")) return;
    setSaving(true);
    try {
      await resetThemeSettings();
      setTheme(DEFAULT_THEME);
      setStatusMsg({ type: "success", text: "Theme reset to default successfully." });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Reset failed" });
    } finally {
      setSaving(false);
    }
  }

  const previewVars = themeToCssVariables(theme);

  return (
    <div className="space-y-8">
      {/* Top action toolbar */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--site-accent)] animate-pulse" />
          <span className="text-xs font-semibold text-white">Visual Appearance & Styling Studio</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            disabled={saving || publishing}
            className="btn-outline text-xs py-2 px-3 text-red-400 hover:text-red-300 flex items-center gap-1.5"
          >
            <RotateCcw size={13} />
            <span>Reset Default</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={saving || publishing}
            className="btn-outline text-xs py-2 px-3.5 flex items-center gap-1.5"
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={saving || publishing}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          >
            {publishing ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
            <span>Publish Theme Live</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 border ${
            statusMsg.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          {statusMsg.type === "success" ? <Check size={14} /> : <AlertCircle size={14} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Preset Cards Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-white/50 block">
          Step 1: Choose a Curated Design Preset
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(
            [
              "midnight-editorial",
              "ivory-burgundy",
              "academic-minimal",
              "modern-research",
            ] as ThemePresetKey[]
          ).map((key) => {
            const p = THEME_PRESETS[key];
            const isSelected =
              theme.preset === key ||
              (key === "midnight-editorial" && theme.preset === "cinematic-dark") ||
              (key === "academic-minimal" && theme.preset === "minimal-light") ||
              (key === "modern-research" && theme.preset === "academic-navy");

            return (
              <button
                key={key}
                type="button"
                onClick={() => applyPreset(key)}
                className={`p-3.5 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? "border-[var(--site-accent)] bg-white/10 ring-2 ring-[var(--site-accent)]/30"
                    : "border-white/10 bg-white/4 hover:bg-white/8 hover:border-white/20"
                }`}
              >
                <div className="w-full">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-white">
                      {p.label || key.replace("-", " ")}
                    </span>
                    {isSelected && <Check size={14} className="text-[var(--site-accent)]" />}
                  </div>
                  {p.description && (
                    <p className="text-[11px] text-white/50 leading-tight mt-1">
                      {p.description}
                    </p>
                  )}
                </div>

                {/* Color swatches strip */}
                <div className="flex items-center gap-1.5 mt-auto pt-2">
                  <span
                    className="w-4 h-4 rounded-full border border-white/20"
                    title="Background"
                    style={{ backgroundColor: p.colors.bg }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-white/20"
                    title="Surface"
                    style={{ backgroundColor: p.colors.surface }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-white/20"
                    title="Accent"
                    style={{ backgroundColor: p.colors.accent }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-white/20"
                    title="Secondary"
                    style={{ backgroundColor: p.colors.secondaryAccent }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Controls on left, Live Interactive Preview on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Colors Panel */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/8">
              <Palette size={16} className="text-[var(--site-accent)]" />
              <h3 className="text-sm font-bold text-white">Palette Colors & Contrast</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Main Canvas Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.colors.bg}
                    onChange={(e) => updateColor("bg", e.target.value)}
                    className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.colors.bg}
                    onChange={(e) => updateColor("bg", e.target.value)}
                    className="input-site text-xs font-mono py-1.5 flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Card / Surface Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.colors.surface}
                    onChange={(e) => updateColor("surface", e.target.value)}
                    className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.colors.surface}
                    onChange={(e) => updateColor("surface", e.target.value)}
                    className="input-site text-xs font-mono py-1.5 flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Primary Accent (Gold / Brand)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.colors.accent}
                    onChange={(e) => updateColor("accent", e.target.value)}
                    className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.colors.accent}
                    onChange={(e) => updateColor("accent", e.target.value)}
                    className="input-site text-xs font-mono py-1.5 flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Secondary Accent (Crimson / Highlight)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.colors.secondaryAccent}
                    onChange={(e) => updateColor("secondaryAccent", e.target.value)}
                    className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.colors.secondaryAccent}
                    onChange={(e) => updateColor("secondaryAccent", e.target.value)}
                    className="input-site text-xs font-mono py-1.5 flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Primary Text Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.colors.text}
                    onChange={(e) => updateColor("text", e.target.value)}
                    className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.colors.text}
                    onChange={(e) => updateColor("text", e.target.value)}
                    className="input-site text-xs font-mono py-1.5 flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Muted / Subtitle Text Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.colors.textMuted}
                    onChange={(e) => updateColor("textMuted", e.target.value)}
                    className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.colors.textMuted}
                    onChange={(e) => updateColor("textMuted", e.target.value)}
                    className="input-site text-xs font-mono py-1.5 flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography Panel */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/8">
              <Type size={16} className="text-[var(--site-accent)]" />
              <h3 className="text-sm font-bold text-white">Typography & Fonts</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Heading Font Family
                </label>
                <select
                  value={theme.typography.headingFont}
                  onChange={(e) => updateTypography("headingFont", e.target.value as any)}
                  className="input-site text-xs py-2"
                >
                  <option value="Inter">Inter (Clean Academic Modern)</option>
                  <option value="Geist">Geist (Modern High-Tech)</option>
                  <option value="Playfair Display">Playfair Display (Classic Editorial Serif)</option>
                  <option value="Cinzel">Cinzel (Regal Institutional)</option>
                  <option value="Montserrat">Montserrat (Geometric Contemporary)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Heading Weight
                </label>
                <select
                  value={theme.typography.headingWeight}
                  onChange={(e) => updateTypography("headingWeight", e.target.value as any)}
                  className="input-site text-xs py-2"
                >
                  <option value="600">Semibold (600)</option>
                  <option value="700">Bold (700)</option>
                  <option value="800">Extra Bold (800)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Letter Spacing
                </label>
                <select
                  value={theme.typography.letterSpacing}
                  onChange={(e) => updateTypography("letterSpacing", e.target.value as any)}
                  className="input-site text-xs py-2"
                >
                  <option value="tight">Tight (Editorial Cinematic)</option>
                  <option value="normal">Normal (Standard)</option>
                  <option value="wide">Wide (Spacious Technical)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Base Font Scale
                </label>
                <select
                  value={theme.typography.baseFontSize}
                  onChange={(e) => updateTypography("baseFontSize", e.target.value as any)}
                  className="input-site text-xs py-2"
                >
                  <option value="15px">Compact (15px)</option>
                  <option value="16px">Standard (16px)</option>
                  <option value="17px">Comfortable (17px)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Layout & Components */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/8">
              <Layout size={16} className="text-[var(--site-accent)]" />
              <h3 className="text-sm font-bold text-white">Layout & Component Geometry</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Content Container Width
                </label>
                <select
                  value={theme.layout.contentWidth}
                  onChange={(e) => updateLayout("contentWidth", e.target.value as any)}
                  className="input-site text-xs py-2"
                >
                  <option value="1200px">Compact (1200px)</option>
                  <option value="1280px">Standard (1280px)</option>
                  <option value="1440px">Wide Panoramic (1440px)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Card Corner Radius
                </label>
                <select
                  value={theme.layout.cardRadius}
                  onChange={(e) => updateLayout("cardRadius", e.target.value as any)}
                  className="input-site text-xs py-2"
                >
                  <option value="4px">Subtle (4px)</option>
                  <option value="8px">Medium (8px)</option>
                  <option value="12px">Smooth (12px)</option>
                  <option value="16px">Rounded (16px)</option>
                  <option value="24px">Pill / Soft (24px)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Card Surface Style
                </label>
                <select
                  value={theme.layout.cardStyle}
                  onChange={(e) => updateLayout("cardStyle", e.target.value as any)}
                  className="input-site text-xs py-2"
                >
                  <option value="glass">Glassmorphism (Frosted Dark)</option>
                  <option value="solid">Solid Opaque</option>
                  <option value="bordered">Subtle Bordered Outline</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Button Corner Shape
                </label>
                <select
                  value={theme.layout.buttonShape}
                  onChange={(e) => updateLayout("buttonShape", e.target.value as any)}
                  className="input-site text-xs py-2"
                >
                  <option value="rounded-md">Rounded Rectangular</option>
                  <option value="rounded-lg">Rounded Smooth</option>
                  <option value="rounded-full">Full Pill</option>
                  <option value="rounded-none">Sharp Editorial Square</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Preview Canvas (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                <Eye size={13} /> Immediate Live Preview
              </span>
              <span className="text-[10px] text-[var(--site-accent)] font-semibold">
                Dynamic CSS Var Rendering
              </span>
            </div>

            {/* Simulated Live Preview Box */}
            <div
              className="p-6 rounded-2xl border transition-all shadow-2xl relative overflow-hidden"
              style={{
                backgroundColor: theme.colors.bg,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              }}
            >
              {/* Simulated Badge */}
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border"
                style={{
                  color: theme.colors.accent,
                  backgroundColor: `${theme.colors.accent}15`,
                  borderColor: `${theme.colors.accent}30`,
                }}
              >
                <Sparkles size={11} />
                <span>Academic Batch 2026–2028</span>
              </div>

              {/* Simulated Heading */}
              <h4
                className="text-xl font-bold tracking-tight mb-2"
                style={{
                  color: theme.colors.text,
                  fontWeight: parseInt(theme.typography.headingWeight, 10),
                }}
              >
                Centre for Budget Studies
              </h4>

              <p
                className="text-xs leading-relaxed mb-6"
                style={{ color: theme.colors.textMuted }}
              >
                Simulated frontend sample showcasing text contrast, card hierarchy, and button styles.
              </p>

              {/* Simulated Card */}
              <div
                className="p-4 border mb-6 transition-all"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  borderRadius: theme.layout.cardRadius,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold" style={{ color: theme.colors.text }}>
                    Scholar Spotlight Card
                  </span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                    style={{
                      backgroundColor: `${theme.colors.accent}20`,
                      color: theme.colors.accent,
                    }}
                  >
                    Published
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: theme.colors.textMuted }}>
                  Interest areas: Fiscal Federalism, Macroeconomic Forecasting, Public Economics.
                </p>
              </div>

              {/* Simulated Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-bold transition-all shadow-md"
                  style={{
                    backgroundColor: theme.colors.btnPrimaryBg,
                    color: theme.colors.btnPrimaryText,
                    borderRadius: theme.layout.cardRadius,
                  }}
                >
                  Explore Cohort
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-semibold border transition-all"
                  style={{
                    borderColor: theme.colors.btnSecondaryBorder,
                    color: theme.colors.btnSecondaryText,
                    borderRadius: theme.layout.cardRadius,
                  }}
                >
                  About Centre
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
