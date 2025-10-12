"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { Technology } from "@/data/types";
import "./tech-marquee.css";

const AUTO_ADVANCE_DELAY = 4200;
const RESUME_DELAY = 2200;

function splitRails(technologies: Technology[]) {
  const prioritised = [...technologies].sort((a, b) => Number(Boolean(b.highlight)) - Number(Boolean(a.highlight)));
  const half = Math.ceil(prioritised.length / 2);
  return [prioritised.slice(0, half), prioritised.slice(half)];
}

type TechMarqueeProps = {
  technologies: Technology[];
};

export function TechMarquee({ technologies }: TechMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const rails = useMemo(() => splitRails(technologies), [technologies]);
  const flattened = useMemo(() => rails.flat(), [rails]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || flattened.length <= 1) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % flattened.length);
    }, AUTO_ADVANCE_DELAY);
    return () => clearTimeout(timer);
  }, [activeIndex, flattened.length, prefersReducedMotion, isPaused]);

  useEffect(() => () => {
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = null;
    }
  }, []);

  const handlePause = () => {
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = null;
    }
    setIsPaused(true);
  };

  const scheduleResume = () => {
    if (prefersReducedMotion) return;
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }
    resumeTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  };

  const activeTech = flattened[activeIndex] ?? flattened[0];

  const renderRail = (railTechs: Technology[], railIndex: number) => {
    if (railTechs.length === 0) return null;
    const duplicated = [...railTechs, ...railTechs];
    const duration = railIndex === 0 ? "32s" : "36s";
    const direction = railIndex === 0 ? "left" : "right";

    const pausedAttr = (prefersReducedMotion || isPaused) ? "true" : undefined;

    const trackStyle = {
      "--marquee-duration": duration,
    } as CSSProperties;

    return (
      <div
        key={`rail-${railIndex}`}
        className="tech-marquee__rail"
        data-paused={pausedAttr}
        data-direction={direction === "right" ? "right" : "left"}
      >
        <div className="tech-marquee__track" style={trackStyle}>
          {duplicated.map((tech, index) => {
            const globalIndex = railIndex === 0 ? index % railTechs.length : railTechs.length + (index % railTechs.length);
            const isActive = globalIndex === activeIndex;
            return (
              <button
                key={`${tech.name}-${index}`}
                type="button"
                className="tech-marquee__item"
                onMouseEnter={() => {
                  handlePause();
                  setActiveIndex(globalIndex);
                }}
                onMouseLeave={scheduleResume}
                onFocus={() => {
                  handlePause();
                  setActiveIndex(globalIndex);
                }}
                onBlur={scheduleResume}
                onPointerDown={() => setActiveIndex(globalIndex)}
                aria-pressed={isActive}
              >
                <span>{tech.name}</span>
                {tech.highlight ? <span className="tech-marquee__badge">Core</span> : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const reducedAttr = prefersReducedMotion ? "true" : undefined;

  return (
    <div className="tech-marquee" data-reduced={reducedAttr}>
      {rails.map((rail, index) => renderRail(rail, index))}

      {activeTech ? (
        <div className="tech-marquee__detail">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTech.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
              className="space-y-2"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-[--color-muted]">Spotlight</p>
              <p className="text-xl font-semibold tracking-tight text-[--color-foreground]">{activeTech.name}</p>
              {activeTech.blurb ? (
                <p className="text-sm leading-relaxed text-[--color-muted]">
                  {activeTech.blurb}
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : null}
    </div>
  );
}
