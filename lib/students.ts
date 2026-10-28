import { StudentWithUrls } from "@/types/student";
import { getStorageUrl } from "@/lib/utils";
import { placeholderStudents } from "@/lib/placeholder-students";

export async function getPublishedStudents(): Promise<StudentWithUrls[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-supabase")) {
    return placeholderStudents;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true })
      .order("full_name", { ascending: true });

    if (error || !data || data.length === 0) {
      return placeholderStudents;
    }

    return data.map((s) => ({
      ...s,
      photo_url: getStorageUrl("student-photos", s.photo_path),
      cv_url: getStorageUrl("student-cvs", s.cv_path),
    }));
  } catch {
    return placeholderStudents;
  }
}
