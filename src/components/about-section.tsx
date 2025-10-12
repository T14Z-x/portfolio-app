"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/personal";

const sentenceVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(16px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;

  const narrative = profile.about.slice(1);

  const milestones = [
    { label: "First production launch", value: "2018" },
    { label: "Projects shipped", value: "40+" },
    { label: "Client continents", value: "3" },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-[--color-border]/60 bg-[--surface-primary] py-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_center,_rgba(0,0,0,0.82),_transparent_82%)]">
        <div className="absolute left-[15%] top-[18%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.22)_0%,_transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(140deg,_rgba(15,23,42,0.12),_transparent_60%)]" />
      </div>

      <Container className="relative z-10 flex flex-col gap-16">
        <div className="max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title={profile.aboutHeadline}
              description={profile.about[0]}
            />
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <div className="relative">
              <div className="absolute -left-6 top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-[--color-border] via-[--color-border]/40 to-transparent" />
              <div className="space-y-8">
                {narrative.map((paragraph, index) => (
                  <motion.article
                    key={index}
                    className="relative rounded-3xl border border-[--color-border]/60 bg-[--surface-elevated]/60 p-7 shadow-[var(--shadow-soft)]/50 backdrop-blur"
                    variants={sentenceVariants}
                    initial={animationsEnabled ? "hidden" : false}
                    whileInView={animationsEnabled ? "visible" : false}
                    viewport={{ once: true, amount: 0.65, margin: "-10% 0px" }}
                    transition={{ duration: animationsEnabled ? 0.6 : 0, delay: animationsEnabled ? index * 0.12 : 0 }}
                  >
                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-[--color-muted]">
                      <span className="inline-flex size-2 rounded-full bg-[--color-accent] shadow-[0_0_12px_var(--color-accent)]" />
                      <span>Frame {index + 1}</span>
                    </div>
                    <p className="mt-4 text-lg leading-relaxed text-[--color-foreground]/90">
                      {paragraph}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>

            <motion.div
              className="flex flex-wrap gap-4 rounded-3xl border border-[--color-border]/60 bg-[--surface-elevated]/60 p-6 shadow-[var(--shadow-soft)]/50 backdrop-blur"
              initial={animationsEnabled ? { opacity: 0, y: 20, filter: "blur(14px)" } : undefined}
              whileInView={animationsEnabled ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: animationsEnabled ? 0.55 : 0, delay: animationsEnabled ? 0.2 + narrative.length * 0.12 : 0 }}
            >
              <span className="rounded-full border border-[--color-border]/50 bg-[--surface-primary]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[--color-muted]">
                {profile.title}
              </span>
              <span className="rounded-full border border-[--color-border]/50 bg-[--surface-primary]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[--color-muted]">
                {profile.yearsOfExperience}+ years shipping
              </span>
              <span className="rounded-full border border-[--color-border]/50 bg-[--surface-primary]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[--color-muted]">
                Available for product teams & agencies
              </span>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              className="sticky top-28 space-y-6 rounded-3xl border border-[--color-border]/60 bg-[--surface-elevated]/60 p-6 shadow-[var(--shadow-soft)]/45 backdrop-blur"
              initial={animationsEnabled ? { opacity: 0, y: 24, filter: "blur(18px)" } : undefined}
              whileInView={animationsEnabled ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: animationsEnabled ? 0.65 : 0 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-[--color-muted]">
                Milestones
              </h3>
              <div className="space-y-5">
                {milestones.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="rounded-2xl border border-[--color-border]/60 bg-[--surface-primary]/70 p-4"
                    initial={animationsEnabled ? { opacity: 0, y: 12 } : undefined}
                    whileInView={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-12% 0px" }}
                    transition={{ duration: animationsEnabled ? 0.45 : 0, delay: animationsEnabled ? index * 0.08 : 0 }}
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-[--color-muted]">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-[--color-foreground]">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
