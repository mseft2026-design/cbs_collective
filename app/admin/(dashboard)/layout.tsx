import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || user.app_metadata?.role !== "admin") {
      redirect("/admin/login");
    }

    return <AdminLayoutClient userEmail={user.email}>{children}</AdminLayoutClient>;
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    redirect("/admin/login");
  }
}
