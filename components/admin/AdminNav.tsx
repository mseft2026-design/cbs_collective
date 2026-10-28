"use client";

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
  Layers,
} from "lucide-react";
import { adminLogout } from "@/lib/actions";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/builder", label: "Website Builder", icon: Layers, exact: false },
  { href: "/admin/students", label: "Students", icon: Users, exact: false },
  { href: "/admin/content", label: "Visual CMS", icon: FileEdit, exact: false },
  { href: "/admin/settings", label: "Appearance & Theme", icon: Palette, exact: false },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#070a10] border-r border-white/8 flex flex-col shrink-0 min-h-screen">
      {/* Brand */}
      <div className="p-6 border-b border-white/8">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-0.5">
            <Image
              src="/images/cbs-logo.png"
              alt="CBS Logo"
              width={36}
              height={36}
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
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1.5">
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
                  ? "bg-white/10 text-white border-l-2 border-[var(--site-accent)] shadow-sm"
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
      <div className="p-3 border-t border-white/8 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors"
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
    </aside>
  );
}
