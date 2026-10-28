"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Save,
  Send,
  Eye,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { SectionKey } from "@/types/cms";
import { saveSectionContent, uploadCmsAsset } from "@/lib/actions";

interface SectionEditorProps {
  sectionKey: SectionKey;
  initialContent: any;
  title: string;
  description: string;
}

export function SectionEditor({
  sectionKey,
  initialContent,
  title,
  description,
}: SectionEditorProps) {
  const [content, setContent] = useState<any>(initialContent || {});
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );
  const [uploadingAsset, setUploadingAsset] = useState(false);

  function updateField(key: string, val: any) {
    setContent((prev: any) => ({ ...prev, [key]: val }));
  }

  async function handleSave(status: "draft" | "published") {
    if (status === "draft") setSaving(true);
    else setPublishing(true);
    setStatusMsg(null);

    try {
      await saveSectionContent(sectionKey, content, status);
      setStatusMsg({
        type: "success",
        text: status === "published" ? "Content published live successfully!" : "Draft saved successfully.",
      });
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err.message || "Failed to save section content",
      });
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, fieldName: string) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAsset(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadCmsAsset(formData);
      updateField(fieldName, res.url);
      setStatusMsg({ type: "success", text: "Image uploaded successfully." });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Upload failed" });
    } finally {
      setUploadingAsset(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "edit"
                ? "bg-[var(--site-accent)] text-[#090d16]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Form Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "preview"
                ? "bg-[var(--site-accent)] text-[#090d16]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Eye size={13} />
            Interactive Preview
          </button>
        </div>

        <div className="flex items-center gap-2.5">
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
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {/* Status banner */}
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

      {/* Editor Body */}
      {activeTab === "edit" ? (
        <div className="glass-card p-6 md:p-8 space-y-6">
          {/* RENDER SPECIFIC SECTION FORM */}
          {sectionKey === "hero" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Cohort Badge
                  </label>
                  <input
                    type="text"
                    value={content.badge || ""}
                    onChange={(e) => updateField("badge", e.target.value)}
                    className="input-site text-sm"
                    placeholder="Academic Batch 2026–2028"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Subtitle / University
                  </label>
                  <input
                    type="text"
                    value={content.subtitle || ""}
                    onChange={(e) => updateField("subtitle", e.target.value)}
                    className="input-site text-sm"
                    placeholder="Cochin University of Science and Technology (CUSAT)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={content.title || ""}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="input-site text-sm"
                    placeholder="Centre for Budget Studies"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Title Highlight Brand
                  </label>
                  <input
                    type="text"
                    value={content.titleHighlight || ""}
                    onChange={(e) => updateField("titleHighlight", e.target.value)}
                    className="input-site text-sm"
                    placeholder="CBS Collective"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Hero Narrative / Description
                </label>
                <textarea
                  rows={4}
                  value={content.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="input-site text-sm"
                  placeholder="A premier academic and policy research institute..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Primary Button Label
                  </label>
                  <input
                    type="text"
                    value={content.primaryBtnText || ""}
                    onChange={(e) => updateField("primaryBtnText", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Primary Button Destination Link
                  </label>
                  <input
                    type="text"
                    value={content.primaryBtnLink || ""}
                    onChange={(e) => updateField("primaryBtnLink", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Secondary Button Label
                  </label>
                  <input
                    type="text"
                    value={content.secondaryBtnText || ""}
                    onChange={(e) => updateField("secondaryBtnText", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Secondary Button Destination Link
                  </label>
                  <input
                    type="text"
                    value={content.secondaryBtnLink || ""}
                    onChange={(e) => updateField("secondaryBtnLink", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/8 space-y-3">
                <label className="text-xs font-semibold text-white/80 block">
                  Background Banner Image & Overlay
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={content.bgImageUrl || ""}
                    onChange={(e) => updateField("bgImageUrl", e.target.value)}
                    className="input-site text-sm flex-1"
                    placeholder="https://... or upload below"
                  />
                  <label className="btn-outline text-xs py-2 px-3 cursor-pointer shrink-0">
                    <ImageIcon size={14} />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "bgImageUrl")}
                      className="hidden"
                      disabled={uploadingAsset}
                    />
                  </label>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs text-white/60">Overlay Darkness:</span>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    value={content.overlayOpacity || 70}
                    onChange={(e) => updateField("overlayOpacity", parseInt(e.target.value, 10))}
                    className="flex-1 accent-[var(--site-accent)]"
                  />
                  <span className="text-xs font-mono text-[var(--site-accent)]">
                    {content.overlayOpacity || 70}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {sectionKey === "about" && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.title || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="input-site text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Summary Lead Description
                </label>
                <textarea
                  rows={3}
                  value={content.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="input-site text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-white/80 block">
                  Detailed Paragraphs
                </label>
                {(content.paragraphs || []).map((p: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <textarea
                      rows={3}
                      value={p}
                      onChange={(e) => {
                        const next = [...(content.paragraphs || [])];
                        next[idx] = e.target.value;
                        updateField("paragraphs", next);
                      }}
                      className="input-site text-sm flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = content.paragraphs.filter((_: any, i: number) => i !== idx);
                        updateField("paragraphs", next);
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg self-start"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateField("paragraphs", [...(content.paragraphs || []), ""])
                  }
                  className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
                >
                  <Plus size={13} /> Add Paragraph
                </button>
              </div>
            </div>
          )}

          {sectionKey === "vision_mission" && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Official Vision Statement
                </label>
                <textarea
                  rows={3}
                  value={content.vision || ""}
                  onChange={(e) => updateField("vision", e.target.value)}
                  className="input-site text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Strategic Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={content.mission || ""}
                  onChange={(e) => updateField("mission", e.target.value)}
                  className="input-site text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-white/80 block">
                  Pillars / Core Values
                </label>
                {(content.pillars || []).map((pillar: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/8 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={pillar.title || ""}
                        onChange={(e) => {
                          const next = [...content.pillars];
                          next[idx] = { ...pillar, title: e.target.value };
                          updateField("pillars", next);
                        }}
                        className="input-site text-sm font-semibold flex-1"
                        placeholder="Pillar Title"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const next = content.pillars.filter((_: any, i: number) => i !== idx);
                          updateField("pillars", next);
                        }}
                        className="p-2 ml-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={pillar.description || ""}
                      onChange={(e) => {
                        const next = [...content.pillars];
                        next[idx] = { ...pillar, description: e.target.value };
                        updateField("pillars", next);
                      }}
                      className="input-site text-sm"
                      placeholder="Description"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateField("pillars", [
                      ...(content.pillars || []),
                      { title: "New Pillar", description: "" },
                    ])
                  }
                  className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
                >
                  <Plus size={13} /> Add Pillar
                </button>
              </div>
            </div>
          )}

          {sectionKey === "achievements" && (
            <div className="space-y-4">
              <label className="text-xs font-semibold text-white/80 block">
                Timeline Items & Historical Milestones
              </label>
              {(content.items || []).map((item: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/8 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={item.year || ""}
                      onChange={(e) => {
                        const next = [...content.items];
                        next[idx] = { ...item, year: e.target.value };
                        updateField("items", next);
                      }}
                      className="input-site text-sm w-32 font-bold text-[var(--site-accent)]"
                      placeholder="Year / Era"
                    />
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => {
                        const next = [...content.items];
                        next[idx] = { ...item, title: e.target.value };
                        updateField("items", next);
                      }}
                      className="input-site text-sm font-semibold flex-1"
                      placeholder="Milestone Title"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = content.items.filter((_: any, i: number) => i !== idx);
                        updateField("items", next);
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={item.description || ""}
                    onChange={(e) => {
                      const next = [...content.items];
                      next[idx] = { ...item, description: e.target.value };
                      updateField("items", next);
                    }}
                    className="input-site text-sm"
                    placeholder="Milestone description"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateField("items", [
                    ...(content.items || []),
                    { year: "2026", title: "New Milestone", description: "" },
                  ])
                }
                className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                <Plus size={13} /> Add Milestone
              </button>
            </div>
          )}

          {sectionKey === "programme" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Programme Name
                  </label>
                  <input
                    type="text"
                    value={content.degreeName || ""}
                    onChange={(e) => updateField("degreeName", e.target.value)}
                    className="input-site text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={content.duration || ""}
                    onChange={(e) => updateField("duration", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Batch Intake
                  </label>
                  <input
                    type="text"
                    value={content.intake || ""}
                    onChange={(e) => updateField("intake", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Eligibility Criteria
                  </label>
                  <input
                    type="text"
                    value={content.eligibility || ""}
                    onChange={(e) => updateField("eligibility", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Programme Overview
                </label>
                <textarea
                  rows={3}
                  value={content.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="input-site text-sm"
                />
              </div>
            </div>
          )}

          {sectionKey === "announcements" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/8">
                <input
                  type="checkbox"
                  id="ann-enabled"
                  checked={!!content.enabled}
                  onChange={(e) => updateField("enabled", e.target.checked)}
                  className="w-4 h-4 rounded accent-[var(--site-accent)]"
                />
                <label htmlFor="ann-enabled" className="text-sm font-semibold text-white cursor-pointer">
                  Display Announcement Banner at the top of the homepage
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Banner Tag / Badge
                </label>
                <input
                  type="text"
                  value={content.badge || ""}
                  onChange={(e) => updateField("badge", e.target.value)}
                  className="input-site text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Announcement Message
                </label>
                <textarea
                  rows={2}
                  value={content.message || ""}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="input-site text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Link Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={content.linkText || ""}
                    onChange={(e) => updateField("linkText", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Link URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={content.linkUrl || ""}
                    onChange={(e) => updateField("linkUrl", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {sectionKey === "footer" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    value={content.name || ""}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    University
                  </label>
                  <input
                    type="text"
                    value={content.university || ""}
                    onChange={(e) => updateField("university", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Official Postal Address
                </label>
                <input
                  type="text"
                  value={content.address || ""}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="input-site text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Official Contact Email
                  </label>
                  <input
                    type="email"
                    value={content.email || ""}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={content.phone || ""}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="input-site text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Fallback for other sections (curriculum, research, faculty) - JSON/General editor */}
          {!["hero", "about", "vision_mission", "achievements", "programme", "announcements", "footer"].includes(
            sectionKey
          ) && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.title || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="input-site text-sm font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Lead Description
                </label>
                <textarea
                  rows={3}
                  value={content.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="input-site text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">
                  Data Records (JSON Format)
                </label>
                <textarea
                  rows={12}
                  value={JSON.stringify(content.semesters || content.areas || content.members || {}, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      if (content.semesters) updateField("semesters", parsed);
                      else if (content.areas) updateField("areas", parsed);
                      else if (content.members) updateField("members", parsed);
                    } catch {}
                  }}
                  className="input-site text-xs font-mono"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Interactive Preview */
        <div className="glass-card p-8 border-[var(--site-accent)]/20 relative overflow-hidden">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[var(--site-accent)] mb-4 flex items-center gap-1.5">
            <Eye size={12} /> Live Preview Rendering
          </div>

          <div className="p-6 rounded-2xl bg-[#090d16] border border-white/10 space-y-4">
            {content.badge && (
              <span className="section-label">{content.badge}</span>
            )}
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {content.title || title}{" "}
              {content.titleHighlight && (
                <span className="text-[var(--site-accent)]">{content.titleHighlight}</span>
              )}
            </h2>
            {content.subtitle && (
              <p className="text-sm font-semibold text-white/70">{content.subtitle}</p>
            )}
            {content.description && (
              <p className="text-sm text-white/60 leading-relaxed max-w-3xl">
                {content.description}
              </p>
            )}

            {content.primaryBtnText && (
              <div className="pt-2 flex gap-3">
                <span className="btn-primary text-xs py-2 px-4 cursor-default">
                  {content.primaryBtnText}
                </span>
                {content.secondaryBtnText && (
                  <span className="btn-outline text-xs py-2 px-4 cursor-default">
                    {content.secondaryBtnText}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
