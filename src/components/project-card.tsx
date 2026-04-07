"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import type { KeyboardEvent, MouseEvent } from "react";
import type { Project } from "@/data/types";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;
  const caseStudyHref = project.caseStudy ? `/work/${project.caseStudy.slug}` : project.caseStudyRoute;
  const isWholeCardClickable = Boolean(caseStudyHref);
  const publicHref =
    project.link?.type === "public"
      ? project.link.href
      : project.url;

  const openCaseStudy = () => {
    if (!caseStudyHref) {
      return;
    }

    router.push(caseStudyHref);
  };

  const isInteractiveTarget = (target: EventTarget | null) =>
    target instanceof HTMLElement &&
    Boolean(target.closest("a, button, input, textarea, select, summary"));

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if (!isWholeCardClickable || isInteractiveTarget(event.target)) {
      return;
    }

    openCaseStudy();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isWholeCardClickable || isInteractiveTarget(event.target)) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCaseStudy();
    }
  };

  const card = (
    <motion.article
      className={clsx(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-[--color-border]/60 bg-[--surface-elevated]/60 shadow-[var(--shadow-soft)]",
        isWholeCardClickable &&
          "cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[--surface-primary]",
      )}
      role={isWholeCardClickable ? "link" : undefined}
      tabIndex={isWholeCardClickable ? 0 : undefined}
      aria-label={isWholeCardClickable ? `Open ${project.title} case study` : undefined}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
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
            priority={index === 0}
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
          {publicHref ? (
            <Link
              href={publicHref}
              className="inline-flex items-center text-sm font-medium text-[--color-accent] transition hover:gap-2"
              target={publicHref.startsWith("http") ? "_blank" : undefined}
              rel={publicHref.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {project.link?.type === "public" ? project.link.label ?? "View demo" : "View project"}
              <motion.span
                aria-hidden
                className="ml-1"
                animate={animationsEnabled ? { x: [0, 4, 0] } : undefined}
                transition={animationsEnabled ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : undefined}
              >
                →
              </motion.span>
            </Link>
          ) : (
            <span
              className={clsx(
                "inline-flex cursor-default items-center text-sm font-medium text-[--color-muted] opacity-70",
                project.link?.type === "private" && "text-[--color-accent]",
              )}
              title={project.link?.type === "private" ? project.link.note : undefined}
            >
              {project.link?.type === "private" ? project.link.label ?? "Private (NDA)" : "Link unavailable"}
            </span>
          )}
          {caseStudyHref ? (
            isWholeCardClickable ? (
              <span className="text-xs uppercase tracking-[0.24em] text-[--color-accent]">
                Case Study
              </span>
            ) : (
              <Link
                href={caseStudyHref}
                className="text-xs uppercase tracking-[0.24em] text-[--color-muted] transition hover:text-[--color-accent]"
              >
                Case Study
              </Link>
            )
          ) : null}
        </motion.div>
      </motion.div>
    </motion.article>
  );

  return card;
}
