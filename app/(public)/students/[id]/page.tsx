import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, ArrowLeft, User } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { StudentWithUrls } from "@/types/student";
import { getStorageUrl } from "@/lib/utils";
import { placeholderStudents } from "@/lib/placeholder-students";

interface Props {
  params: Promise<{ id: string }>;
}

async function getStudent(id: string): Promise<StudentWithUrls | null> {
  if (id.startsWith("placeholder-")) {
    return placeholderStudents.find((s) => s.id === id) ?? null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes("your-supabase")) return null;

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .single();

    if (error || !data) return null;

    return {
      ...data,
      photo_url: getStorageUrl("student-photos", data.photo_path),
      cv_url: getStorageUrl("student-cvs", data.cv_path),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const student = await getStudent(id);
  if (!student) return { title: "Student Not Found" };

  return {
    title: `${student.full_name} — Academic Batch 2026–2028 | CBS Collective`,
    description:
      student.introduction ||
      `Profile of ${student.full_name}, Centre for Budget Studies, CUSAT.`,
  };
}

export const revalidate = 60;

export default async function StudentProfilePage({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);

  if (!student) notFound();

  const interests = student.interests ?? [];

  return (
    <div className="min-h-screen bg-[#070a10] pt-28 pb-20 selection:bg-[var(--site-accent)] selection:text-[#090d16]">
      <div className="container-site max-w-4xl mx-auto">
        <Link
          href="/#our-batch"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-semibold transition-colors mb-8 px-3 py-1.5 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft size={14} />
          <span>Back to Our Batch</span>
        </Link>

        <div className="glass-card overflow-hidden md:flex border-white/10 shadow-2xl items-stretch">
          {/* Portrait — Locked 1:1 Aspect Square with Skeleton Fallback */}
          <div className="relative w-full aspect-square md:w-80 md:h-80 lg:w-96 lg:h-96 shrink-0 bg-[#0a0f1d] overflow-hidden">
            {student.photo_url ? (
              <>
                <div className="absolute inset-0 skeleton-shimmer z-0" />
                <Image
                  src={student.photo_url}
                  alt={`Photo of ${student.full_name}`}
                  fill
                  className="object-cover object-center z-10"
                  priority
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#121a2d] to-[#0a0f1d]">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <User size={48} className="text-white/20" />
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-60 md:hidden z-10" />
          </div>

          {/* Profile Details */}
          <div className="p-8 md:p-10 flex flex-col flex-1 justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="section-label">Academic Batch 2026–2028</span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#0c1222] border border-[#d4af37]/30 shadow-md">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                    Scholar Index
                  </span>
                  <span className="font-extrabold text-white">
                    {String(student.display_order || 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                {student.full_name}
              </h1>

              {interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/8 text-white/80"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}

              {student.introduction && (
                <div className="space-y-3 mb-8">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                    Biography &amp; Focus
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed font-normal">
                    {student.introduction}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/8">
              {student.linkedin_url && (
                <a
                  href={student.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs py-2.5 px-4"
                  aria-label={`${student.full_name} on LinkedIn`}
                >
                  <LinkedInIcon size={14} />
                  <span>LinkedIn Profile</span>
                </a>
              )}

              {student.cv_url && (
                <a
                  href={student.cv_url}
                  download
                  className="btn-primary text-xs py-2.5 px-4"
                  aria-label={`Download ${student.full_name}'s CV`}
                >
                  <FileText size={14} />
                  <span>Download Curriculum Vitae</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
