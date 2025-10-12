"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/data/personal";

const paragraphVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(14px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;

  const blueprintHotspots = useMemo(
    () => [
      {
        id: "location",
        label: "Based in Dhaka, Bangladesh",
        description: "Working remotely with teams across time zones, keeping collaboration always-on.",
        position: { top: "12%", left: "24%" },
      },
      {
        id: "collaboration",
        label: "Partnering with founders & agencies",
        description: "I join squads to translate ambitious briefs into expressive digital experiences that convert.",
        position: { top: "36%", left: "72%" },
      },
      {
        id: "experience",
        label: `${profile.yearsOfExperience}+ years shipping products`,
        description: "From SaaS dashboards to motion-rich storytelling sites, scaling craft with systems thinking.",
        position: { top: "64%", left: "34%" },
      },
    ],
    [],
  );

  const narrative = useMemo(() => profile.about.slice(1), []);

  const [activeSpot, setActiveSpot] = useState(0);
  const activeHotspot = blueprintHotspots[activeSpot] ?? blueprintHotspots[0];

  return (
    <section id="about" className="relative overflow-hidden border-b border-[--color-border]/60 bg-[--surface-primary] py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="prism-background" />
        <div className="absolute inset-0 bg-[linear-gradient(140deg,_rgba(15,23,42,0.12),_transparent_60%)]" />
      </div>

      <Container className="relative z-10 flex flex-col gap-16">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="About"
            title={profile.aboutHeadline}
            description={profile.about[0]}
          />
        </div>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          <div className="flex flex-col gap-12">
            <motion.div
              className="relative w-full overflow-hidden rounded-[40px] border border-[--color-border]/60 bg-[rgba(7,11,20,0.88)] px-10 pt-10 pb-12 shadow-[var(--shadow-soft)]/45"
              initial={animationsEnabled ? { opacity: 0, y: 26, filter: "blur(18px)" } : undefined}
              whileInView={animationsEnabled ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: animationsEnabled ? 0.65 : 0 }}
            >
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={
                {
                  backgroundImage: `
                    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
                    linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "80px 80px",
                } satisfies CSSProperties
              }
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.18),_transparent_70%)]" />

            <div className="relative z-10 flex min-h-[560px] flex-col justify-between">
              <div className="relative flex-1">
                {blueprintHotspots.map((spot, index) => {
                  const hue = index === 0 ? 226 : index === 1 ? 180 : 300;
                  const bubbleColor = `hsla(${hue}, 88%, 68%, 0.7)`;
                  const bubbleBorder = `hsla(${hue}, 88%, 72%, 0.3)`;
                  const positionStyle: CSSProperties = {
                    position: "absolute",
                    top: spot.position.top,
                    left: spot.position.left,
                  };

                  return (
                    <motion.button
                      key={spot.id}
                      type="button"
                      className="group absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center focus-visible:outline-none focus-visible:ring-2"
                      style={positionStyle}
                      initial={animationsEnabled ? { opacity: 0, scale: 0.6 } : undefined}
                      whileInView={animationsEnabled ? { opacity: 1, scale: 1 } : undefined}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: animationsEnabled ? 0.5 : 0, delay: animationsEnabled ? index * 0.1 : 0 }}
                      onMouseEnter={() => setActiveSpot(index)}
                      onPointerEnter={() => setActiveSpot(index)}
                      onFocus={() => setActiveSpot(index)}
                    >
                      {animationsEnabled ? (
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ border: `1px solid ${bubbleBorder}` }}
                          animate={{ scale: [1, 1.25, 1.05, 1.3, 1], opacity: [0.4, 0.12, 0.35, 0.18, 0.4] }}
                          transition={{ duration: 4.2, repeat: Infinity, repeatType: "loop", delay: index * 0.4 }}
                        />
                      ) : null}
                      <span
                        className="relative flex size-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                        style={{ background: bubbleColor }}
                      >
                        +{index + 1}
                      </span>
                      <motion.div
                        className="pointer-events-none absolute left-1/2 top-[calc(100%+16px)] w-48 -translate-x-1/2 rounded-2xl border border-[rgba(99,102,241,0.25)] bg-[rgba(12,18,32,0.82)] p-3 text-center text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[rgba(226,232,240,0.78)] opacity-60 transition group-hover:opacity-100 group-focus-visible:opacity-100"
                        initial={animationsEnabled ? { opacity: 0, y: 16 } : undefined}
                        whileInView={animationsEnabled ? { opacity: 0.6, y: 0 } : undefined}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: animationsEnabled ? 0.45 : 0, delay: animationsEnabled ? index * 0.12 + 0.1 : 0 }}
                      >
                        {spot.label}
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHotspot?.id}
                  className="rounded-3xl border border-[rgba(148,163,184,0.25)] bg-[rgba(12,18,32,0.78)] p-6 text-[rgba(226,232,240,0.75)]"
                  initial={animationsEnabled ? { opacity: 0, y: 16, filter: "blur(12px)" } : undefined}
                  animate={animationsEnabled ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                  exit={animationsEnabled ? { opacity: 0, y: 8, filter: "blur(6px)" } : undefined}
                  transition={{ duration: animationsEnabled ? 0.35 : 0 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(226,232,240,0.6)]">Blueprint Insight</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-[rgba(226,232,240,0.75)]">
                    {activeHotspot?.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed">{activeHotspot?.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            {narrative.map((paragraph, index) => (
              <motion.article
                key={index}
                className="rounded-3xl border border-[--color-border]/60 bg-[--surface-elevated]/60 p-8 text-[--color-muted] shadow-[var(--shadow-soft)]/40 backdrop-blur"
                variants={paragraphVariants}
                initial={animationsEnabled ? "hidden" : undefined}
                whileInView={animationsEnabled ? "visible" : undefined}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: animationsEnabled ? 0.6 : 0, delay: animationsEnabled ? index * 0.1 : 0 }}
              >
                <p className="text-base leading-relaxed md:text-lg text-[--color-foreground]/90">
                  {paragraph}
                </p>
              </motion.article>
            ))}

            <motion.div
              className="rounded-3xl border border-[--color-border]/60 bg-[--surface-elevated]/60 p-8 text-[--color-muted] shadow-[var(--shadow-soft)]/40 backdrop-blur"
              initial={animationsEnabled ? { opacity: 0, y: 24, filter: "blur(18px)" } : undefined}
              whileInView={animationsEnabled ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: animationsEnabled ? 0.55 : 0, delay: animationsEnabled ? 0.2 : 0 }}
            >
              <p className="text-xs uppercase tracking-[0.32em] text-[--color-muted]">Availability</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em]">
                <span className="rounded-full border border-[--color-border]/60 bg-[--surface-primary]/70 px-4 py-2">
                  {profile.location}
                </span>
                <span className="rounded-full border border-[--color-border]/60 bg-[--surface-primary]/70 px-4 py-2">
                  Available for collaborations
                </span>
                <span className="rounded-full border border-[--color-border]/60 bg-[--surface-primary]/70 px-4 py-2">
                  Motion-led storytelling
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
