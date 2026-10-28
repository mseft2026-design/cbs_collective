import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPageSectionsConfig } from "@/lib/actions";

export const revalidate = 0;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sectionsConfig = await getPageSectionsConfig(false);
  const showHeader = sectionsConfig?.showHeader !== false;
  const showFooter = sectionsConfig?.showFooter !== false;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--site-bg)] text-[var(--site-text)]">
      {showHeader && <Navbar />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
