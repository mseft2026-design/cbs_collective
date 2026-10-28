import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getSiteTheme } from "@/lib/cms";
import { themeToCssVariables } from "@/lib/theme";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "CBS Collective — Academic Batch 2026–2028",
    template: "%s | CBS Collective",
  },
  description:
    "The official academic website of the Centre for Budget Studies (CBS), Cochin University of Science and Technology (CUSAT). Academic Batch 2026–2028.",
  keywords: [
    "Centre for Budget Studies",
    "CBS CUSAT",
    "Budget Studies",
    "CUSAT",
    "Academic Batch 2026-2028",
    "Economics",
    "Public Finance",
  ],
  openGraph: {
    title: "CBS Collective — Academic Batch 2026–2028",
    description:
      "Official academic website of the Centre for Budget Studies, CUSAT.",
    type: "website",
    locale: "en_IN",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getSiteTheme();
  const cssVars = themeToCssVariables(theme);

  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`} style={cssVars as React.CSSProperties}>
      <body className="min-h-screen antialiased bg-[var(--site-bg)] text-[var(--site-text)]">
        {children}
      </body>
    </html>
  );
}
