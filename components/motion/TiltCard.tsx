"use client";

import { useRef, useState, useEffect, ReactNode, ComponentPropsWithoutRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

interface TiltCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  children: ReactNode;
  className?: string;
  maxTilt?: number;         // max tilt in degrees, default 8
  spotlightIntensity?: number; // 0-1, default 0.15
  scaleOnHover?: number;    // default 1.02
  featured?: boolean;       // stronger effect for feature cards
}

/**
 * Premium 3D tilt card — pointer-responsive perspective tilt,
 * directional highlight, and image-zoom for contained media.
 * Automatically disabled on touch devices and reduced-motion.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  spotlightIntensity = 0.12,
  scaleOnHover = 1.025,
  featured = false,
  ...htmlProps
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });

  // Spring-driven rotation for smooth return-to-rest
  const rotateX = useSpring(0, { stiffness: 280, damping: 30, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 280, damping: 30, mass: 0.4 });
  const scale = useSpring(1, { stiffness: 300, damping: 28 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const normX = (cx / rect.width - 0.5) * 2;   // -1 to 1
    const normY = (cy / rect.height - 0.5) * 2;  // -1 to 1

    rotateX.set(-normY * maxTilt);
    rotateY.set(normX * maxTilt);
    setSpotlight({ x: cx, y: cy });
  };

  const handleMouseEnter = () => {
    if (shouldReduceMotion || isTouch) return;
    setIsHovered(true);
    scale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setIsHovered(false);
  };

  const effectiveMaxTilt = featured ? maxTilt * 1.4 : maxTilt;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion || isTouch
          ? {}
          : { rotateX, rotateY, scale, transformStyle: "preserve-3d", willChange: "transform" }
      }
      className={`relative ${className}`}
      {...(htmlProps as any)}
    >
      {/* Directional spotlight gradient */}
      {!shouldReduceMotion && !isTouch && isHovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 transition-opacity duration-200"
          style={{
            background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(212,175,55,${spotlightIntensity}), transparent 65%)`,
          }}
        />
      )}
      {/* Border highlight on hover */}
      {!shouldReduceMotion && !isTouch && isHovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            background: `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.06), transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
