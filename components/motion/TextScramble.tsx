"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: "mount" | "inview";
  duration?: number;   // total scramble duration in ms, default 900
  delay?: number;      // ms delay before starting
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#!@";

/**
 * TextScramble — characters scramble randomly before resolving
 * to the final text. Used for eyebrow labels, stat numbers, etc.
 * Reduced-motion: shows final text immediately.
 */
export function TextScramble({
  text,
  className = "",
  trigger = "mount",
  duration = 800,
  delay = 0,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);
  const frameRef = useRef<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const runScramble = () => {
    const len = text.length;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Reveal chars left-to-right based on progress
      const revealedCount = Math.floor(progress * len);

      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplay(text);
      return;
    }

    if (trigger === "mount") {
      const t = setTimeout(() => {
        runScramble();
      }, delay);
      return () => {
        clearTimeout(t);
        cancelAnimationFrame(frameRef.current);
      };
    }

    // inview trigger
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          setTimeout(runScramble, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, started, shouldReduceMotion]);

  return (
    <span ref={elementRef} className={`font-mono ${className}`} aria-label={text}>
      {display}
    </span>
  );
}
