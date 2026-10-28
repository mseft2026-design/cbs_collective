import Link from "next/link";
import { ExternalLink, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function AdminHeader() {
  let user: any = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user || null;
  } catch {
    user = null;
  }

  return (
    <header className="h-16 border-b border-white/8 bg-[#090d16]/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Production Backend Connected
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-white/60 hover:text-[var(--site-accent)] transition-colors px-3 py-1.5 rounded-md hover:bg-white/5 border border-white/10"
        >
          <ExternalLink size={13} />
          <span>Live Site</span>
        </Link>

        {user && (
          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="w-7 h-7 rounded-full bg-[var(--site-accent)]/20 border border-[var(--site-accent)]/40 flex items-center justify-center">
              <Shield size={13} className="text-[var(--site-accent)]" />
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-white leading-none">Administrator</p>
              <p className="text-[10px] text-white/40 leading-tight mt-0.5 max-w-[140px] truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
