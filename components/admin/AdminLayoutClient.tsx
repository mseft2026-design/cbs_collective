"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Users,
  LayoutDashboard,
  Palette,
  FileEdit,
  ExternalLink,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Menu,
  X,
  Shield,
  Layers,
} from "lucide-react";
import { adminLogout } from "@/lib/actions";
import { cn } from "@/lib/utils";

interface AdminLayoutClientProps {
  userEmail?: string;
  children: React.ReactNode;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/builder", label: "Website Builder", icon: Layers, exact: false },
  { href: "/admin/students", label: "Students & Batch", icon: Users, exact: false },
  { href: "/admin/content", label: "Visual CMS", icon: FileEdit, exact: false },
  { href: "/admin/settings", label: "Appearance & Theme", icon: Palette, exact: false },
];

export function AdminLayoutClient({ userEmail, children }: AdminLayoutClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#070a10]">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/8 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1 shadow-lg transition-transform group-hover:scale-105">
            <Image
              src="/images/cbs-logo.png"
              alt="CBS Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-bold text-sm text-white tracking-tight">CBS Collective</div>
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--site-accent)] uppercase tracking-wider font-semibold">
              <ShieldCheck size={11} /> Admin Suite
            </div>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 text-white/50 hover:text-white rounded-lg hover:bg-white/5"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-wider text-white/30">
          Management
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-white/10 text-white border-l-2 border-[var(--site-accent)] shadow-sm font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon size={16} className={active ? "text-[var(--site-accent)]" : "text-white/40"} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight size={14} className="text-white/40" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer & Live site shortcut */}
      <div className="p-3 border-t border-white/8 space-y-1 bg-[#05080e]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink size={14} />
          View Live Website
        </Link>

        <form action={adminLogout}>
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-xs font-medium text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#070a10]">
      {/* Desktop Permanent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#070a10] border-r border-white/8 flex-col shrink-0 min-h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Mobile Off-canvas Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#070a10] border-r border-white/10 shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#090d16]">
        {/* Top Header */}
        <header className="h-16 border-b border-white/8 bg-[#090d16]/85 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5 border border-white/10"
              aria-label="Open navigation menu"
            >
              <Menu size={18} />
            </button>

            <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Backend Connected
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-white/60 hover:text-[var(--site-accent)] transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/10"
            >
              <ExternalLink size={13} />
              <span className="hidden xs:inline">Live Site</span>
            </Link>

            {userEmail && (
              <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                <div className="w-7 h-7 rounded-full bg-[var(--site-accent)]/20 border border-[var(--site-accent)]/40 flex items-center justify-center shrink-0">
                  <Shield size={13} className="text-[var(--site-accent)]" />
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold text-white leading-none">Administrator</p>
                  <p className="text-[10px] text-white/40 leading-tight mt-0.5 max-w-[130px] truncate">
                    {userEmail}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
