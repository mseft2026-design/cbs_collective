"use client";

import { ReactNode, useRef, useState, MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASINGS } from "@/lib/motion";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
  spotlightColor?: string;
  elevation?: boolean;
}

export function InteractiveCard({
  children,
  className = "",
  spotlight = true,
  spotlightColor = "rgba(212, 175, 55, 0.08)",
  elevation = true,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!spotlight || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={
        elevation && !shouldReduceMotion
          ? {
              y: -4,
              transition: { duration: 0.25, ease: EASINGS.smoothOut },
            }
          : {}
      }
      className={cn(
        "relative rounded-2xl overflow-hidden transition-colors duration-300",
        className
      )}
    >
      {/* Subtle radial spotlight gradient following cursor */}
      {spotlight && isHovered && !shouldReduceMotion && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 65%)`,
          }}
        />
      )}

      {children}
    </motion.div>
  );
}
