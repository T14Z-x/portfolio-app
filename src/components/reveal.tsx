"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, once = true }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;

  const initial = animationsEnabled ? { opacity: 0, y: 22, filter: "blur(10px)" } : undefined;
  const animate = animationsEnabled ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      animate={!animationsEnabled ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once, amount: 0.25 }}
      transition={{
        delay,
        duration: animationsEnabled ? 0.45 : 0,
        ease: [0.21, 0.71, 0.4, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
