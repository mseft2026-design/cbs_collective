"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { maskedLineContainer, maskedLineVariants, VIEWPORT_ONCE } from "@/lib/motion";

interface MaskedHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  /** Whether to split by word (true) or treat as single line (false) */
  splitWords?: boolean;
  /** Animate on load (hero) vs scroll */
  trigger?: "load" | "scroll";
  /** Extra delay in seconds */
  delay?: number;
  /** Stagger delay between words in seconds */
  stagger?: number;
}

/**
 * MaskedHeading — each word (or the full line) is wrapped inside
 * overflow-hidden and reveals by translating up into view.
 * Accessible: screen readers see plain text, animation is decorative.
 */
export function MaskedHeading({
  children,
  as: Tag = "h2",
  className = "",
  splitWords = true,
  trigger = "scroll",
  delay = 0,
  stagger = 0.1,
}: MaskedHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || !splitWords) {
    // Single-line reveal or no animation
    const wrapperProps =
      trigger === "load"
        ? {
            initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
          }
        : {
            initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: VIEWPORT_ONCE,
            transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
          };

    const MotionTag = motion[Tag as "h2"];
    return (
      <MotionTag {...(wrapperProps as any)} className={className}>
        {children}
      </MotionTag>
    );
  }

  // Split into words, each word gets masked reveal
  const words =
    typeof children === "string" ? children.split(" ") : [children];

  const containerProps =
    trigger === "load"
      ? {
          initial: "hidden" as const,
          animate: "visible" as const,
          variants: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: stagger,
                delayChildren: delay,
              },
            },
          },
        }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: VIEWPORT_ONCE,
          variants: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: stagger,
                delayChildren: delay,
              },
            },
          },
        };

  const MotionTag = motion[Tag as "h2"];

  return (
    // @ts-ignore — motion tag typing
    <MotionTag {...containerProps} className={className} aria-label={typeof children === "string" ? children : undefined}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.2em] last:mr-0">
          <motion.span
            variants={maskedLineVariants}
            className="inline-block"
            aria-hidden={typeof word !== "string"}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
