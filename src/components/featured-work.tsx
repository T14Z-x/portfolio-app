"use client"

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";

export function FeaturedWork() {
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;

  return (
    <section
      id="work"
      className="relative overflow-hidden border-b border-[--color-border]/60 bg-[--surface-primary] py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(5,6,10,0.8),_transparent_72%)]" />
        <motion.div
          className="absolute -top-1/2 left-1/2 h-[140%] w-[120%] -translate-x-1/2 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.32),_transparent_70%)] blur-3xl"
          animate={animationsEnabled ? { rotate: [0, 12, -10, 0], scale: [1, 1.12, 0.98, 1.05, 1] } : undefined}
          transition={animationsEnabled ? { duration: 26, repeat: Infinity, repeatType: "mirror" } : undefined}
        />
        <motion.div
          className="absolute -bottom-2/3 left-0 h-[160%] w-[160%] translate-x-[-20%] bg-[radial-gradient(circle,_rgba(236,72,153,0.24),_transparent_72%)] blur-3xl"
          animate={animationsEnabled ? { rotate: [0, -14, 18, 0], scale: [1, 0.96, 1.08, 1] } : undefined}
          transition={animationsEnabled ? { duration: 32, repeat: Infinity, repeatType: "mirror" } : undefined}
        />
        <motion.div
          className="spotlight-sweep"
          animate={animationsEnabled ? { opacity: [0.18, 0.35, 0.24, 0.3, 0.18], x: ['-20%', '35%', '70%', '15%', '-20%'], y: ['-30%', '-10%', '50%', '60%', '-30%'], scale: [0.9, 1.08, 0.94, 1.04, 0.9] } : undefined}
          transition={animationsEnabled ? { duration: 28, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } : undefined}
        />
      </div>
      <Container className="relative z-10 space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Work"
            title="Recent web products engineered with motion-first thinking"
            description="From fintech dashboards to marketing narratives, these builds pair systems strategy with expressive UI and dependable engineering."
          />
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
