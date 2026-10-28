"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/lib/motion";

/**
 * Premium custom cursor with:
 * - Small trailing dot that follows the pointer with spring physics
 * - Enlarged dot on interactive elements
 * - Disabled on touch devices and reduced-motion preferences
 */
export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<
    "default" | "hover" | "text"
  >("default");
  const [isTouch, setIsTouch] = useState(true);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate on pointer/mouse devices
    const hasPointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    setIsTouch(!hasPointer);
    if (!hasPointer || shouldReduceMotion) return;

    let currentX = -100;
    let currentY = -100;
    const LERP = 0.14;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentX = lerp(currentX, targetRef.current.x, LERP);
      currentY = lerp(currentY, targetRef.current.y, LERP);
      setPos({ x: currentX, y: currentY });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    // Detect interactive targets
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], [tabindex]"))
        setCursorState("hover");
      else if (t.closest("input, textarea, [contenteditable]"))
        setCursorState("text");
      else setCursorState("default");
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
    };
  }, [shouldReduceMotion, isVisible]);

  if (isTouch || shouldReduceMotion) return null;

  const isHover = cursorState === "hover";

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor dot */}
          <motion.div
            className="fixed pointer-events-none z-[9999] mix-blend-difference"
            style={{
              left: pos.x,
              top: pos.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: isHover ? 2.2 : 1,
              width: 10,
              height: 10,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.18, ease: EASINGS.snappy }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "rgba(255,255,255,0.9)",
              }}
            />
          </motion.div>

          {/* Trailing ring — moves slower than the dot */}
          <motion.div
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: pos.x,
              top: pos.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHover ? 0 : 0.3,
              scale: isHover ? 0.6 : 1,
              width: 36,
              height: 36,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASINGS.gentle }}
          >
            <div className="w-full h-full rounded-full border border-white/40" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
