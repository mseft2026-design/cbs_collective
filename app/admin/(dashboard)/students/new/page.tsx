import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StudentForm } from "@/components/admin/StudentForm";
import { createStudent } from "@/lib/actions";
import { createServiceClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Add New Student — CBS Admin" };

async function getNextDisplayOrder(): Promise<number> {
  try {
    const service = createServiceClient();
    const { data } = await service
      .from("students")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data?.display_order) {
      return Number(data.display_order) + 1;
    }
  } catch {
    // Database query error or table empty
  }
  return 1;
}

export default async function NewStudentPage() {
  const nextOrder = await getNextDisplayOrder();

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
          <h1 className="text-2xl font-bold text-white tracking-tight">Add New Scholar</h1>
          <p className="text-xs text-white/50 mt-0.5">
            Create a scholar profile for Academic Batch 2026–2028 (Centre for Budget Studies).
          </p>
        </div>
      </div>

      <StudentForm
        mode="create"
        defaultValues={{
          full_name: "",
          interests: [],
          introduction: "",
          linkedin_url: "",
          display_order: nextOrder,
          published: true,
        }}
        action={createStudent}
      />
    </div>
  );
}
