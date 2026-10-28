"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  Plus,
  X,
  Upload,
  CheckCircle2,
  FileText,
  Camera,
  Crop,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { cn, getStorageUrl } from "@/lib/utils";
import { ImageCropperModal } from "@/components/admin/ImageCropperModal";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";

interface StudentFormProps {
  mode: "create" | "edit";
  studentId?: string;
  defaultValues?: {
    full_name: string;
    interests: string[];
    introduction: string;
    linkedin_url: string;
    display_order: number;
    published: boolean;
    photo_path?: string | null;
    cv_path?: string | null;
  };
  action: (formData: FormData) => Promise<void>;
}

const COMMON_SPECIALISATIONS = [
  "Fiscal Policy",
  "Public Finance",
  "Econometrics",
  "Macroeconomic Modelling",
  "Tax Policy & Administration",
  "Development Economics",
  "Applied Statistics",
  "State Finances",
];

export function StudentForm({ mode, defaultValues, action }: StudentFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(defaultValues?.full_name ?? "");
  const [introduction, setIntroduction] = useState(defaultValues?.introduction ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(defaultValues?.linkedin_url ?? "");
  const [displayOrder, setDisplayOrder] = useState<number>(defaultValues?.display_order ?? 1);
  const [published, setPublished] = useState<boolean>(defaultValues?.published ?? false);

  // Interests tags
  const [interests, setInterests] = useState<string[]>(defaultValues?.interests ?? []);
  const [interestInput, setInterestInput] = useState("");

  // Photo state
  const existingPhotoUrl = defaultValues?.photo_path
    ? getStorageUrl("student-photos", defaultValues.photo_path)
    : null;
  const [photoPreview, setPhotoPreview] = useState<string | null>(existingPhotoUrl);
  const [croppedPhotoFile, setCroppedPhotoFile] = useState<File | null>(null);

  // Image Cropper Modal state
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [rawFileName, setRawFileName] = useState<string>("portrait.jpg");

  // CV state
  const [cvFileName, setCvFileName] = useState<string | null>(
    defaultValues?.cv_path ? "Existing CV on file" : null
  );
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [deleteCv, setDeleteCv] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

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

  function markDirty() {
    if (!isDirty) setIsDirty(true);
  }

  // Handle Photo Selection -> triggers ImageCropperModal
  function handlePhotoFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG, PNG, or WebP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Original photo file size exceeds 10MB.");
      return;
    }

    setError(null);
    setRawFileName(file.name);
    const objectUrl = URL.createObjectURL(file);
    setRawImageSrc(objectUrl);
    setIsCropperOpen(true);

    // Reset input so user can choose the same file again if desired
    e.target.value = "";
  }

  // Handle Completed Crop from modal
  function handleCropComplete(file: File, previewUrl: string) {
    setCroppedPhotoFile(file);
    setPhotoPreview(previewUrl);
    markDirty();
  }

  // Handle CV Selection
  function handleCvFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Curriculum Vitae must be in PDF format.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("CV file size exceeds 10MB limit.");
      return;
    }

    setError(null);
    setDeleteCv(false);
    setCvFile(file);
    setCvFileName(file.name);
    markDirty();
  }

  // Handle CV Deletion
  function handleDeleteCv() {
    setCvFile(null);
    setCvFileName(null);
    if (defaultValues?.cv_path) {
      setDeleteCv(true);
    }
    if (cvInputRef.current) {
      cvInputRef.current.value = "";
    }
    markDirty();
  }

  // Interests helpers
  function addInterest(valToAdd?: string) {
    const val = (valToAdd || interestInput).trim();
    if (val && !interests.includes(val)) {
      setInterests([...interests, val]);
      markDirty();
    }
    if (!valToAdd) {
      setInterestInput("");
    }
  }

  function removeInterest(item: string) {
    setInterests(interests.filter((i) => i !== item));
    markDirty();
  }

  // Form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Scholar's full name is required.");
      return;
    }

    if (linkedinUrl.trim()) {
      try {
        const parsed = new URL(linkedinUrl.trim());
        if (!parsed.hostname.includes("linkedin.com")) {
          setError("LinkedIn URL must be a valid linkedin.com address.");
          return;
        }
      } catch {
        setError("Please enter a valid URL (including https://).");
        return;
      }
    }

    const formData = new FormData();
    formData.append("full_name", fullName.trim());
    formData.append("interests", interests.join(","));
    formData.append("introduction", introduction.trim());
    formData.append("linkedin_url", linkedinUrl.trim());
    formData.append("display_order", String(displayOrder));
    formData.append("published", published ? "true" : "false");

    if (croppedPhotoFile) {
      formData.append("photo", croppedPhotoFile);
    }

    if (deleteCv) {
      formData.append("delete_cv", "true");
    } else if (cvFile) {
      formData.append("cv", cvFile);
    }

    startTransition(async () => {
      try {
        setIsDirty(false);
        await action(formData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
        setIsDirty(true);
      }
    });
  }

  const labelCls = "block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5";
  const inputCls = "input-site text-sm";

  return (
    <>
      {/* Image Cropper Modal */}
      {rawImageSrc && (
        <ImageCropperModal
          isOpen={isCropperOpen}
          imageSrc={rawImageSrc}
          originalFileName={rawFileName}
          onClose={() => setIsCropperOpen(false)}
          onApplyCrop={handleCropComplete}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="flex items-center gap-3 bg-red-500/15 border border-red-500/30 rounded-xl px-5 py-3.5 text-red-200 text-sm shadow-lg animate-in fade-in"
          >
            <AlertCircle size={18} className="text-red-400 shrink-0" />
            <p className="flex-1">{error}</p>
          </div>
        )}

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ──────────────── LEFT COLUMN (Cols 1-4): Photo & Status ──────────────── */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Section A: Profile Photo (1:1 Ratio) */}
            <div className="glass-card p-6 border-white/8 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/8">
                <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                  <Camera size={15} className="text-[var(--site-accent)]" />
                  Profile Photo (1:1)
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Standardized 512px
                </span>
              </div>

              {/* 1:1 Square Preview Box */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-white/10 bg-[#0a0f1d] shadow-inner group">
                {photoPreview ? (
                  <>
                    <Image
                      src={photoPreview}
                      alt="Scholar photo preview"
                      fill
                      className="object-cover object-center"
                      unoptimized={photoPreview.startsWith("blob:")}
                    />
                    {/* Hover Overlay with Action Buttons */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-primary py-1.5 px-3 text-xs w-full justify-center"
                      >
                        <Camera size={13} />
                        Replace Photo
                      </button>
                      {rawImageSrc && (
                        <button
                          type="button"
                          onClick={() => setIsCropperOpen(true)}
                          className="btn-outline py-1.5 px-3 text-xs w-full justify-center"
                        >
                          <Crop size={13} />
                          Re-crop Area
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-white/4 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-white/40 group-hover:text-[var(--site-accent)] group-hover:border-[var(--site-accent)]/40 transition-colors">
                      <Camera size={24} />
                    </div>
                    <p className="text-xs font-semibold text-white/80">Click to Select Photo</p>
                    <p className="text-[11px] text-white/40 mt-1">
                      JPEG, PNG, or WebP. Auto-prompts 1:1 square crop.
                    </p>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoFileSelected}
                className="hidden"
                id="student-photo-input"
              />

              {photoPreview && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 size={13} /> Ready for publish
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[var(--site-accent)] hover:underline text-xs"
                  >
                    Change photo
                  </button>
                </div>
              )}
            </div>

            {/* Visibility & Display Sequence */}
            <div className="glass-card p-6 border-white/8 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white tracking-wide pb-3 border-b border-white/8">
                Publishing &amp; Order
              </h3>

              {/* Published Toggle */}
              <div>
                <label className={labelCls}>Visibility Status</label>
                <button
                  type="button"
                  onClick={() => {
                    setPublished(!published);
                    markDirty();
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold transition-all",
                    published
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-sm"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/8"
                  )}
                  aria-pressed={published}
                >
                  <div className="flex items-center gap-2.5">
                    {published ? <Eye size={16} /> : <EyeOff size={16} />}
                    <span>{published ? "Published (Live)" : "Draft (Hidden)"}</span>
                  </div>
                  <span
                    className={cn(
                      "w-2.5 h-2.5 rounded-full",
                      published ? "bg-emerald-400 animate-pulse" : "bg-white/30"
                    )}
                  />
                </button>
                <p className="text-[11px] text-white/40 mt-1.5 leading-normal">
                  {published
                    ? "Visible on the public CBS directory & downloadable resume."
                    : "Hidden from public view. Only accessible in the admin dashboard."}
                </p>
              </div>

              {/* Display Order */}
              <div className="pt-2">
                <label htmlFor="sf-order" className={labelCls}>
                  Batch Sequence / Scholar Order
                </label>
                <input
                  id="sf-order"
                  name="display_order"
                  type="number"
                  min={1}
                  max={99}
                  value={displayOrder}
                  onChange={(e) => {
                    setDisplayOrder(parseInt(e.target.value, 10) || 1);
                    markDirty();
                  }}
                  className={inputCls}
                />
                <p className="text-[11px] text-white/40 mt-1">
                  Determines position in the 26-scholar grid (e.g. 1 through 26).
                </p>
              </div>
            </div>
          </div>

          {/* ──────────────── RIGHT COLUMN (Cols 5-12): Profile Details ──────────────── */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section B: Personal Information */}
            <div className="glass-card p-6 md:p-8 border-white/8 shadow-xl space-y-5">
              <div className="pb-3 border-b border-white/8">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Scholar Information
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Official name and biographical overview for Academic Batch 2026–2028.
                </p>
              </div>

              <div>
                <label htmlFor="sf-fullname" className={labelCls}>
                  Full Name <span className="text-[var(--site-accent)]">*</span>
                </label>
                <input
                  id="sf-fullname"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    markDirty();
                  }}
                  placeholder="e.g. Ananya S. Menon"
                  className={cn(inputCls, "text-base py-3")}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="sf-intro" className={labelCls}>
                    Biography &amp; Academic Focus
                  </label>
                  <span className="text-[11px] font-mono text-white/40">
                    {introduction.length} characters
                  </span>
                </div>
                <textarea
                  id="sf-intro"
                  rows={4}
                  value={introduction}
                  onChange={(e) => {
                    setIntroduction(e.target.value);
                    markDirty();
                  }}
                  placeholder="Summarize the scholar's research focus, academic background, key strengths, or career aspirations at the Centre for Budget Studies…"
                  className={cn(inputCls, "resize-y min-h-[110px] leading-relaxed")}
                />
              </div>
            </div>

            {/* Section C: Areas of Interest & Specialisations */}
            <div className="glass-card p-6 md:p-8 border-white/8 shadow-xl space-y-5">
              <div className="pb-3 border-b border-white/8">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Sparkles size={16} className="text-[var(--site-accent)]" />
                  Academic Specialisations &amp; Interests
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Add tags to power search filters and spotlight candidate expertise.
                </p>
              </div>

              {/* Tag Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addInterest();
                    }
                  }}
                  placeholder="Type a specialisation and press Enter or 'Add'…"
                  className={cn(inputCls, "flex-1")}
                  id="sf-interest-input"
                />
                <button
                  type="button"
                  onClick={() => addInterest()}
                  className="btn-outline shrink-0 text-xs py-2 px-4"
                >
                  <Plus size={14} />
                  Add Tag
                </button>
              </div>

              {/* Active Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {interests.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--site-accent)]/15 border border-[var(--site-accent)]/30 text-white shadow-sm"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeInterest(item)}
                      className="text-white/50 hover:text-red-400 transition-colors"
                      aria-label={`Remove ${item}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {interests.length === 0 && (
                  <p className="text-xs text-white/40 italic">
                    No specialisation tags added yet. Choose from common tags below or type your own.
                  </p>
                )}
              </div>

              {/* Quick suggestion tags */}
              <div className="pt-3 border-t border-white/8">
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
                  Suggested Economics &amp; Budget Domains:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_SPECIALISATIONS.map((spec) => {
                    const alreadyAdded = interests.includes(spec);
                    return (
                      <button
                        key={spec}
                        type="button"
                        disabled={alreadyAdded}
                        onClick={() => addInterest(spec)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border",
                          alreadyAdded
                            ? "bg-white/3 border-white/5 text-white/30 cursor-default"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-[var(--site-accent)]/40"
                        )}
                      >
                        + {spec}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section D: Links & CV Documents */}
            <div className="glass-card p-6 md:p-8 border-white/8 shadow-xl space-y-5">
              <div className="pb-3 border-b border-white/8">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <FileText size={16} className="text-[var(--site-accent)]" />
                  Links &amp; Curriculum Vitae
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Connect professional LinkedIn profiles and attach verified academic CVs.
                </p>
              </div>

              {/* LinkedIn URL */}
              <div>
                <label htmlFor="sf-linkedin" className={labelCls}>
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                    <LinkedInIcon size={14} />
                  </div>
                  <input
                    id="sf-linkedin"
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => {
                      setLinkedinUrl(e.target.value);
                      markDirty();
                    }}
                    placeholder="https://www.linkedin.com/in/username"
                    className={cn(inputCls, "pl-10")}
                  />
                </div>
              </div>

              {/* CV File Upload */}
              <div>
                <label className={labelCls}>Curriculum Vitae (PDF Document)</label>
                <p className="text-xs text-white/50 mb-3">
                  Upload an academic resume (max 10MB PDF). Downloadable on the public profile when
                  published.
                </p>

                {cvFileName ? (
                  <div className="mb-3 flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white">
                    <div className="flex items-center gap-2.5 truncate">
                      <FileText size={16} className="text-[var(--site-accent)] shrink-0" />
                      <span className="font-mono truncate">{cvFileName}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      <button
                        type="button"
                        onClick={() => cvInputRef.current?.click()}
                        className="text-xs text-[var(--site-accent)] hover:underline"
                      >
                        Replace PDF
                      </button>
                      <span className="text-white/20">·</span>
                      <button
                        type="button"
                        onClick={handleDeleteCv}
                        className="text-xs text-red-400 hover:text-red-300 hover:underline flex items-center gap-1"
                        title="Remove CV document"
                      >
                        <Trash2 size={12} />
                        <span>Delete PDF</span>
                      </button>
                    </div>
                  </div>
                ) : deleteCv ? (
                  <div className="mb-3 flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                    <div className="flex items-center gap-2">
                      <Trash2 size={14} className="text-red-400 shrink-0" />
                      <span>CV document will be removed upon saving.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteCv(false);
                        setCvFileName("Existing CV on file");
                        markDirty();
                      }}
                      className="text-xs text-white/70 hover:text-white underline ml-3 shrink-0"
                    >
                      Undo
                    </button>
                  </div>
                ) : null}

                <div
                  className="border-2 border-dashed border-white/12 rounded-xl p-6 text-center cursor-pointer hover:border-[var(--site-accent)]/50 hover:bg-white/3 transition-all"
                  onClick={() => cvInputRef.current?.click()}
                  onKeyDown={(e) => e.key === "Enter" && cvInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload CV PDF"
                >
                  <Upload size={20} className="mx-auto text-white/40 mb-2" />
                  <p className="text-sm font-semibold text-white/80">
                    {cvFileName ? "Click to replace PDF document" : "Click to attach CV (PDF)"}
                  </p>
                  <p className="text-xs text-white/40 mt-1">Accepts PDF files up to 10MB</p>
                </div>

                <input
                  ref={cvInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleCvFileSelected}
                  className="hidden"
                  id="student-cv-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-4 z-20 glass-panel p-4 md:px-6 rounded-2xl shadow-2xl border border-white/12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Link
              href="/admin/students"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Back to Directory
            </Link>
            {isDirty && (
              <span className="hidden sm:inline-block text-amber-400 font-medium pl-2 border-l border-white/10">
                ● Unsaved changes
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/students" className="btn-outline text-xs py-2 px-4">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary text-xs py-2.5 px-6 shadow-lg shadow-[var(--site-accent)]/20"
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Saving Profile…
                </>
              ) : mode === "create" ? (
                "Create Scholar Profile"
              ) : (
                "Save Profile Changes"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
