"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";

// Grid container with staggered children
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Individual card wrapper animation
const cardWrapperVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.71, 0.4, 1],
    },
  },
};

export function FeaturedWork() {
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;

  return (
    <section
      id="work"
      className="relative overflow-hidden border-b border-[--color-border]/60 bg-[--surface-primary] py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="prism-background" />
        <div className="absolute inset-0 mix-blend-overlay opacity-18 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>
      <Container className="relative z-10 space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Work"
            title="Recent web products engineered with motion-first thinking"
            description="From fintech dashboards to marketing narratives, these builds pair systems strategy with expressive UI and dependable engineering."
          />
        </Reveal>

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={animationsEnabled ? gridContainerVariants : undefined}
          initial={animationsEnabled ? "hidden" : undefined}
          whileInView={animationsEnabled ? "visible" : undefined}
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={animationsEnabled ? cardWrapperVariants : undefined}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
