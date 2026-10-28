import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { StudentTable } from "@/components/admin/StudentTable";
import { Student } from "@/types/student";

export const metadata: Metadata = { title: "Student Management" };

async function getAllStudents(): Promise<Student[]> {
  try {
    const service = createServiceClient();
    const { data, error } = await service
      .from("students")
      .select("*")
      .order("display_order", { ascending: true })
      .order("full_name", { ascending: true });
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export default async function AdminStudentsPage() {
  const students = await getAllStudents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Student Directory</h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white/70">
              {students.length} Total
            </span>
          </div>
          <p className="text-sm text-white/50 mt-1">
            Manage profiles, upload CVs and portraits, and reorder the cohort of Batch 2026–2028.
          </p>
        </div>
        <Link href="/admin/students/new" className="btn-primary self-start sm:self-auto text-xs py-2.5 px-4">
          <Plus size={15} />
          <span>Add New Student</span>
        </Link>
      </div>

      <StudentTable students={students} />
    </div>
  );
}
