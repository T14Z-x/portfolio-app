"use client";

import { useReducedMotion } from "framer-motion";

const heroVideoUrl = "/hero.mp4";

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="size-full object-cover"
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={heroVideoUrl} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.32)_0%,rgba(2,6,23,0.52)_30%,rgba(2,6,23,0.7)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_80%_78%,rgba(99,102,241,0.16),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="size-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:140px_140px]" />
      </div>
      <div className="pointer-events-none absolute inset-x-[-12%] bottom-[-180px] h-[360px] bg-[radial-gradient(circle,rgba(15,23,42,0.84)_0%,transparent_68%)] blur-3xl" />
    </div>
  );
}
