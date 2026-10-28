import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin Suite — CBS Collective", template: "%s | Admin · CBS Collective" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070a10] text-[#f3f5f8] antialiased font-sans selection:bg-[var(--site-accent)] selection:text-[#070a10]">
      {children}
    </div>
  );
}
