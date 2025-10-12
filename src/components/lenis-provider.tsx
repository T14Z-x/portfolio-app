"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";

export type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Respect reduced motion: skip Lenis entirely
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      gestureOrientation: "vertical",
    });

    const onRaf = (time: number) => {
      lenis.raf(time);
      frame.current = requestAnimationFrame(onRaf);
    };

    frame.current = requestAnimationFrame(onRaf);

    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
