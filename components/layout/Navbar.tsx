"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Shield, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASINGS, SPRINGS } from "@/lib/motion";

const NAV_LINKS = [
  { href: "/", label: "Home", id: "" },
  { href: "/about", label: "About CBS", id: "about" },
  { href: "/#cusat", label: "CUSAT Heritage", id: "cusat" },
  { href: "/#programme", label: "Programme", id: "programme" },
  { href: "/#faculty", label: "Faculty & Leadership", id: "faculty" },
  { href: "/#our-batch", label: "Our Batch", id: "our-batch" },
];

// Mobile menu overlay variants
const overlayVariants = {
  hidden: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.42, ease: EASINGS.expo },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.3, ease: EASINGS.smoothOut },
  },
};

// Staggered mobile nav items
const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASINGS.smoothOut } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

const mobileContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.02 } },
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Scroll detection: header morph + progress bar
  useEffect(() => {
    function handleScroll() {
      const sy = window.scrollY;
      setScrolled(sy > 24);
      if (sy < 200 && pathname === "/") {
        setActiveSection("");
      }
      // Scroll progress for the thin bar
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? sy / docH : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Section tracking via IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") return;
    const sectionIds = [
      "hero",
      "stats",
      "about-centre",
      "cusat",
      "programme",
      "vision-mission",
      "milestones",
      "research",
      "faculty",
      "our-batch",
    ];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: "-25% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [pathname]);

  // Initial hash scroll handling (e.g. user loaded /#faculty directly)
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveSection(id);
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Smooth scroll helper
  const scrollToSection = (targetId: string) => {
    setMobileMenuOpen(false);

    if (pathname === "/") {
      if (!targetId || targetId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
        setActiveSection("");
        return;
      }
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `/#${targetId}`);
        setActiveSection(targetId);
      }
    } else {
      window.location.href = targetId ? `/#${targetId}` : "/";
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#070a13]/97 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.5)] py-3"
          : "bg-[#070a13]/60 backdrop-blur-md border-b border-white/5 py-5"
      )}
    >
      {/* Scroll-progress hairline */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#d4af37]/80 via-[#d4af37] to-[#a81d34]/60 origin-left"
        style={{ scaleX: scrollProgress, transformOrigin: "left" }}
        transition={{ duration: 0.05 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* ── LEFT: CBS Identity ─────────────────────────────────── */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToSection("");
              }
            }}
            className="flex items-center gap-3 group shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]"
            aria-label="CBS Collective Homepage"
          >
            <motion.div
              className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md shrink-0 flex items-center justify-center p-0.5"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              transition={SPRINGS.card}
            >
              <Image
                src="/images/cbs-logo.png"
                alt="CBS Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </motion.div>

            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-none group-hover:text-[var(--site-accent)] transition-colors duration-300">
                CBS Collective
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#d4af37] tracking-widest uppercase mt-1 leading-none">
                Academic Batch 2026–2028 · CUSAT
              </span>
            </div>
          </Link>

          {/* ── CENTRE: Desktop Navigation with Gliding Active Pill ─────── */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-1 bg-white/[0.03] p-1 rounded-xl border border-white/6"
          >
            {NAV_LINKS.map((link) => {
              const isHome = link.href === "/";
              const isAbout = link.href === "/about";
              const isCurrent = isAbout
                ? pathname === "/about"
                : isHome
                ? pathname === "/" && !activeSection
                : pathname === "/" && activeSection === link.id;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("/#") && pathname === "/") {
                      e.preventDefault();
                      scrollToSection(link.id);
                    } else if (isHome && pathname === "/") {
                      e.preventDefault();
                      scrollToSection("");
                    }
                  }}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]",
                    isCurrent
                      ? "text-white"
                      : "text-white/55 hover:text-white"
                  )}
                >
                  {/* Gliding spring-animated active pill */}
                  {isCurrent && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-white/[0.09] rounded-lg border border-white/12 -z-10"
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                  {/* Hover background */}
                  {!isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-white/0 hover:bg-white/4 -z-10 transition-colors duration-200"
                    />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT: Desktop CTAs ──────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <motion.div whileHover={shouldReduceMotion ? {} : { y: -1 }} transition={{ duration: 0.2 }}>
              <Link
                href="/#our-batch"
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    scrollToSection("our-batch");
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#070a13] bg-[var(--site-accent)] hover:bg-[#e2c168] transition-all duration-200 shadow-lg shadow-[#d4af37]/20 hover:shadow-xl hover:shadow-[#d4af37]/35 active:scale-[0.98]"
              >
                <span>Meet Scholars</span>
                <ArrowUpRight size={13} className="stroke-[2.5]" />
              </Link>
            </motion.div>

            <Link
              href="/admin"
              prefetch={false}
              className="p-2.5 rounded-lg text-white/40 hover:text-[var(--site-accent)] hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              title="Administrator Console"
              aria-label="Administrator Console"
            >
              <Shield size={16} />
            </Link>
          </div>

          {/* ── MOBILE: Hamburger ───────────────────────────────── */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/#our-batch"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("our-batch");
                }
              }}
              className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md text-[#070a13] bg-[var(--site-accent)]"
            >
              Scholars
            </Link>
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── MOBILE: Clip-path animated drawer ──────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden fixed inset-x-0 top-[calc(100%)] max-h-[calc(100vh-60px)] overflow-y-auto no-scrollbar bg-[#070a13]/99 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            id="mobile-nav"
          >
            <motion.div
              className="p-6 space-y-4 pb-8"
              variants={mobileContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Primary Pages */}
              <div className="space-y-1">
                <div className="px-3 pb-1 text-[10px] uppercase font-bold tracking-wider text-white/30">
                  Navigation
                </div>
                {NAV_LINKS.map((link, idx) => {
                  const isHome = link.href === "/";
                  const isAbout = link.href === "/about";
                  const isCurrent = isAbout
                    ? pathname === "/about"
                    : isHome
                    ? pathname === "/" && !activeSection
                    : pathname === "/" && activeSection === link.id;

                  return (
                    <motion.div key={link.href} variants={mobileItemVariants}>
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith("/#") && pathname === "/") {
                            e.preventDefault();
                            scrollToSection(link.id);
                          } else if (isHome && pathname === "/") {
                            e.preventDefault();
                            scrollToSection("");
                          } else {
                            setMobileMenuOpen(false);
                          }
                        }}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                          isCurrent
                            ? "text-[#d4af37] bg-[#d4af37]/8 border border-[#d4af37]/20"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <span>{link.label}</span>
                        <span className="text-white/20 text-xs font-mono">0{idx + 1}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <motion.div
                variants={mobileItemVariants}
                className="pt-4 border-t border-white/8 flex flex-col gap-2.5"
              >
                <Link
                  href="/#our-batch"
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      scrollToSection("our-batch");
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-[#070a13] bg-[var(--site-accent)] shadow-md"
                >
                  <span>Meet the Scholars</span>
                  <ArrowUpRight size={14} />
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 text-xs font-medium text-white/45 hover:text-white py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <Shield size={14} />
                  <span>Admin Dashboard Portal</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
