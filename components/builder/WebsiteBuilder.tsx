"use client";

import { useState, useTransition, useEffect } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Save,
  Send,
  Sparkles,
  Layers,
  Settings2,
  Check,
  AlertCircle,
  X,
  Shield,
  HelpCircle,
  Undo2,
  Maximize2,
  ChevronRight,
  MoveVertical,
  Activity,
  Play,
  Menu,
  PanelBottom,
} from "lucide-react";
import {
  SectionInstance,
  PageSectionsConfig,
  SectionLibraryItem,
  SectionAnimationSettings,
  EntranceAnimation,
  AnimationDuration,
  AnimationDelay,
  AnimationTrigger,
  InteractionEffect,
  MotionIntensity,
  HorizontalAlign,
  VerticalAlign,
  ContentWidth,
  SpacingPreset,
  HeadingSize,
  LayoutPreset,
} from "@/types/builder";
import {
  SECTION_LIBRARY,
  DEFAULT_LAYOUT_SETTINGS,
  DEFAULT_ANIMATION_SETTINGS,
} from "@/lib/builder";
import { SectionRenderer } from "@/components/builder/SectionRenderer";
import { savePageSectionsConfig } from "@/lib/actions";
import { StudentWithUrls } from "@/types/student";
import { cn } from "@/lib/utils";

interface WebsiteBuilderProps {
  initialConfig: PageSectionsConfig;
  students: StudentWithUrls[];
  cmsFallback?: any;
}

export function WebsiteBuilder({
  initialConfig,
  students,
  cmsFallback,
}: WebsiteBuilderProps) {
  const [config, setConfig] = useState<PageSectionsConfig>(initialConfig);
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    config.sections[0]?.id || ""
  );

  // Builder UI states
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTabMobile, setActiveTabMobile] = useState<"sections" | "preview" | "settings">("sections");
  const [settingsGroup, setSettingsGroup] = useState<"content" | "layout" | "style" | "motion">("content");
  const [previewKey, setPreviewKey] = useState(0);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Save states
  const [isDirty, setIsDirty] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Warn on unsaved changes
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const activeSection = config.sections.find((s) => s.id === selectedSectionId);

  function markDirty() {
    if (!isDirty) setIsDirty(true);
  }

  // ── REORDER SECTIONS ────────────────────────────────────────────────────────
  function moveSection(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= config.sections.length) return;

    const newSections = [...config.sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);

    // Update order indices
    const updated = newSections.map((sec, i) => ({ ...sec, order: i }));
    setConfig((prev) => ({ ...prev, sections: updated }));
    markDirty();
  }

  // ── HIDE / RESTORE VISIBILITY ───────────────────────────────────────────────
  function toggleHideSection(id: string) {
    const updated = config.sections.map((sec) =>
      sec.id === id ? { ...sec, isHidden: !sec.isHidden } : sec
    );
    setConfig((prev) => ({ ...prev, sections: updated }));
    markDirty();
  }

  // ── REMOVE / SOFT DELETE SECTION ───────────────────────────────────────────
  function removeSection(id: string) {
    const target = config.sections.find((s) => s.id === id);
    if (!target) return;

    if (target.isProtected) {
      alert("This is an essential structural section and cannot be removed.");
      return;
    }

    if (!confirm(`Move "${target.title}" to the Trash? You can restore it anytime.`)) {
      return;
    }

    const newSections = config.sections.filter((s) => s.id !== id);
    const softDeleted: SectionInstance = {
      ...target,
      isDeleted: true,
      deletedAt: new Date().toISOString(),
    };

    setConfig((prev) => ({
      ...prev,
      sections: newSections,
      trash: [...(prev.trash || []), softDeleted],
    }));

    if (selectedSectionId === id && newSections.length > 0) {
      setSelectedSectionId(newSections[0].id);
    }
    markDirty();
  }

  // ── RESTORE FROM TRASH ─────────────────────────────────────────────────────
  function restoreFromTrash(id: string) {
    const target = config.trash.find((s) => s.id === id);
    if (!target) return;

    const restored: SectionInstance = {
      ...target,
      isDeleted: false,
      deletedAt: undefined,
      order: config.sections.length,
    };

    setConfig((prev) => ({
      ...prev,
      sections: [...prev.sections, restored],
      trash: prev.trash.filter((s) => s.id !== id),
    }));

    setSelectedSectionId(restored.id);
    markDirty();
  }

  function permanentlyDelete(id: string) {
    if (!confirm("Permanently purge this section from Trash? This cannot be undone.")) return;
    setConfig((prev) => ({
      ...prev,
      trash: prev.trash.filter((s) => s.id !== id),
    }));
    markDirty();
  }

  // ── ADD SECTION FROM LIBRARY ───────────────────────────────────────────────
  function addSection(libItem: SectionLibraryItem) {
    const newId = `sec-${libItem.type}-${Date.now().toString(36)}`;
    const newSection: SectionInstance = {
      id: newId,
      type: libItem.type,
      title: libItem.defaultTitle,
      order: config.sections.length,
      isHidden: false,
      isDeleted: false,
      layout: { ...libItem.defaultLayout },
      content: { ...libItem.defaultContent },
    };

    setConfig((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));

    setSelectedSectionId(newId);
    setIsLibraryOpen(false);
    setActiveTabMobile("settings");
    markDirty();
  }

  // ── SECTION SETTINGS UPDATERS ──────────────────────────────────────────────
  function updateSectionContent(key: string, value: any) {
    if (!selectedSectionId) return;
    const updated = config.sections.map((sec) => {
      if (sec.id === selectedSectionId) {
        return {
          ...sec,
          content: {
            ...sec.content,
            [key]: value,
          },
        };
      }
      return sec;
    });
    setConfig((prev) => ({ ...prev, sections: updated }));
    markDirty();
  }

  function updateSectionLayout<K extends keyof SectionInstance["layout"]>(
    key: K,
    value: SectionInstance["layout"][K]
  ) {
    if (!selectedSectionId) return;
    const updated = config.sections.map((sec) => {
      if (sec.id === selectedSectionId) {
        return {
          ...sec,
          layout: {
            ...sec.layout,
            [key]: value,
          },
        };
      }
      return sec;
    });
    setConfig((prev) => ({ ...prev, sections: updated }));
    markDirty();
  }

  function updateSectionAnimation<K extends keyof SectionAnimationSettings>(
    key: K,
    value: SectionAnimationSettings[K]
  ) {
    if (!selectedSectionId) return;
    const updated = config.sections.map((sec) => {
      if (sec.id === selectedSectionId) {
        return {
          ...sec,
          animation: {
            ...DEFAULT_ANIMATION_SETTINGS,
            ...(sec.animation || {}),
            [key]: value,
          },
        };
      }
      return sec;
    });
    setConfig((prev) => ({ ...prev, sections: updated }));
    setPreviewKey((k) => k + 1); // Trigger preview animation replay
    markDirty();
  }

  function updateSectionTitle(newTitle: string) {
    if (!selectedSectionId) return;
    const updated = config.sections.map((sec) =>
      sec.id === selectedSectionId ? { ...sec, title: newTitle } : sec
    );
    setConfig((prev) => ({ ...prev, sections: updated }));
    markDirty();
  }

  // ── SAVE & PUBLISH WORKFLOWS ───────────────────────────────────────────────
  function handleSaveDraft() {
    startTransition(async () => {
      try {
        const res = await savePageSectionsConfig(config, "draft");
        setIsDirty(false);
        setSaveStatus({
          type: "success",
          message: "Draft saved successfully. Visitors will not see draft changes until published.",
        });
      } catch (err: any) {
        setSaveStatus({
          type: "error",
          message: err.message || "Failed to save draft.",
        });
      }
    });
  }

  function handlePublishLive() {
    startTransition(async () => {
      try {
        const res = await savePageSectionsConfig(config, "published");
        setIsDirty(false);
        setIsPublishModalOpen(false);
        setSaveStatus({
          type: "success",
          message: "Website published live! Changes are now active for all visitors.",
        });
      } catch (err: any) {
        setSaveStatus({
          type: "error",
          message: err.message || "Failed to publish live.",
        });
      }
    });
  }

  function handleDiscardChanges() {
    if (!confirm("Discard all unsaved adjustments and reload initial configuration?")) return;
    setConfig(initialConfig);
    setIsDirty(false);
    setSaveStatus({ type: "success", message: "Draft adjustments discarded." });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] -m-4 sm:-m-6 lg:-m-10 bg-[#070a13] text-white overflow-hidden">
      {/* ── TOP ACTION & STATUS BAR ───────────────────────────────── */}
      <header className="h-14 border-b border-white/10 bg-[#090d16] px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--site-accent)] animate-pulse" />
            <span className="font-extrabold text-sm tracking-tight text-white hidden sm:inline">
              Visual Website Builder
            </span>
          </div>

          {isDirty && (
            <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              ● Unsaved Changes
            </span>
          )}

          {saveStatus && (
            <span
              className={cn(
                "text-xs px-2.5 py-0.5 rounded-full hidden md:inline-flex items-center gap-1.5",
                saveStatus.type === "success"
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                  : "bg-red-500/15 text-red-300 border border-red-500/30"
              )}
            >
              {saveStatus.message}
            </span>
          )}
        </div>

        {/* Device Switcher & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Viewport device toggles */}
          <div className="hidden sm:inline-flex rounded-lg border border-white/10 bg-black/40 p-0.5 text-xs">
            <button
              onClick={() => setViewportMode("desktop")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewportMode === "desktop" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
              )}
              title="Desktop Viewport (100%)"
            >
              <Monitor size={15} />
            </button>
            <button
              onClick={() => setViewportMode("tablet")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewportMode === "tablet" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
              )}
              title="Tablet Viewport (768px)"
            >
              <Tablet size={15} />
            </button>
            <button
              onClick={() => setViewportMode("mobile")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewportMode === "mobile" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
              )}
              title="Mobile Viewport (375px)"
            >
              <Smartphone size={15} />
            </button>
          </div>

          {/* Trash button */}
          <button
            onClick={() => setIsTrashOpen(true)}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 border border-white/10 text-xs relative"
            title="Recoverable Trash"
          >
            <Trash2 size={15} />
            {config.trash?.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                {config.trash.length}
              </span>
            )}
          </button>

          {/* Discard draft */}
          {isDirty && (
            <button
              onClick={handleDiscardChanges}
              className="btn-outline py-1.5 px-3 text-xs hidden md:inline-flex items-center gap-1.5"
            >
              <Undo2 size={13} />
              <span>Discard</span>
            </button>
          )}

          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            disabled={isPending}
            className="btn-outline py-1.5 px-3.5 text-xs inline-flex items-center gap-1.5"
          >
            <Save size={13} />
            <span>Save Draft</span>
          </button>

          {/* Publish Live */}
          <button
            onClick={() => setIsPublishModalOpen(true)}
            disabled={isPending}
            className="btn-primary py-1.5 px-4 text-xs inline-flex items-center gap-1.5 shadow-md shadow-[#d4af37]/20 font-bold"
          >
            <Send size={13} />
            <span>Publish Live</span>
          </button>
        </div>
      </header>

      {/* ── MOBILE TAB SWITCHER (< lg) ───────────────────────────── */}
      <div className="lg:hidden flex border-b border-white/10 bg-[#090d16] text-xs font-semibold">
        <button
          onClick={() => setActiveTabMobile("sections")}
          className={cn(
            "flex-1 py-2.5 text-center border-b-2 transition-colors",
            activeTabMobile === "sections"
              ? "border-[var(--site-accent)] text-white"
              : "border-transparent text-white/50"
          )}
        >
          Sections ({config.sections.length})
        </button>
        <button
          onClick={() => setActiveTabMobile("preview")}
          className={cn(
            "flex-1 py-2.5 text-center border-b-2 transition-colors",
            activeTabMobile === "preview"
              ? "border-[var(--site-accent)] text-white"
              : "border-transparent text-white/50"
          )}
        >
          Live Preview
        </button>
        <button
          onClick={() => setActiveTabMobile("settings")}
          className={cn(
            "flex-1 py-2.5 text-center border-b-2 transition-colors",
            activeTabMobile === "settings"
              ? "border-[var(--site-accent)] text-white"
              : "border-transparent text-white/50"
          )}
        >
          Settings
        </button>
      </div>

      {/* ── MAIN 3-PANEL LAYOUT ───────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── LEFT PANEL: SECTION MANAGER (280px) ─────────────────── */}
        <aside
          className={cn(
            "w-full lg:w-72 border-r border-white/10 bg-[#070a13] flex flex-col shrink-0 overflow-hidden",
            activeTabMobile !== "sections" && "hidden lg:flex"
          )}
        >
          <div className="p-4 border-b border-white/8 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                Page Sections
              </h2>
              <p className="text-[11px] text-white/40">
                {config.sections.length} active on page
              </p>
            </div>
            <button
              onClick={() => setIsLibraryOpen(true)}
              className="btn-primary py-1 px-2.5 text-xs flex items-center gap-1 font-bold shadow-sm"
            >
              <Plus size={13} /> Add
            </button>
          </div>

          {/* Section instances list */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
            {/* Global Header Navigation Control Card */}
            <div
              className={cn(
                "p-2.5 rounded-xl border text-xs transition-all mb-2 shadow-sm",
                config.showHeader === false
                  ? "bg-amber-500/5 border-amber-500/30 text-amber-300"
                  : "bg-white/5 border-white/10 text-white"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                      config.showHeader === false
                        ? "bg-amber-500/15 text-amber-400"
                        : "bg-[var(--site-accent)]/15 text-[var(--site-accent)]"
                    )}
                  >
                    <Menu size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate text-xs">
                      Header Navigation
                    </p>
                    <span className="text-[10px] text-white/50 block">
                      {config.showHeader === false ? "Removed / Hidden" : "Active on all pages"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const newShow = config.showHeader === false ? true : false;
                    setConfig((prev) => ({ ...prev, showHeader: newShow }));
                    markDirty();
                  }}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border transition-colors shrink-0",
                    config.showHeader === false
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30"
                      : "bg-white/10 border-white/15 text-white/80 hover:text-white hover:bg-white/15"
                  )}
                  title={config.showHeader === false ? "Restore Header to Public Site" : "Remove Header from Public Site"}
                >
                  {config.showHeader === false ? (
                    <>
                      <EyeOff size={11} />
                      <span>Removed</span>
                    </>
                  ) : (
                    <>
                      <Eye size={11} />
                      <span>Visible</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Global Footer Section Control Card */}
            <div
              className={cn(
                "p-2.5 rounded-xl border text-xs transition-all mb-2 shadow-sm",
                config.showFooter === false
                  ? "bg-amber-500/5 border-amber-500/30 text-amber-300"
                  : "bg-white/5 border-white/10 text-white"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                      config.showFooter === false
                        ? "bg-amber-500/15 text-amber-400"
                        : "bg-[var(--site-accent)]/15 text-[var(--site-accent)]"
                    )}
                  >
                    <PanelBottom size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate text-xs">
                      Footer Section
                    </p>
                    <span className="text-[10px] text-white/50 block">
                      {config.showFooter === false ? "Removed / Hidden" : "Active on all pages"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const newShow = config.showFooter === false ? true : false;
                    setConfig((prev) => ({ ...prev, showFooter: newShow }));
                    markDirty();
                  }}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border transition-colors shrink-0",
                    config.showFooter === false
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30"
                      : "bg-white/10 border-white/15 text-white/80 hover:text-white hover:bg-white/15"
                  )}
                  title={config.showFooter === false ? "Restore Footer to Public Site" : "Remove Footer from Public Site"}
                >
                  {config.showFooter === false ? (
                    <>
                      <EyeOff size={11} />
                      <span>Removed</span>
                    </>
                  ) : (
                    <>
                      <Eye size={11} />
                      <span>Visible</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Separator */}
            <div className="flex items-center gap-2 py-1 px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                Body Sections
              </span>
              <div className="h-px flex-1 bg-white/6" />
            </div>

            {config.sections.map((sec, idx) => {
              const isSelected = sec.id === selectedSectionId;
              return (
                <div
                  key={sec.id}
                  onClick={() => {
                    setSelectedSectionId(sec.id);
                    setActiveTabMobile("settings");
                  }}
                  className={cn(
                    "group flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all",
                    isSelected
                      ? "bg-white/10 border-[var(--site-accent)] text-white shadow-md"
                      : "bg-white/3 border-white/6 text-white/70 hover:bg-white/6 hover:text-white"
                  )}
                >
                  {/* Order indicator */}
                  <span className="font-mono text-[10px] text-white/30 w-4 text-center shrink-0">
                    {idx + 1}
                  </span>

                  {/* Title & Type */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate text-white leading-tight">
                      {sec.title}
                    </p>
                    <span className="text-[10px] text-white/40 capitalize">
                      {sec.type.replace("_", " ")}
                    </span>
                  </div>

                  {/* Visibility & Protected tags */}
                  {sec.isHidden && (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                      Hidden
                    </span>
                  )}

                  {/* Quick action buttons */}
                  <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(idx, "up");
                      }}
                      className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                      title="Move Up"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === config.sections.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(idx, "down");
                      }}
                      className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDown size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleHideSection(sec.id);
                      }}
                      className={cn(
                        "p-1 transition-colors",
                        sec.isHidden ? "text-amber-400" : "text-white/40 hover:text-white"
                      )}
                      title={sec.isHidden ? "Restore to Public View" : "Hide from Public"}
                    >
                      {sec.isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
                    </button>
                    {!sec.isProtected && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSection(sec.id);
                        }}
                        className="p-1 text-white/40 hover:text-red-400"
                        title="Move to Trash"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ── CENTRE PANEL: LIVE PREVIEW CANVAS ─────────────────────── */}
        <main
          className={cn(
            "flex-1 bg-[#05070c] flex flex-col items-center justify-start overflow-y-auto p-4 sm:p-6 lg:p-8 relative",
            activeTabMobile !== "preview" && "hidden lg:flex"
          )}
        >
          {/* Viewport Frame Container */}
          <div
            className={cn(
              "w-full bg-[#070a13] rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 min-h-[85vh]",
              viewportMode === "desktop" && "max-w-7xl",
              viewportMode === "tablet" && "max-w-[768px]",
              viewportMode === "mobile" && "max-w-[375px]"
            )}
          >
            {/* Viewport Status Header */}
            <div className="bg-[#090d16] px-4 py-2 border-b border-white/8 flex items-center justify-between text-[11px] text-white/40">
              <span className="font-mono">
                Preview Mode: {viewportMode.toUpperCase()}{" "}
                {viewportMode === "desktop" ? "(1280px)" : viewportMode === "tablet" ? "(768px)" : "(375px)"}
              </span>
              <span className="text-[var(--site-accent)] font-semibold">
                Click any section to inspect settings
              </span>
            </div>

            {/* Header Navigation Bar Preview (or Removed alert) */}
            {config.showHeader !== false ? (
              <div className="bg-[#070a13]/90 border-b border-white/10 px-4 py-3 flex items-center justify-between backdrop-blur-md sticky top-0 z-30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#997a15] p-0.5 shrink-0">
                    <div className="w-full h-full bg-[#070a13] rounded-[6px] flex items-center justify-center">
                      <span className="font-serif font-black text-[10px] text-[#d4af37]">CBS</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs leading-none">CBS Collective</p>
                    <p className="text-[9px] text-[#d4af37] uppercase tracking-wider mt-0.5">
                      Academic Batch 2026–2028
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-white/70">
                  <span className="px-2.5 py-1 rounded bg-white/10 text-white">Home</span>
                  <span className="px-2.5 py-1">About</span>
                  <span className="px-2.5 py-1">Vision &amp; Mission</span>
                  <span className="px-2.5 py-1">Faculty</span>
                  <span className="px-2.5 py-1">Our Batch</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[var(--site-accent)] text-[#070a13]">
                    Scholars
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 text-center text-xs text-amber-300 font-semibold flex items-center justify-center gap-2">
                <EyeOff size={13} />
                <span>Header Navigation Bar Removed (Hidden from public website)</span>
              </div>
            )}

            {/* Rendered Live Website Sections */}
            <div className="divide-y divide-white/5">
              {config.sections.map((sec) => (
                <SectionRenderer
                  key={`${sec.id}-${previewKey}`}
                  section={sec}
                  students={students}
                  cmsFallback={cmsFallback}
                  isInteractivePreview={true}
                  isSelected={sec.id === selectedSectionId}
                  onSelectSection={(id) => {
                    setSelectedSectionId(id);
                    setActiveTabMobile("settings");
                  }}
                />
              ))}
            </div>

            {/* Footer Live Preview or Removed Banner */}
            {config.showFooter === false ? (
              <div className="bg-amber-500/10 border-t border-amber-500/20 px-4 py-3 text-center text-xs text-amber-300 font-semibold flex items-center justify-center gap-2">
                <EyeOff size={13} />
                <span>Footer Section Removed (Hidden from public website)</span>
              </div>
            ) : (
              <footer className="bg-[#05070c] border-t border-white/10 p-6 text-center text-xs text-white/50 space-y-1">
                <p className="font-bold text-white/70">CBS Collective · Academic Batch 2026–2028</p>
                <p className="text-[11px] text-white/40">Centre for Budget Studies, Cochin University of Science and Technology</p>
              </footer>
            )}
          </div>
        </main>

        {/* ── RIGHT PANEL: SECTION SETTINGS (360px) ────────────────── */}
        <aside
          className={cn(
            "w-full lg:w-96 border-l border-white/10 bg-[#070a13] flex flex-col shrink-0 overflow-hidden",
            activeTabMobile !== "settings" && "hidden lg:flex"
          )}
        >
          {activeSection ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-white/8 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider truncate max-w-[200px]">
                    {activeSection.title}
                  </h3>
                  <span className="text-[10px] text-[var(--site-accent)] font-mono">
                    Type: {activeSection.type}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleHideSection(activeSection.id)}
                    className={cn(
                      "p-1.5 rounded-lg border text-xs flex items-center gap-1 font-semibold",
                      activeSection.isHidden
                        ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                        : "bg-white/5 border-white/10 text-white/60"
                    )}
                    title={activeSection.isHidden ? "Publish to Website" : "Hide from Website"}
                  >
                    {activeSection.isHidden ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{activeSection.isHidden ? "Hidden" : "Visible"}</span>
                  </button>
                </div>
              </div>

              {/* Settings Groups Tabs */}
              <div className="flex border-b border-white/8 bg-[#090d16] text-[11px] font-semibold">
                <button
                  onClick={() => setSettingsGroup("content")}
                  className={cn(
                    "flex-1 py-2.5 text-center border-b-2 transition-colors",
                    settingsGroup === "content"
                      ? "border-[var(--site-accent)] text-white"
                      : "border-transparent text-white/50 hover:text-white"
                  )}
                >
                  Content
                </button>
                <button
                  onClick={() => setSettingsGroup("layout")}
                  className={cn(
                    "flex-1 py-2.5 text-center border-b-2 transition-colors",
                    settingsGroup === "layout"
                      ? "border-[var(--site-accent)] text-white"
                      : "border-transparent text-white/50 hover:text-white"
                  )}
                >
                  Layout
                </button>
                <button
                  onClick={() => setSettingsGroup("style")}
                  className={cn(
                    "flex-1 py-2.5 text-center border-b-2 transition-colors",
                    settingsGroup === "style"
                      ? "border-[var(--site-accent)] text-white"
                      : "border-transparent text-white/50 hover:text-white"
                  )}
                >
                  Spacing
                </button>
                <button
                  onClick={() => setSettingsGroup("motion")}
                  className={cn(
                    "flex-1 py-2.5 text-center border-b-2 transition-colors flex items-center justify-center gap-1",
                    settingsGroup === "motion"
                      ? "border-[var(--site-accent)] text-white"
                      : "border-transparent text-white/50 hover:text-white"
                  )}
                >
                  <Activity size={12} className={settingsGroup === "motion" ? "text-[var(--site-accent)]" : "text-white/40"} />
                  <span>Motion</span>
                </button>
              </div>

              {/* Tab Content Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* ── 1. CONTENT TAB ────────────────────────────────────────── */}
                {settingsGroup === "content" && (
                  <div className="space-y-4">
                    {/* Display Title in Admin */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
                        Admin Label
                      </label>
                      <input
                        type="text"
                        value={activeSection.title}
                        onChange={(e) => updateSectionTitle(e.target.value)}
                        className="input-site text-xs py-2"
                      />
                    </div>

                    {/* Eyebrow Label */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
                        Eyebrow Label
                      </label>
                      <input
                        type="text"
                        value={activeSection.content.eyebrow || ""}
                        onChange={(e) => updateSectionContent("eyebrow", e.target.value)}
                        placeholder="e.g. CENTRE FOR BUDGET STUDIES"
                        className="input-site text-xs py-2"
                      />
                    </div>

                    {/* Headline / Title */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
                        Main Headline
                      </label>
                      <input
                        type="text"
                        value={activeSection.content.title || ""}
                        onChange={(e) => updateSectionContent("title", e.target.value)}
                        placeholder="Section Heading"
                        className="input-site text-xs py-2"
                      />
                    </div>

                    {/* Highlight suffix (for hero) */}
                    {activeSection.type === "hero" && (
                      <div>
                        <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
                          Gold Highlight Text
                        </label>
                        <input
                          type="text"
                          value={activeSection.content.titleHighlight || ""}
                          onChange={(e) => updateSectionContent("titleHighlight", e.target.value)}
                          placeholder="e.g. Shaping Tomorrow."
                          className="input-site text-xs py-2"
                        />
                      </div>
                    )}

                    {/* Description narrative */}
                    {activeSection.content.description !== undefined && (
                      <div>
                        <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
                          Narrative Description
                        </label>
                        <textarea
                          rows={3}
                          value={activeSection.content.description || ""}
                          onChange={(e) => updateSectionContent("description", e.target.value)}
                          className="input-site text-xs py-2 resize-y"
                        />
                      </div>
                    )}

                    {/* Paragraphs (About) */}
                    {activeSection.type === "about" && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
                            Paragraph 1
                          </label>
                          <textarea
                            rows={3}
                            value={activeSection.content.paragraph1 || ""}
                            onChange={(e) => updateSectionContent("paragraph1", e.target.value)}
                            className="input-site text-xs py-2 resize-y"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
                            Paragraph 2
                          </label>
                          <textarea
                            rows={3}
                            value={activeSection.content.paragraph2 || ""}
                            onChange={(e) => updateSectionContent("paragraph2", e.target.value)}
                            className="input-site text-xs py-2 resize-y"
                          />
                        </div>
                      </>
                    )}

                    {/* Vision & Mission fields */}
                    {activeSection.type === "vision_mission" && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
                            Vision Statement
                          </label>
                          <textarea
                            rows={3}
                            value={activeSection.content.vision || ""}
                            onChange={(e) => updateSectionContent("vision", e.target.value)}
                            className="input-site text-xs py-2 resize-y"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
                            Mission Statement
                          </label>
                          <textarea
                            rows={3}
                            value={activeSection.content.mission || ""}
                            onChange={(e) => updateSectionContent("mission", e.target.value)}
                            className="input-site text-xs py-2 resize-y"
                          />
                        </div>
                      </>
                    )}

                    {/* CUSAT Profile fields */}
                    {activeSection.type === "cusat" && (
                      <div className="space-y-3 pt-2 border-t border-white/8">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--site-accent)]">
                          CUSAT Institutional Profile
                        </p>
                        <div>
                          <label className="block text-[11px] text-white/60 mb-1">
                            Funding Agencies Badge Text
                          </label>
                          <input
                            type="text"
                            value={activeSection.content.fundingAgencies || ""}
                            onChange={(e) => updateSectionContent("fundingAgencies", e.target.value)}
                            className="input-site text-xs py-1.5"
                          />
                        </div>
                      </div>
                    )}

                    {/* Programme fields */}
                    {activeSection.type === "programme" && (
                      <div className="space-y-3 pt-2 border-t border-white/8">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--site-accent)]">
                          Programme Specifications
                        </p>
                        <div>
                          <label className="block text-[11px] text-white/60 mb-1">
                            Degree Title
                          </label>
                          <input
                            type="text"
                            value={activeSection.content.degreeName || ""}
                            onChange={(e) => updateSectionContent("degreeName", e.target.value)}
                            className="input-site text-xs py-1.5"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-white/60 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={activeSection.content.duration || ""}
                            onChange={(e) => updateSectionContent("duration", e.target.value)}
                            className="input-site text-xs py-1.5"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-white/60 mb-1">
                            Intake
                          </label>
                          <input
                            type="text"
                            value={activeSection.content.intake || ""}
                            onChange={(e) => updateSectionContent("intake", e.target.value)}
                            className="input-site text-xs py-1.5"
                          />
                        </div>
                      </div>
                    )}

                    {/* Buttons (Hero / CTA) */}
                    {(activeSection.type === "hero" || activeSection.type === "cta") && (
                      <div className="pt-2 border-t border-white/8 space-y-3">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--site-accent)]">
                          Action Buttons
                        </p>
                        <div>
                          <label className="block text-[11px] text-white/60 mb-1">
                            Primary Button Text
                          </label>
                          <input
                            type="text"
                            value={activeSection.content.primaryBtnText || ""}
                            onChange={(e) => updateSectionContent("primaryBtnText", e.target.value)}
                            className="input-site text-xs py-1.5"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-white/60 mb-1">
                            Primary Button Link
                          </label>
                          <input
                            type="text"
                            value={activeSection.content.primaryBtnLink || ""}
                            onChange={(e) => updateSectionContent("primaryBtnLink", e.target.value)}
                            className="input-site text-xs py-1.5 font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── 2. LAYOUT & ALIGNMENT TAB ─────────────────────────────── */}
                {settingsGroup === "layout" && (
                  <div className="space-y-5">
                    {/* Horizontal Alignment */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Horizontal Alignment
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["left", "center", "right"] as HorizontalAlign[]).map((align) => (
                          <button
                            key={align}
                            type="button"
                            onClick={() => updateSectionLayout("horizontalAlign", align)}
                            className={cn(
                              "py-2 text-xs font-semibold rounded-lg border capitalize transition-all",
                              activeSection.layout.horizontalAlign === align
                                ? "bg-[var(--site-accent)] text-[#070a13] border-[var(--site-accent)] font-bold shadow-md"
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                            )}
                          >
                            {align}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Container Content Width */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Content Width Container
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(
                          [
                            { key: "narrow", label: "Narrow (4xl)" },
                            { key: "standard", label: "Standard (5xl)" },
                            { key: "wide", label: "Wide (7xl)" },
                            { key: "full", label: "Full Width" },
                          ] as { key: ContentWidth; label: string }[]
                        ).map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => updateSectionLayout("contentWidth", opt.key)}
                            className={cn(
                              "py-2 text-xs font-semibold rounded-lg border transition-all",
                              activeSection.layout.contentWidth === opt.key
                                ? "bg-[var(--site-accent)] text-[#070a13] border-[var(--site-accent)] font-bold shadow-md"
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Layout Presets */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Layout Structure Preset
                      </label>
                      <select
                        value={activeSection.layout.layoutPreset}
                        onChange={(e) => updateSectionLayout("layoutPreset", e.target.value as LayoutPreset)}
                        className="input-site text-xs py-2 bg-[#090d16]"
                      >
                        <option value="single-column">Single Column</option>
                        <option value="two-column-split">Two Columns (Split Content)</option>
                        <option value="three-column-cards">Three-Column Cards Grid</option>
                        <option value="four-column-cards">Four-Column Cards Grid</option>
                        <option value="hero-executive">Executive Two-Column Briefing</option>
                        <option value="centered-editorial">Centered Editorial Focus</option>
                      </select>
                    </div>

                    {/* Mobile Responsive Behaviors */}
                    <div className="pt-3 border-t border-white/8 space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--site-accent)]">
                        Responsive Behavior
                      </p>
                      <label className="flex items-center gap-2.5 text-xs text-white/80 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeSection.layout.mobileTextCenter || false}
                          onChange={(e) => updateSectionLayout("mobileTextCenter", e.target.checked)}
                          className="accent-[var(--site-accent)] rounded"
                        />
                        <span>Center text automatically on mobile screens</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-xs text-white/80 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeSection.layout.mobileStackReverse || false}
                          onChange={(e) => updateSectionLayout("mobileStackReverse", e.target.checked)}
                          className="accent-[var(--site-accent)] rounded"
                        />
                        <span>Reverse column stack on mobile</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* ── 3. SPACING & TYPOGRAPHY TAB ──────────────────────────── */}
                {settingsGroup === "style" && (
                  <div className="space-y-5">
                    {/* Vertical Spacing Padding */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Section Vertical Padding
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          [
                            { key: "compact", label: "Compact" },
                            { key: "comfortable", label: "Normal" },
                            { key: "spacious", label: "Spacious" },
                          ] as { key: SpacingPreset; label: string }[]
                        ).map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => updateSectionLayout("spacing", opt.key)}
                            className={cn(
                              "py-2 text-xs font-semibold rounded-lg border transition-all",
                              activeSection.layout.spacing === opt.key
                                ? "bg-[var(--site-accent)] text-[#070a13] border-[var(--site-accent)] font-bold shadow-md"
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Heading Size */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Heading Scale
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["medium", "large", "extra-large"] as HeadingSize[]).map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => updateSectionLayout("headingSize", sz)}
                            className={cn(
                              "py-2 text-xs font-semibold rounded-lg border capitalize transition-all",
                              activeSection.layout.headingSize === sz
                                ? "bg-[var(--site-accent)] text-[#070a13] border-[var(--site-accent)] font-bold shadow-md"
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                            )}
                          >
                            {sz.replace("-", " ")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Eyebrow Toggle */}
                    <div>
                      <label className="flex items-center gap-2.5 text-xs text-white/80 cursor-pointer pt-2">
                        <input
                          type="checkbox"
                          checked={activeSection.layout.showEyebrow}
                          onChange={(e) => updateSectionLayout("showEyebrow", e.target.checked)}
                          className="accent-[var(--site-accent)] rounded"
                        />
                        <span>Display upper section badge / eyebrow</span>
                      </label>
                    </div>

                    {/* Reset section button */}
                    <div className="pt-6 border-t border-white/8">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Reset this section's layout and alignment to defaults?")) {
                            updateSectionLayout("horizontalAlign", "left");
                            updateSectionLayout("contentWidth", "wide");
                            updateSectionLayout("spacing", "comfortable");
                            updateSectionLayout("headingSize", "large");
                          }
                        }}
                        className="btn-outline w-full text-xs py-2 flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw size={12} />
                        <span>Reset Section Layout to Defaults</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ── 4. MOTION & ANIMATION TAB ──────────────────────────── */}
                {settingsGroup === "motion" && (
                  <div className="space-y-5">
                    {/* Master Animation Toggle & Replay */}
                    <div className="bg-[#090d16] p-3.5 rounded-xl border border-white/8 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">
                            Section Motion
                          </span>
                          <span className="text-[10px] text-white/40">
                            Viewport-triggered entrance &amp; interactions
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!activeSection.animation?.disabled}
                            onChange={(e) =>
                              updateSectionAnimation("disabled", !e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--site-accent)]" />
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPreviewKey((k) => k + 1)}
                        className="btn-outline w-full text-xs py-2 flex items-center justify-center gap-1.5"
                      >
                        <Play size={12} className="text-[var(--site-accent)]" />
                        <span>Replay Section Animation</span>
                      </button>
                    </div>

                    {/* Entrance Animation */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Entrance Animation
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(
                          [
                            { key: "fade-up", label: "Fade Up (Default)" },
                            { key: "fade-in", label: "Fade In" },
                            { key: "fade-left", label: "Fade From Left" },
                            { key: "fade-right", label: "Fade From Right" },
                            { key: "scale-in", label: "Scale In" },
                            { key: "mask-reveal", label: "Mask Reveal" },
                            { key: "none", label: "None (Static)" },
                          ] as { key: EntranceAnimation; label: string }[]
                        ).map((opt) => {
                          const isSel =
                            (activeSection.animation?.entrance || "fade-up") === opt.key;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => updateSectionAnimation("entrance", opt.key)}
                              className={cn(
                                "py-2 px-2.5 text-xs font-semibold rounded-lg border text-left transition-all",
                                isSel
                                  ? "bg-[var(--site-accent)] text-[#070a13] border-[var(--site-accent)] font-bold shadow-md"
                                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                              )}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Duration & Delay */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                          Duration
                        </label>
                        <select
                          value={activeSection.animation?.duration || "normal"}
                          onChange={(e) =>
                            updateSectionAnimation("duration", e.target.value as AnimationDuration)
                          }
                          className="input-site text-xs py-2 bg-[#090d16]"
                        >
                          <option value="short">Short (350ms)</option>
                          <option value="normal">Normal (550ms)</option>
                          <option value="slow">Slow (800ms)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                          Delay
                        </label>
                        <select
                          value={activeSection.animation?.delay || "none"}
                          onChange={(e) =>
                            updateSectionAnimation("delay", e.target.value as AnimationDelay)
                          }
                          className="input-site text-xs py-2 bg-[#090d16]"
                        >
                          <option value="none">None (0ms)</option>
                          <option value="short">Short (150ms)</option>
                          <option value="staggered">Staggered (300ms)</option>
                        </select>
                      </div>
                    </div>

                    {/* Trigger Mode */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Animation Trigger
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: "scroll", label: "On Scroll into View" },
                          { key: "load", label: "On Page Load" },
                        ].map((trig) => {
                          const isSel = (activeSection.animation?.trigger || "scroll") === trig.key;
                          return (
                            <button
                              key={trig.key}
                              type="button"
                              onClick={() =>
                                updateSectionAnimation("trigger", trig.key as AnimationTrigger)
                              }
                              className={cn(
                                "py-2 text-xs font-semibold rounded-lg border text-center transition-all",
                                isSel
                                  ? "bg-[var(--site-accent)] text-[#070a13] border-[var(--site-accent)] font-bold shadow-md"
                                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                              )}
                            >
                              {trig.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interaction Effects */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Interactive Hover Effect
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(
                          [
                            { key: "subtle-lift", label: "Subtle Lift (-4px)" },
                            { key: "image-zoom", label: "Image Zoom" },
                            { key: "soft-glow", label: "Soft Glow" },
                            { key: "border-highlight", label: "Border Accent" },
                            { key: "none", label: "None" },
                          ] as { key: InteractionEffect; label: string }[]
                        ).map((eff) => {
                          const isSel =
                            (activeSection.animation?.interaction || "subtle-lift") === eff.key;
                          return (
                            <button
                              key={eff.key}
                              type="button"
                              onClick={() => updateSectionAnimation("interaction", eff.key)}
                              className={cn(
                                "py-2 px-2 text-xs font-semibold rounded-lg border text-left transition-all",
                                isSel
                                  ? "bg-[var(--site-accent)] text-[#070a13] border-[var(--site-accent)] font-bold shadow-md"
                                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                              )}
                            >
                              {eff.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Motion Intensity */}
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Motion Intensity
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          [
                            { key: "minimal", label: "Minimal" },
                            { key: "balanced", label: "Balanced" },
                            { key: "expressive", label: "Expressive" },
                          ] as { key: MotionIntensity; label: string }[]
                        ).map((int) => {
                          const isSel =
                            (activeSection.animation?.intensity || "balanced") === int.key;
                          return (
                            <button
                              key={int.key}
                              type="button"
                              onClick={() => updateSectionAnimation("intensity", int.key)}
                              className={cn(
                                "py-2 text-xs font-semibold rounded-lg border text-center transition-all",
                                isSel
                                  ? "bg-[var(--site-accent)] text-[#070a13] border-[var(--site-accent)] font-bold shadow-md"
                                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                              )}
                            >
                              {int.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Reset Motion settings */}
                    <div className="pt-4 border-t border-white/8">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Reset animation settings to balanced defaults?")) {
                            updateSectionAnimation("entrance", "fade-up");
                            updateSectionAnimation("duration", "normal");
                            updateSectionAnimation("delay", "none");
                            updateSectionAnimation("trigger", "scroll");
                            updateSectionAnimation("interaction", "subtle-lift");
                            updateSectionAnimation("intensity", "balanced");
                            updateSectionAnimation("disabled", false);
                          }
                        }}
                        className="btn-outline w-full text-xs py-2 flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw size={12} />
                        <span>Reset Animation to Defaults</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-white/40">
              <Layers size={32} className="mb-2 text-white/20" />
              <p className="text-xs">No section selected</p>
              <p className="text-[11px] text-white/30 mt-1">
                Click any section in the manager or preview canvas to customize it.
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* ── SECTION LIBRARY MODAL ─────────────────────────────────── */}
      {isLibraryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="bg-[#0c1220] border border-white/12 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-white/8 flex items-center justify-between bg-[#070a10]">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-[var(--site-accent)]" />
                  Add New Section to Website
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Choose a section type to insert into your page layout.
                </p>
              </div>
              <button
                onClick={() => setIsLibraryOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECTION_LIBRARY.map((item) => (
                <div
                  key={item.type}
                  onClick={() => addSection(item)}
                  className="bg-[#070a13] border border-white/8 rounded-xl p-4 cursor-pointer hover:border-[var(--site-accent)]/50 hover:bg-white/4 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--site-accent)]">
                        {item.category}
                      </span>
                      {item.isSingleton && (
                        <span className="text-[9px] font-mono text-white/40">Core singleton</span>
                      )}
                    </div>
                    <h4 className="font-bold text-white text-sm group-hover:text-[var(--site-accent)] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/6 flex items-center justify-between text-xs text-white/50 group-hover:text-white">
                    <span>Click to add</span>
                    <Plus size={14} className="group-hover:scale-125 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── RECOVERABLE TRASH DRAWER ──────────────────────────────── */}
      {isTrashOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="bg-[#0c1220] border border-white/12 rounded-2xl max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-white/8 flex items-center justify-between bg-[#070a10]">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Trash2 size={16} className="text-red-400" />
                  Recoverable Section Trash ({config.trash?.length || 0})
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Soft-deleted sections can be restored to the page or permanently purged.
                </p>
              </div>
              <button
                onClick={() => setIsTrashOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3 flex-1">
              {!config.trash || config.trash.length === 0 ? (
                <div className="text-center py-10 text-white/40 text-xs">
                  Trash is empty. No deleted sections.
                </div>
              ) : (
                config.trash.map((sec) => (
                  <div
                    key={sec.id}
                    className="p-3 rounded-xl bg-white/4 border border-white/8 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-white text-xs">{sec.title}</p>
                      <p className="text-[10px] text-white/40">
                        Type: {sec.type} · Deleted {sec.deletedAt ? new Date(sec.deletedAt).toLocaleTimeString() : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => restoreFromTrash(sec.id)}
                        className="btn-outline py-1 px-2.5 text-xs inline-flex items-center gap-1 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                      >
                        <RotateCcw size={11} /> Restore
                      </button>
                      <button
                        onClick={() => permanentlyDelete(sec.id)}
                        className="p-1 text-white/40 hover:text-red-400"
                        title="Purge permanently"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PUBLISH CONFIRMATION MODAL ────────────────────────────── */}
      {isPublishModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="bg-[#0c1220] border border-white/12 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Send size={16} className="text-[var(--site-accent)]" />
              Publish Website Configuration Live?
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              This will update the live public website for all visitors immediately. Vercel deployment
              is not required.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/8 text-xs text-white/70 space-y-1">
              <div className="flex justify-between">
                <span>Active Sections on Page:</span>
                <span className="font-bold text-white">{config.sections.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Visible Sections:</span>
                <span className="font-bold text-emerald-400">
                  {config.sections.filter((s) => !s.isHidden).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Hidden Sections (Drafted):</span>
                <span className="font-bold text-amber-400">
                  {config.sections.filter((s) => s.isHidden).length}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/6">
                <span>Header Navigation Bar:</span>
                <span
                  className={
                    config.showHeader === false
                      ? "font-bold text-amber-400"
                      : "font-bold text-emerald-400"
                  }
                >
                  {config.showHeader === false ? "Removed (Hidden)" : "Visible"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Footer Section:</span>
                <span
                  className={
                    config.showFooter === false
                      ? "font-bold text-amber-400"
                      : "font-bold text-emerald-400"
                  }
                >
                  {config.showFooter === false ? "Removed (Hidden)" : "Visible"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(false)}
                className="btn-outline text-xs py-2 px-4"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePublishLive}
                disabled={isPending}
                className="btn-primary text-xs py-2 px-5 font-bold shadow-lg shadow-[#d4af37]/20"
              >
                Confirm &amp; Publish Live
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
