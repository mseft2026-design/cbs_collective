import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, ExternalLink, Shield } from "lucide-react";
import { getSectionContent } from "@/lib/cms";

export async function Footer() {
  const footer = await getSectionContent("footer");
  const year = footer.copyrightYear || new Date().getFullYear();

  return (
    <footer className="bg-[#05070c] border-t border-white/10 text-white relative z-10" role="contentinfo">
      {/* Restrained gold hairline */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ── Brand & Identity (Cols 1-5) ─────────────────────────── */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                <Image
                  src="/images/cbs-logo.png"
                  alt="CBS Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white leading-tight tracking-tight">
                  CBS Collective
                </h3>
                <p className="text-[11px] text-[#d4af37] font-semibold tracking-widest uppercase mt-0.5">
                  Academic Batch 2026–2028
                </p>
              </div>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-md pt-1">
              Centre for Budget Studies, Cochin University of Science and Technology (CUSAT).
              Dedicated to public finance governance, fiscal federalism, state budget analysis, and
              fostering evidence-based economic research.
            </p>

            <div className="space-y-2 pt-2 text-xs text-white/50">
              {footer.address && (
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="mt-0.5 text-[#d4af37] shrink-0" />
                  <span>{footer.address}</span>
                </div>
              )}
              {footer.email && (
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-[#d4af37] shrink-0" />
                  <a href={`mailto:${footer.email}`} className="hover:text-white transition-colors">
                    {footer.email}
                  </a>
                </div>
              )}
              {footer.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-[#d4af37] shrink-0" />
                  <span>{footer.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Quick Navigation (Cols 6-8) ─────────────────────────── */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-4">
              Explore Sections
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Centre (Dossier)" },
                { href: "/#cusat", label: "CUSAT Heritage & Rankings" },
                { href: "/#vision-mission", label: "Vision & Strategic Mission" },
                { href: "/#our-batch", label: "Our Batch (26 Scholars)" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Academic & University Portals (Cols 9-12) ───────────── */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-4">
              Academic &amp; University Portals
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href="https://cusat.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span>CUSAT Official University Portal</span>
                  <ExternalLink size={12} className="text-white/40 group-hover:text-[#d4af37]" />
                </a>
              </li>
              {footer.socialLinks?.website && (
                <li>
                  <a
                    href={footer.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span>Centre for Budget Studies Official Page</span>
                    <ExternalLink size={12} className="text-white/40 group-hover:text-[#d4af37]" />
                  </a>
                </li>
              )}
              <li className="pt-2">
                <div className="p-3.5 rounded-xl bg-white/4 border border-white/8 text-white/50 text-[11px] leading-relaxed">
                  <span className="font-semibold text-white/80 block mb-0.5">M.Sc. Budget Studies (Flagship Programme)</span>
                  Advanced training in quantitative analysis, econometrics and financial technology at CBS, CUSAT.
                </div>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  prefetch={false}
                  className="text-white/40 hover:text-[#d4af37] transition-colors inline-flex items-center gap-1.5 text-xs"
                >
                  <Shield size={13} />
                  <span>Administrator Secure Suite</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────────────────── */}
        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            &copy; {year} CBS Collective. Centre for Budget Studies, CUSAT. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#d4af37] font-semibold tracking-wider font-mono text-[11px]">
              Academic Batch 2026–2028
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
