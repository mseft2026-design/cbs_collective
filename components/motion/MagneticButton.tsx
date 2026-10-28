"use client";

import { ReactNode, useRef, useState, MouseEvent } from "react";
import { motion, useReducedMotion, Transition } from "framer-motion";
import { SPRINGS } from "@/lib/motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number; // Distance cursor pulls the button (in px)
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  strength = 12,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Limit magnetic pull to small restrained distance
    setPosition({
      x: (middleX / (width / 2)) * strength,
      y: (middleY / (height / 2)) * strength,
    });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  const motionProps = {
    animate: { x: position.x, y: position.y },
    transition: SPRINGS.magnetic as Transition,
    whileTap: { scale: 0.96 },
    className: "inline-block",
  };

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetPosition}
        className="inline-block"
      >
        <motion.div {...motionProps}>
          <a href={href} onClick={onClick} className={className}>
            {children}
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      className="inline-block"
    >
      <motion.div {...motionProps}>
        <button type="button" onClick={onClick} className={className}>
          {children}
        </button>
      </motion.div>
    </div>
  );
}
