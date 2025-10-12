"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { experience } from "@/data/experience";

const timelineVariants = {
  hidden: { opacity: 0, y: 36, filter: "blur(16px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function ExperienceTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;

  const timelineItems = useMemo(
    () =>
      experience.map((role) => ({
        ...role,
        bullets: role.bullets,
      })),
    [],
  );

  return (
    <section id="experience" className="relative overflow-hidden border-b border-[--color-border]/60 bg-[--surface-primary] py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="prism-background" />
      </div>
      <Container className="relative z-10 space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Hands-on roles where strategy meets shipping"
            description="Leading product squads, partnering with agencies, and guiding teams through high-stakes launches."
          />
        </Reveal>

        <div className="space-y-8">
          {timelineItems.map((role, index) => (
            <motion.article
              key={`${role.company}-${role.start}`}
              className="rounded-3xl border border-[--color-border]/70 bg-[--surface-elevated]/60 p-8 shadow-[var(--shadow-soft)]/40"
              variants={timelineVariants}
              initial={animationsEnabled ? "hidden" : undefined}
              whileInView={animationsEnabled ? "visible" : undefined}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: animationsEnabled ? 0.55 : 0, delay: animationsEnabled ? index * 0.08 : 0 }}
            >
              <header className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-[--color-border]/70 pb-6">
                <div>
                  <h3 className="text-xl font-semibold text-[--color-foreground]">{role.company}</h3>
                  <p className="text-sm text-[--color-muted]">{role.role}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.24em] text-[--color-muted]">
                  {role.start} — {role.end}
                </span>
              </header>

              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[--color-muted] md:text-base">
                {role.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="relative pl-6">
                    <span className="absolute left-0 top-[0.6em] inline-flex size-2 -translate-y-1/2 rounded-full bg-[--color-accent]" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {role.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[--color-border] bg-[--surface-muted]/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[--color-muted]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
