"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SectionAnimationSettings,
  EntranceAnimation,
  AnimationDuration,
  AnimationDelay,
  MotionIntensity,
} from "@/types/builder";
import {
  getAnimationDurationSec,
  getAnimationDelaySec,
} from "@/lib/builder";
import { EASINGS, VIEWPORT_ONCE } from "@/lib/motion";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: SectionAnimationSettings;
  className?: string;
  delayOverride?: number;
  trigger?: "scroll" | "load";
}

export function ScrollReveal({
  children,
  animation,
  className = "",
  delayOverride,
  trigger: triggerProp,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If animations are explicitly disabled or user prefers reduced motion
  if (animation?.disabled || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const entrance = animation?.entrance || "fade-up";
  if (entrance === "none") {
    return <div className={className}>{children}</div>;
  }

  const duration = getAnimationDurationSec(animation?.duration);
  const delay =
    delayOverride !== undefined
      ? delayOverride
      : getAnimationDelaySec(animation?.delay);
  const intensity = animation?.intensity || "balanced";
  const trigger = triggerProp || animation?.trigger || "scroll";

  // Calculate distance multiplier
  const distanceMultiplier =
    intensity === "minimal" ? 0.5 : intensity === "expressive" ? 1.4 : 1.0;
  const yDist = 28 * distanceMultiplier;
  const xDist = 32 * distanceMultiplier;

  // Build variants
  let hiddenState: any = { opacity: 0 };
  let visibleState: any = {
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: EASINGS.smoothOut,
    },
  };

  switch (entrance) {
    case "fade-in":
      hiddenState = { opacity: 0 };
      visibleState = {
        opacity: 1,
        transition: { duration, delay, ease: EASINGS.smoothOut },
      };
      break;

    case "fade-up":
      hiddenState = { opacity: 0, y: yDist };
      visibleState = {
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: EASINGS.smoothOut },
      };
      break;

    case "fade-left":
      hiddenState = { opacity: 0, x: -xDist };
      visibleState = {
        opacity: 1,
        x: 0,
        transition: { duration, delay, ease: EASINGS.smoothOut },
      };
      break;

    case "fade-right":
      hiddenState = { opacity: 0, x: xDist };
      visibleState = {
        opacity: 1,
        x: 0,
        transition: { duration, delay, ease: EASINGS.smoothOut },
      };
      break;

    case "scale-in":
      hiddenState = { opacity: 0, scale: 0.94 };
      visibleState = {
        opacity: 1,
        scale: 1,
        transition: { duration, delay, ease: EASINGS.smoothOut },
      };
      break;

    case "mask-reveal":
      hiddenState = { opacity: 0, clipPath: "inset(8% 0% 8% 0%)" };
      visibleState = {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration, delay, ease: EASINGS.editorial },
      };
      break;
  }

  const variants = {
    hidden: hiddenState,
    visible: visibleState,
  };

  if (trigger === "load") {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
