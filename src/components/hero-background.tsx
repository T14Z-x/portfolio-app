"use client";

import { motion, useReducedMotion } from "framer-motion";
import LiquidEther from "@/components/liquid-ether";

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <LiquidEther
        className="size-full"
        style={{ position: "absolute", inset: 0 }}
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={140}
        isViscous={false}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.45}
        isBounce={false}
        autoDemo
        autoSpeed={0.45}
        autoIntensity={2.4}
        takeoverDuration={0.25}
        autoResumeDelay={2800}
        autoRampDuration={0.6}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.04),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="size-full bg-[linear-gradient(120deg,_rgba(29,78,216,0.08)_0%,_rgba(236,72,153,0.06)_38%,_rgba(20,184,166,0.08)_72%,_rgba(64, 93, 230,0.05)_100%)]" />
      </div>

      <div className="pointer-events-none absolute inset-x-[-40%] bottom-[-240px] h-[460px] bg-[radial-gradient(circle,_rgba(15,23,42,0.18)_0%,_transparent_65%)] blur-3xl" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 scale-110 opacity-40 [mask-image:radial-gradient(circle_at_top,_rgba(0,0,0,0.9),_transparent_70%)]"
        initial={shouldAnimate ? { opacity: 0 } : undefined}
        animate={shouldAnimate ? { opacity: [0.15, 0.35, 0.25, 0.4, 0.2] } : undefined}
        transition={
          shouldAnimate
            ? { duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            : undefined
        }
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 20%, transparent 50%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_top,_rgba(0,0,0,0.8),_transparent_70%)]">
        <div className="size-full bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>
    </div>
  );
}
