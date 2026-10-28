import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SectionEditor } from "@/components/admin/cms/SectionEditor";
import { CMS_SECTIONS, getSectionContent } from "@/lib/cms";
import { SectionKey } from "@/types/cms";

interface Props {
  params: Promise<{ section: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const meta = CMS_SECTIONS.find((s) => s.key === section);
  return {
    title: meta ? `Edit ${meta.name} — CMS Studio` : "Edit Section",
  };
}

export default async function AdminSectionEditPage({ params }: Props) {
  const { section } = await params;
  const sectionMeta = CMS_SECTIONS.find((s) => s.key === section);

  if (!sectionMeta) {
    notFound();
  }

  const initialContent = await getSectionContent(section as SectionKey, true);

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/content"
          className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            Visual CMS Studio
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {sectionMeta.name}
          </h1>
        </div>
      </div>

      <SectionEditor
        sectionKey={section as SectionKey}
        initialContent={initialContent}
        title={sectionMeta.name}
        description={sectionMeta.description}
      />
    </div>
  );
}
