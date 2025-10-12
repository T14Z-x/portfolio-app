"use client"

import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/types";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[--color-border]/60 bg-[--surface-elevated]/60 shadow-[var(--shadow-soft)]"
      initial={animationsEnabled ? { opacity: 0, y: 32 } : undefined}
      whileInView={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: animationsEnabled ? 0.6 : 0, delay: animationsEnabled ? index * 0.08 : 0 }}
    >
      <motion.div
        className="relative aspect-[4/3] overflow-hidden"
        initial={animationsEnabled ? { opacity: 0, x: -40 } : undefined}
        whileInView={animationsEnabled ? { opacity: 1, x: 0 } : undefined}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: animationsEnabled ? 0.6 : 0, delay: animationsEnabled ? index * 0.08 : 0 }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} cover art`}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={project.id === "mewa"}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[--color-accent] to-transparent" />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        <motion.span
          className="absolute left-4 top-4 inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white"
          initial={animationsEnabled ? { opacity: 0, x: -12 } : undefined}
          whileInView={animationsEnabled ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: animationsEnabled ? 0.4 : 0, delay: animationsEnabled ? index * 0.08 + 0.15 : 0 }}
        >
          {project.year}
        </motion.span>
      </motion.div>

      <motion.div
        className="flex flex-1 flex-col gap-4 p-6"
        initial={animationsEnabled ? { opacity: 0, x: 42 } : undefined}
        whileInView={animationsEnabled ? { opacity: 1, x: 0 } : undefined}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: animationsEnabled ? 0.6 : 0, delay: animationsEnabled ? index * 0.08 + 0.12 : 0 }}
      >
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-[--color-foreground]">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-[--color-muted]">
            {project.summary}
          </p>
        </div>

        <motion.ul
          className="flex flex-wrap gap-2 text-xs font-medium text-[--color-muted]"
          initial={animationsEnabled ? { opacity: 0, y: 16 } : undefined}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: animationsEnabled ? 0.5 : 0, delay: animationsEnabled ? index * 0.08 + 0.2 : 0 }}
        >
          {project.tags.map((tag, tagIndex) => (
            <motion.li
              key={tag}
              className="rounded-full border border-[--color-border] bg-[--surface-muted]/60 px-3 py-1"
              initial={animationsEnabled ? { opacity: 0, y: 8 } : undefined}
              animate={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: animationsEnabled ? 0.3 : 0, delay: animationsEnabled ? index * 0.08 + 0.25 + tagIndex * 0.05 : 0 }}
            >
              {tag}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-auto flex items-center justify-between border-t border-dashed border-[--color-border]/70 pt-4"
          initial={animationsEnabled ? { opacity: 0, y: 12 } : undefined}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: animationsEnabled ? 0.45 : 0, delay: animationsEnabled ? index * 0.08 + 0.32 : 0 }}
        >
          <Link
            href={project.url ?? '#'}
            className={clsx(
              'inline-flex items-center text-sm font-medium text-[--color-accent] transition',
              project.url ? 'hover:gap-2' : 'cursor-default opacity-40',
            )}
            target={project.url?.startsWith('http') ? '_blank' : undefined}
            rel={project.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            View project
            <motion.span
              aria-hidden
              className="ml-1"
              animate={animationsEnabled ? { x: [0, 4, 0] } : undefined}
              transition={animationsEnabled ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } : undefined}
            >
              →
            </motion.span>
          </Link>
          {project.caseStudyRoute ? (
            <Link
              href={project.caseStudyRoute}
              className="text-xs uppercase tracking-[0.24em] text-[--color-muted] transition hover:text-[--color-accent]"
            >
              Case Study
            </Link>
          ) : null}
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
