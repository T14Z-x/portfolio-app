"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { experience } from "@/data/experience";

// Card entrance animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.21, 0.71, 0.4, 1],
      staggerChildren: 0.08,
      delayChildren: 0.15,
    }
  },
};

// Header animation
const headerVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.21, 0.71, 0.4, 1] }
  },
};

// Bullet list container with stagger
const bulletListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  },
};

// Individual bullet animation
const bulletVariants: Variants = {
  hidden: { opacity: 0, x: -16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.21, 0.71, 0.4, 1] }
  },
};

// Tech tags container with stagger
const techContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    }
  },
};

// Individual tech tag animation
const techTagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.21, 0.71, 0.4, 1] }
  },
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
              variants={animationsEnabled ? cardVariants : undefined}
              initial={animationsEnabled ? "hidden" : undefined}
              whileInView={animationsEnabled ? "visible" : undefined}
              viewport={{ once: true, amount: 0.3 }}
              style={{ transitionDelay: animationsEnabled ? `${index * 0.12}s` : undefined }}
            >
              <motion.header
                className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-[--color-border]/70 pb-6"
                variants={animationsEnabled ? headerVariants : undefined}
              >
                <div>
                  <h3 className="text-xl font-semibold text-[--color-foreground]">{role.company}</h3>
                  <p className="text-sm text-[--color-muted]">{role.role}</p>
                </div>
                <motion.span
                  className="text-xs uppercase tracking-[0.24em] text-[--color-muted]"
                  variants={animationsEnabled ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : undefined}
                >
                  {role.start} — {role.end}
                </motion.span>
              </motion.header>

              <motion.ul
                className="mt-6 space-y-3 text-sm leading-relaxed text-[--color-muted] md:text-base"
                variants={animationsEnabled ? bulletListVariants : undefined}
              >
                {role.bullets.map((bullet, bulletIndex) => (
                  <motion.li
                    key={bulletIndex}
                    className="relative pl-6"
                    variants={animationsEnabled ? bulletVariants : undefined}
                  >
                    <motion.span
                      className="absolute left-0 top-[0.6em] inline-flex size-2 -translate-y-1/2 rounded-full bg-[--color-accent]"
                      variants={animationsEnabled ? {
                        hidden: { scale: 0, opacity: 0 },
                        visible: { scale: 1, opacity: 1, transition: { duration: 0.3, delay: bulletIndex * 0.05 } }
                      } : undefined}
                    />
                    {bullet}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-6 flex flex-wrap gap-2"
                variants={animationsEnabled ? techContainerVariants : undefined}
              >
                {role.tech.map((tech) => (
                  <motion.span
                    key={tech}
                    className="rounded-full border border-[--color-border] bg-[--surface-muted]/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[--color-muted]"
                    variants={animationsEnabled ? techTagVariants : undefined}
                    whileHover={animationsEnabled ? { scale: 1.05, y: -2 } : undefined}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
