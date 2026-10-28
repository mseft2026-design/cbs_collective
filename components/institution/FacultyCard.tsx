import Image from "next/image";
import { Building2 } from "lucide-react";
import { Faculty } from "@/config/faculty";

interface FacultyCardProps {
  member: Faculty;
}

export function FacultyCard({ member }: FacultyCardProps) {
  // Determine role pill label
  const roleBadge = member.id === "faculty-junaid-bushiri" 
    ? "University Leadership" 
    : member.id === "faculty-santhosh-kumar-pk"
    ? "Centre Director"
    : "Faculty Mentor";

  return (
    <div className="group relative bg-[#0c1222] border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.025] hover:border-[#d4af37]/50 hover:shadow-[0_24px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500 flex flex-col h-full">
      {/* Top ambient highlight on hover */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* 4:5 Portrait Container with natural framing and zero cut-off */}
      <div className="relative aspect-[4/5] w-full bg-[#0a0f1d] overflow-hidden">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`Official portrait of ${member.name}`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0c1222] to-[#141d33]">
            <div className="text-white/20 text-6xl font-serif font-bold select-none">
              {member.name.charAt(0)}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-transparent to-transparent opacity-70 pointer-events-none group-hover:opacity-50 transition-opacity duration-500" />
        
        {/* Academic Role Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/12 text-[10px] font-semibold text-[#d4af37] tracking-wider uppercase shadow-md">
          {roleBadge}
        </div>
      </div>

      {/* Profile Information */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-3 bg-gradient-to-b from-[#0c1222] to-[#090d16]">
        <div>
          <h3 className="font-serif text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#d4af37] transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-xs font-semibold text-[#d4af37] tracking-wide mt-1">
            {member.title}
          </p>
          {member.department && (
            <p className="text-xs text-white/60 font-medium flex items-center gap-1.5 mt-2">
              <Building2 className="w-3.5 h-3.5 text-white/40 shrink-0" />
              <span>{member.department}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
