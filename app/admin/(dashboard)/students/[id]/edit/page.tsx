import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { StudentForm } from "@/components/admin/StudentForm";
import { updateStudent } from "@/lib/actions";
import { Student } from "@/types/student";

interface Props {
  params: Promise<{ id: string }>;
}

async function getStudent(id: string): Promise<Student | null> {
  try {
    const service = createServiceClient();
    const { data, error } = await service
      .from("students")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const student = await getStudent(id);
  return { title: student ? `Edit — ${student.full_name} | CBS Admin` : "Edit Scholar Profile" };
}

export default async function EditStudentPage({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);

  if (!student) notFound();

  async function boundAction(formData: FormData) {
    "use server";
    await updateStudent(id, formData);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/students"
          className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Edit Scholar Profile</h1>
          <p className="text-xs text-white/50 mt-0.5">
            Editing <strong className="text-white/80">{student.full_name}</strong> · Batch 2026–2028 (Centre for Budget Studies)
          </p>
        </div>
      </div>

      <StudentForm
        mode="edit"
        studentId={id}
        defaultValues={{
          full_name: student.full_name,
          interests: student.interests ?? [],
          introduction: student.introduction ?? "",
          linkedin_url: student.linkedin_url ?? "",
          display_order: student.display_order,
          published: student.published,
          photo_path: student.photo_path,
          cv_path: student.cv_path,
        }}
        action={boundAction}
      />
    </div>
  );
}
