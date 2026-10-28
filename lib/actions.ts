"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
import { generateFilename } from "@/lib/utils";
import {
  validateLinkedInUrl,
  validateFileSize,
  validateImageType,
  validatePdfType,
} from "@/lib/validations";
import { DEFAULT_THEME } from "@/lib/theme";

// ── Verify admin role ────────────────────────────────────────────────────────
export async function requireAdmin() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) redirect("/admin/login");

    const role = user.app_metadata?.role;
    if (role !== "admin") {
      redirect("/admin/login");
    }

    return user;
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    redirect("/admin/login");
  }
}

// ── CREATE STUDENT ───────────────────────────────────────────────────────────
export async function createStudent(formData: FormData) {
  await requireAdmin();
  const service = createServiceClient();

  const full_name = (formData.get("full_name") as string)?.trim();
  if (!full_name) throw new Error("Name is required");

  const interestsRaw = (formData.get("interests") as string) || "";
  const interests = interestsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const linkedin_url = (formData.get("linkedin_url") as string)?.trim() || null;
  if (linkedin_url && !validateLinkedInUrl(linkedin_url)) {
    throw new Error("Invalid LinkedIn URL");
  }

  const introduction = (formData.get("introduction") as string)?.trim() || null;
  let display_order = parseInt((formData.get("display_order") as string) || "0", 10);
  if (display_order <= 0) {
    const { data: maxRow } = await service
      .from("students")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    display_order = maxRow?.display_order ? Number(maxRow.display_order) + 1 : 1;
  }
  const published = formData.get("published") === "true";

  const { data, error } = await service
    .from("students")
    .insert({
      full_name,
      interests: interests.length > 0 ? interests : null,
      introduction,
      linkedin_url,
      display_order,
      published,
    })
    .select("id")
    .single();

  if (error) throw new Error(`Failed to create student: ${error.message}`);

  // Handle photo upload
  const photo = formData.get("photo") as File | null;
  if (photo && photo.size > 0) {
    if (!validateImageType(photo)) throw new Error("Photo must be JPEG, PNG, or WebP");
    if (!validateFileSize(photo, 5)) throw new Error("Photo must be under 5MB");
    const filename = generateFilename(photo.name, `student-${data.id}`);
    const { error: uploadError } = await service.storage
      .from("student-photos")
      .upload(filename, photo, { contentType: photo.type, upsert: false });
    if (!uploadError) {
      await service.from("students").update({ photo_path: filename }).eq("id", data.id);
    }
  }

  // Handle CV upload
  const cv = formData.get("cv") as File | null;
  if (cv && cv.size > 0) {
    if (!validatePdfType(cv)) throw new Error("CV must be a PDF");
    if (!validateFileSize(cv, 10)) throw new Error("CV must be under 10MB");
    const filename = generateFilename(cv.name, `cv-${data.id}`);
    const { error: uploadError } = await service.storage
      .from("student-cvs")
      .upload(filename, cv, { contentType: "application/pdf", upsert: false });
    if (!uploadError) {
      await service.from("students").update({ cv_path: filename }).eq("id", data.id);
    }
  }

  revalidatePath("/students");
  revalidatePath("/admin/students");
  redirect("/admin/students");
}

// ── UPDATE STUDENT ───────────────────────────────────────────────────────────
export async function updateStudent(id: string, formData: FormData) {
  await requireAdmin();
  const service = createServiceClient();

  const full_name = (formData.get("full_name") as string)?.trim();
  if (!full_name) throw new Error("Name is required");

  const interestsRaw = (formData.get("interests") as string) || "";
  const interests = interestsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const linkedin_url = (formData.get("linkedin_url") as string)?.trim() || null;
  if (linkedin_url && !validateLinkedInUrl(linkedin_url)) {
    throw new Error("Invalid LinkedIn URL");
  }

  const introduction = (formData.get("introduction") as string)?.trim() || null;
  let display_order = parseInt((formData.get("display_order") as string) || "0", 10);
  if (display_order <= 0) {
    const { data: maxRow } = await service
      .from("students")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    display_order = maxRow?.display_order ? Number(maxRow.display_order) + 1 : 1;
  }
  const published = formData.get("published") === "true";

  const { error } = await service
    .from("students")
    .update({
      full_name,
      interests: interests.length > 0 ? interests : null,
      introduction,
      linkedin_url,
      display_order,
      published,
    })
    .eq("id", id);

  if (error) throw new Error(`Failed to update student: ${error.message}`);

  // Handle photo upload
  const photo = formData.get("photo") as File | null;
  if (photo && photo.size > 0) {
    if (!validateImageType(photo)) throw new Error("Photo must be JPEG, PNG, or WebP");
    if (!validateFileSize(photo, 5)) throw new Error("Photo must be under 5MB");

    const { data: current } = await service
      .from("students")
      .select("photo_path")
      .eq("id", id)
      .single();

    if (current?.photo_path) {
      await service.storage.from("student-photos").remove([current.photo_path]);
    }

    const filename = generateFilename(photo.name, `student-${id}`);
    const { error: uploadError } = await service.storage
      .from("student-photos")
      .upload(filename, photo, { contentType: photo.type, upsert: false });

    if (!uploadError) {
      await service.from("students").update({ photo_path: filename }).eq("id", id);
    }
  }

  // Handle CV upload or deletion
  const deleteCv = formData.get("delete_cv") === "true";
  if (deleteCv) {
    const { data: current } = await service
      .from("students")
      .select("cv_path")
      .eq("id", id)
      .single();

    if (current?.cv_path) {
      await service.storage.from("student-cvs").remove([current.cv_path]);
    }

    await service.from("students").update({ cv_path: null }).eq("id", id);
  } else {
    const cv = formData.get("cv") as File | null;
    if (cv && cv.size > 0) {
      if (!validatePdfType(cv)) throw new Error("CV must be a PDF");
      if (!validateFileSize(cv, 10)) throw new Error("CV must be under 10MB");

      const { data: current } = await service
        .from("students")
        .select("cv_path")
        .eq("id", id)
        .single();

      if (current?.cv_path) {
        await service.storage.from("student-cvs").remove([current.cv_path]);
      }

      const filename = generateFilename(cv.name, `cv-${id}`);
      const { error: uploadError } = await service.storage
        .from("student-cvs")
        .upload(filename, cv, { contentType: "application/pdf", upsert: false });

      if (!uploadError) {
        await service.from("students").update({ cv_path: filename }).eq("id", id);
      }
    }
  }

  revalidatePath("/students");
  revalidatePath(`/students/${id}`);
  revalidatePath("/admin/students");
  redirect("/admin/students");
}

// ── DELETE STUDENT ───────────────────────────────────────────────────────────
export async function deleteStudent(id: string) {
  await requireAdmin();
  const service = createServiceClient();

  const { data } = await service
    .from("students")
    .select("photo_path, cv_path")
    .eq("id", id)
    .single();

  if (data?.photo_path) {
    await service.storage.from("student-photos").remove([data.photo_path]);
  }
  if (data?.cv_path) {
    await service.storage.from("student-cvs").remove([data.cv_path]);
  }

  const { error } = await service.from("students").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete student: ${error.message}`);

  revalidatePath("/students");
  revalidatePath("/admin/students");
}

// ── TOGGLE PUBLISH ───────────────────────────────────────────────────────────
export async function togglePublished(id: string, published: boolean) {
  await requireAdmin();
  const service = createServiceClient();

  const { error } = await service
    .from("students")
    .update({ published })
    .eq("id", id);

  if (error) throw new Error(`Failed to update publish status: ${error.message}`);

  if (!published) {
    const { data } = await service
      .from("students")
      .select("photo_path, cv_path")
      .eq("id", id)
      .single();

    if (data?.cv_path) {
      await service.storage.from("student-cvs").remove([data.cv_path]);
      await service.from("students").update({ cv_path: null }).eq("id", id);
    }
  }

  revalidatePath("/students");
  revalidatePath("/admin/students");
}

// ── REORDER STUDENTS ─────────────────────────────────────────────────────────
export async function reorderStudents(orderedIds: string[]) {
  await requireAdmin();
  const service = createServiceClient();

  for (let i = 0; i < orderedIds.length; i++) {
    await service
      .from("students")
      .update({ display_order: i + 1 })
      .eq("id", orderedIds[i]);
  }

  revalidatePath("/students");
  revalidatePath("/admin/students");
}

// ── SAVE CMS SECTION CONTENT ─────────────────────────────────────────────────
export async function saveSectionContent(
  sectionKey: string,
  content: Record<string, any>,
  status: "draft" | "published" = "published"
) {
  const user = await requireAdmin();
  let dbSaved = false;

  try {
    const service = createServiceClient();
    const { error } = await service.from("site_content").upsert(
      {
        id: sectionKey,
        section_key: sectionKey,
        content,
        status,
        updated_at: new Date().toISOString(),
        updated_by: user.email,
      },
      { onConflict: "id" }
    );
    if (!error) {
      dbSaved = true;
    }
  } catch {
    // Supabase table may not exist yet
  }

  // Always save to resilient local storage
  const { saveLocalCmsContent } = await import("@/lib/local-settings");
  saveLocalCmsContent(sectionKey as any, content, status);

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath(`/admin/content/${sectionKey}`);
  revalidatePath("/admin/content");

  return { success: true, dbSaved };
}

// ── SAVE THEME SETTINGS ──────────────────────────────────────────────────────
export async function saveThemeSettings(
  theme: Record<string, any>,
  status: "draft" | "published" = "published"
) {
  const user = await requireAdmin();
  let dbSaved = false;

  try {
    const service = createServiceClient();
    const { error } = await service.from("site_settings").upsert(
      {
        key: "theme",
        value: theme,
        status,
        updated_at: new Date().toISOString(),
        updated_by: user.email,
      },
      { onConflict: "key" }
    );
    if (!error) {
      dbSaved = true;
    }
  } catch {
    // Supabase table may not exist yet
  }

  // Always save to resilient local storage
  const { saveLocalThemeSettings } = await import("@/lib/local-settings");
  saveLocalThemeSettings(theme as any, status);

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/students");
  revalidatePath("/admin/settings");

  return { success: true, dbSaved };
}

// ── RESET THEME SETTINGS ─────────────────────────────────────────────────────
export async function resetThemeSettings() {
  await requireAdmin();
  try {
    const service = createServiceClient();
    await service.from("site_settings").upsert(
      {
        key: "theme",
        value: DEFAULT_THEME,
        status: "published",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );
  } catch {
    // Supabase table may not exist yet
  }

  const { resetLocalThemeSettings } = await import("@/lib/local-settings");
  resetLocalThemeSettings();

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/students");
  revalidatePath("/admin/settings");

  return { success: true };
}

// ── UPLOAD CMS ASSET ─────────────────────────────────────────────────────────
export async function uploadCmsAsset(formData: FormData): Promise<{ url: string }> {
  await requireAdmin();
  const service = createServiceClient();

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("No file provided");
  if (!validateImageType(file)) throw new Error("File must be an image (JPEG, PNG, WebP)");
  if (!validateFileSize(file, 8)) throw new Error("Image must be under 8MB");

  const filename = generateFilename(file.name, "cms-asset");
  const { error } = await service.storage
    .from("student-photos")
    .upload(filename, file, { contentType: file.type, upsert: false });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = service.storage.from("student-photos").getPublicUrl(filename);

  return { url: publicUrl };
}

// ── ADMIN LOGIN ──────────────────────────────────────────────────────────────
export async function adminLogin(formData: FormData) {
  try {
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (
        error.message?.includes("unreachable") ||
        error.message?.includes("fetch failed") ||
        error.message?.includes("network_error") ||
        (error as any)?.status === 0 ||
        ((error as any)?.status ?? 0) >= 500
      ) {
        return {
          success: false,
          error:
            "Supabase server is unreachable. If you are using a free Supabase tier, your project may be paused. Please unpause/restore it in your Supabase dashboard.",
        };
      }
      return { success: false, error: "Invalid email or password" };
    }

    const role = data.user?.app_metadata?.role;
    if (role !== "admin") {
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Access denied. Your account does not have administrator privileges.",
      };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error:
        err?.message?.includes("fetch failed") || err?.name === "AuthRetryableFetchError"
          ? "Unable to connect to authentication server. Please check internet connection or Supabase status."
          : err?.message || "Login failed",
    };
  }
}

// ── ADMIN LOGOUT ─────────────────────────────────────────────────────────────
export async function adminLogout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Ignore network failure on logout
  }
  redirect("/admin/login");
}

// ── VISUAL BUILDER CONFIG ACTIONS ────────────────────────────────────────────

export async function getPageSectionsConfig(previewDraft = false): Promise<any> {
  const { INITIAL_PAGE_CONFIG } = await import("@/lib/builder");

  // 1. Try Supabase
  try {
    const supabase = await createClient();
    const query = supabase
      .from("site_settings")
      .select("value, status")
      .eq("key", "page_sections");

    if (!previewDraft) {
      query.eq("status", "published");
    }

    const { data, error } = await query.maybeSingle();
    if (!error && data?.value?.sections?.length) {
      return data.value;
    }
  } catch {
    // Supabase query failed or table not found
  }

  // 2. Try local fallback storage
  try {
    const { getLocalPageSections } = await import("@/lib/local-settings");
    const local = getLocalPageSections();
    if (local?.sections?.length) {
      if (!previewDraft && local.status !== "published") {
        return INITIAL_PAGE_CONFIG;
      }
      return local;
    }
  } catch {
    // Ignore fallback errors
  }

  return INITIAL_PAGE_CONFIG;
}

export async function savePageSectionsConfig(
  config: any,
  status: "draft" | "published" = "draft"
) {
  const user = await requireAdmin();
  let dbSaved = false;

  const payload = {
    ...config,
    status,
    updated_at: new Date().toISOString(),
    updated_by: user.email,
  };

  // 1. Try saving to Supabase site_settings
  try {
    const service = createServiceClient();
    const { error } = await service.from("site_settings").upsert(
      {
        key: "page_sections",
        value: payload,
        status,
        updated_at: new Date().toISOString(),
        updated_by: user.email,
      },
      { onConflict: "key" }
    );
    if (!error) {
      dbSaved = true;
    }
  } catch {
    // Supabase table may not exist yet
  }

  // 2. Always persist locally
  const { saveLocalPageSections } = await import("@/lib/local-settings");
  saveLocalPageSections(payload);

  revalidatePath("/");
  revalidatePath("/", "layout");
  revalidatePath("/admin/builder");

  return { success: true, dbSaved };
}

export async function toggleHeaderVisibility(showHeader: boolean) {
  const user = await requireAdmin();
  const current = await getPageSectionsConfig(false);
  const updated = {
    ...current,
    showHeader,
    updated_at: new Date().toISOString(),
    updated_by: user.email,
  };
  return savePageSectionsConfig(updated, "published");
}

export async function toggleFooterVisibility(showFooter: boolean) {
  const user = await requireAdmin();
  const current = await getPageSectionsConfig(false);
  const updated = {
    ...current,
    showFooter,
    updated_at: new Date().toISOString(),
    updated_by: user.email,
  };
  return savePageSectionsConfig(updated, "published");
}

