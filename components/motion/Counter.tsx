"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  value: string | number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function Counter({
  value,
  duration = 1.4,
  className = "",
  suffix = "",
  prefix = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  // Extract numerical part and any existing non-numeric suffix/prefix if value is string (e.g. "26", "6+")
  const strVal = String(value).trim();
  const match = strVal.match(/^([^0-9]*)(\d+)(.*)$/);

  const parsedPrefix = prefix || (match ? match[1] : "");
  const targetNumber = match ? parseInt(match[2], 10) : NaN;
  const parsedSuffix = suffix || (match ? match[3] : "");

  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (isNaN(targetNumber) || !isInView) return;

    if (shouldReduceMotion) {
      setCurrentNumber(targetNumber);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease-out cubic: 1 - pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentNumber(Math.round(easeProgress * targetNumber));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, targetNumber, duration, shouldReduceMotion]);

  // If non-numeric (e.g. "CUSAT"), render static
  if (isNaN(targetNumber)) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {parsedPrefix}
      {isInView ? currentNumber : 0}
      {parsedSuffix}
    </span>
  );
}
