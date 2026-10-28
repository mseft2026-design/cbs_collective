import type { Metadata } from "next";
import { getPageSectionsConfig } from "@/lib/actions";
import { getPublishedStudents } from "@/lib/students";
import { getAllCmsContent } from "@/lib/cms";
import { WebsiteBuilder } from "@/components/builder/WebsiteBuilder";

export const metadata: Metadata = {
  title: "Website Builder — Visual CMS Studio | CBS Admin",
  description: "Customize public website sections, alignment, layout presets, and live preview.",
};

export const revalidate = 0; // Always fresh for visual builder

export default async function BuilderPage() {
  const [sectionsConfig, students, cms] = await Promise.all([
    getPageSectionsConfig(true), // Load current draft
    getPublishedStudents(),
    getAllCmsContent(true),
  ]);

  return (
    <WebsiteBuilder
      initialConfig={sectionsConfig}
      students={students}
      cmsFallback={cms}
    />
  );
}
