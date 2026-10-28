import type { Metadata } from "next";
import { ThemeStudio } from "@/components/admin/theme/ThemeStudio";
import { getSiteTheme } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Appearance & Theme Studio — Admin Suite",
};

export default async function AdminSettingsPage() {
  const currentTheme = await getSiteTheme(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Appearance & Theme Studio
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Customize website colors, fonts, geometry, and styling presets with immediate live preview and persistent database storage.
        </p>
      </div>

      <ThemeStudio initialTheme={currentTheme} />
    </div>
  );
}
