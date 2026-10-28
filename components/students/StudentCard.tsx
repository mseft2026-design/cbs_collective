"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, User, ArrowUpRight } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { StudentWithUrls } from "@/types/student";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";
import { EASINGS } from "@/lib/motion";

interface StudentCardProps {
  student: StudentWithUrls;
  index?: number;
}

export function StudentCard({ student, index = 0 }: StudentCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const interests = student.interests ?? [];
  const displayInterests = interests.slice(0, 3);
  const hasMore = interests.length > 3;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.05, 0.4),
        ease: EASINGS.smoothOut,
      }}
      className="h-full"
    >
      <TiltCard
        className="glass-card flex flex-col h-full overflow-hidden border-white/8 hover:border-[var(--site-accent)]/40 group transition-colors duration-300 relative"
        maxTilt={6}
        spotlightIntensity={0.1}
        scaleOnHover={1.02}
      >
        {/* 1:1 Square Photo Container */}
        <div className="relative w-full aspect-square bg-[#0a0f1d] overflow-hidden shrink-0">
          {/* Shimmer skeleton until image loads */}
          {student.photo_url && !imageLoaded && (
            <div className="absolute inset-0 skeleton-shimmer z-0" />
          )}

          {student.photo_url ? (
            <Image
              src={student.photo_url}
              alt={`Portrait of ${student.full_name}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className={cn(
                "object-cover object-center transition-all duration-700 ease-out group-hover:scale-108",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#121a2d] to-[#0a0f1d]">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <User size={36} className="text-white/20" />
              </div>
            </div>
          )}

          {/* Cinematic vignette — deepens on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

          {/* Gold frame reveal on hover */}
          <motion.div
            className="absolute inset-0 border-2 border-[#d4af37]/0 pointer-events-none transition-all duration-400"
            animate={{}}
            style={{
              borderColor: "rgba(212,175,55,0)",
            }}
          />
          <div className="absolute inset-0 border-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/25 pointer-events-none transition-all duration-400 rounded-[inherit]" />

          {/* Display order tag */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#070a10]/95 backdrop-blur-md text-white border border-[#d4af37]/30 shadow-lg z-10 flex items-center gap-1.5 transition-all duration-300 group-hover:border-[#d4af37]/60 group-hover:scale-105">
            <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#d4af37]">SCHOLAR</span>
            <span className="text-white font-mono font-extrabold">{String(student.display_order || 1).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col flex-1 p-5 -mt-2 relative z-10">
          <h3 className="font-extrabold text-white text-base tracking-tight mb-2 group-hover:text-[var(--site-accent)] transition-colors duration-300">
            {student.full_name}
          </h3>

          {/* Interests Badges */}
          {displayInterests.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {displayInterests.map((interest, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/5 border border-white/8 text-white/70 transition-colors group-hover:border-white/15"
                >
                  {interest}
                </span>
              ))}
              {hasMore && (
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-white/40">
                  +{interests.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Biography excerpt */}
          {student.introduction && (
            <p className="text-xs text-white/60 leading-relaxed line-clamp-3 mb-5 flex-1">
              {student.introduction}
            </p>
          )}

          {/* Actions Bar */}
          <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/8">
            {student.linkedin_url && (
              <a
                href={student.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline py-2 px-3 text-xs flex-1 justify-center group/btn transition-transform active:scale-95"
                aria-label={`${student.full_name} LinkedIn profile`}
              >
                <LinkedInIcon size={13} className="transition-transform duration-200 group-hover/btn:scale-110" />
                <span>LinkedIn</span>
              </a>
            )}

            {student.cv_url && (
              <a
                href={student.cv_url}
                download
                className="btn-primary py-2 px-3 text-xs flex-1 justify-center group/btn transition-transform active:scale-95 shadow-sm hover:shadow-md hover:shadow-[#d4af37]/20"
                aria-label={`Download ${student.full_name}'s CV`}
              >
                <FileText size={13} className="transition-transform duration-200 group-hover/btn:-translate-y-0.5" />
                <span>Resume</span>
              </a>
            )}

            <Link
              href={`/students/${student.id}`}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 border border-white/10 transition-all shrink-0 hover:border-white/20 active:scale-95"
              title="View Full Profile"
              aria-label={`View profile of ${student.full_name}`}
            >
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
