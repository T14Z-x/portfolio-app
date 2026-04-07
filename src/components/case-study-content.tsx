"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project, ProjectCaseStudy } from "@/data/types";
import { Container } from "@/components/ui/container";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

type CaseStudyContentProps = {
  project: Project & { caseStudy: ProjectCaseStudy };
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerSlow = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const prefersReducedMotion = useReducedMotion();
  const caseStudy = project.caseStudy;

  const duration = prefersReducedMotion ? 0 : 0.6;
  const durationFast = prefersReducedMotion ? 0 : 0.4;
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <main id="main" className="flex-1 bg-[--surface-primary]">
      {caseStudy.expansionHero && (
        <ScrollExpandMedia
          mediaType={caseStudy.expansionHero.mediaType ?? "image"}
          mediaSrc={caseStudy.expansionHero.mediaSrc}
          posterSrc={caseStudy.expansionHero.posterSrc}
          bgImageSrc={caseStudy.expansionHero.bgImageSrc}
          title={project.title}
          date={caseStudy.expansionHero.date}
          scrollToExpand={caseStudy.expansionHero.scrollToExpand}
          textBlend={caseStudy.expansionHero.textBlend}
        >
          <div className="mx-auto w-full max-w-5xl space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 rounded-full border border-[--color-border]/80 bg-[color-mix(in_srgb,var(--surface-elevated)_88%,transparent)] px-4 py-2 text-sm font-semibold text-[--color-foreground] shadow-[var(--shadow-soft)] backdrop-blur transition hover:border-[--color-accent]/35 hover:text-[--color-accent]"
              >
                <span aria-hidden="true">←</span>
                All Projects
              </Link>
              {caseStudy.reportUrl && (
                <Link
                  href={caseStudy.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[--color-accent] px-4 py-2 text-sm font-semibold text-[--color-accent-foreground] shadow-[0_20px_45px_rgba(79,70,229,0.22)] transition hover:brightness-105"
                >
                  {caseStudy.reportLabel ?? "View Report"}
                </Link>
              )}
            </div>

            <article className="rounded-3xl border border-[--color-border]/80 bg-[color-mix(in_srgb,var(--surface-elevated)_84%,transparent)] p-6 text-[--color-foreground] shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-accent]">Case Study</p>
              <p className="mt-4 text-lg leading-relaxed text-[--color-foreground] md:text-xl">{project.summary}</p>
              {caseStudy.confidentialityNote && (
                <p className="mt-5 inline-flex rounded-full border border-[--color-border]/70 bg-[color-mix(in_srgb,var(--surface-muted)_72%,transparent)] px-3 py-1.5 text-xs font-medium text-[--color-muted]">
                  NDA protected content
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[--color-border]/70 bg-[color-mix(in_srgb,var(--surface-muted)_72%,transparent)] px-3 py-1.5 text-xs font-semibold text-[--color-foreground]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </ScrollExpandMedia>
      )}

      {!caseStudy.expansionHero && (
        <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[--surface-muted] via-[--surface-primary] to-[--surface-primary]" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.2),transparent)]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.08),transparent_50%)]" />
        </div>

        <Container className="relative z-10 flex min-h-[90vh] flex-col justify-center pb-24 pt-32">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durationFast, ease, delay: 0.1 }}
            className="absolute left-0 right-0 top-6 flex flex-wrap items-center justify-between gap-4 px-5 md:px-0"
          >
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2.5 text-sm font-medium text-[--color-muted] transition-colors hover:text-[--color-foreground]"
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-[--color-border] bg-[--surface-elevated]/80 transition-all group-hover:border-[--color-accent]/50 group-hover:bg-[--color-accent]/10">
                <svg className="size-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </span>
              All Projects
            </Link>
            {caseStudy.reportUrl && (
              <Link
                href={caseStudy.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[--color-accent] px-5 py-2.5 text-sm font-semibold text-[--color-accent-foreground] shadow-lg shadow-[--color-accent]/20 transition-all hover:shadow-xl hover:shadow-[--color-accent]/25"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {caseStudy.reportLabel ?? "View Report"}
              </Link>
            )}
          </motion.div>

          {/* Hero Content */}
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <div className="space-y-6">
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: durationFast, ease }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-[--color-accent]/25 bg-[--color-accent]/8 px-4 py-2">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-[--color-accent] opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-[--color-accent]" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[--color-accent]">Case Study</span>
                  </span>
                  {caseStudy.confidentialityNote && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[--color-border] bg-[--surface-elevated]/80 px-3 py-2 text-xs font-medium text-[--color-muted]">
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      NDA Protected
                    </span>
                  )}
                </motion.div>
                <motion.h1
                  variants={fadeUp}
                  transition={{ duration, ease }}
                  className="text-balance text-5xl font-bold tracking-tight text-[--color-foreground] sm:text-6xl md:text-7xl"
                >
                  {project.title}
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration, ease }}
                  className="max-w-xl text-lg leading-relaxed text-[--color-muted] sm:text-xl"
                >
                  {project.summary}
                </motion.p>
              </div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                transition={{ duration, ease }}
                className="flex flex-wrap items-center gap-8 sm:gap-10"
              >
                <div className="space-y-1.5">
                  <p className="text-4xl font-bold tracking-tight text-[--color-foreground]">6</p>
                  <p className="text-sm font-medium uppercase tracking-wider text-[--color-muted]">Months</p>
                </div>
                <div className="h-14 w-px bg-gradient-to-b from-transparent via-[--color-border] to-transparent" />
                <div className="space-y-1.5">
                  <p className="text-4xl font-bold tracking-tight text-[--color-foreground]">4</p>
                  <p className="text-sm font-medium uppercase tracking-wider text-[--color-muted]">Developers</p>
                </div>
                <div className="h-14 w-px bg-gradient-to-b from-transparent via-[--color-border] to-transparent" />
                <div className="space-y-1.5">
                  <p className="text-4xl font-bold tracking-tight text-[--color-foreground]">5+</p>
                  <p className="text-sm font-medium uppercase tracking-wider text-[--color-muted]">Modules</p>
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                variants={fadeUp}
                transition={{ duration, ease }}
                className="flex flex-wrap gap-2"
              >
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: durationFast, ease, delay: 0.4 + i * 0.05 }}
                    className="rounded-xl border border-[--color-border] bg-[--surface-elevated]/80 px-4 py-2 text-sm font-medium text-[--color-muted]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration, ease, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-[--color-accent]/15 via-transparent to-[--color-accent]/10 blur-3xl" />
              {project.image ? (
                <figure className="group relative overflow-hidden rounded-[2rem] border border-[--color-border]/40 bg-[--surface-elevated] shadow-2xl shadow-black/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  </div>
                  {/* Badge */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/95 px-5 py-4 shadow-xl backdrop-blur-sm dark:bg-neutral-900/95">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Project Type</p>
                      <p className="mt-0.5 text-base font-semibold text-neutral-900 dark:text-white">Enterprise ERP</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Delivered
                    </span>
                  </div>
                </figure>
              ) : (
                <div className="relative flex aspect-[4/3] items-center justify-center rounded-[2rem] border border-[--color-border]/40 bg-[--surface-elevated] shadow-2xl">
                  <p className="text-sm font-medium uppercase tracking-wider text-[--color-muted]">Preview unavailable</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-3 text-[--color-muted]">
              <span className="text-xs font-medium uppercase tracking-widest">Explore</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </Container>
        </section>
      )}

      {/* Overview Section */}
      <section className="border-t border-[--color-border]/30 bg-[--surface-primary] py-28 md:py-36">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-20"
          >
            <motion.p variants={fadeUp} transition={{ duration: durationFast, ease }} className="text-sm font-semibold uppercase tracking-widest text-[--color-accent]">
              Overview
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration, ease }} className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Role & Context
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerSlow}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Role */}
            <motion.article
              variants={scaleIn}
              transition={{ duration, ease }}
              className="group relative overflow-hidden rounded-[2rem] border border-[--color-border]/40 bg-gradient-to-br from-[--surface-elevated] to-[--surface-muted]/20 p-8 transition-colors hover:border-[--color-accent]/30 md:col-span-2 lg:p-10"
            >
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-[--color-accent]/8 blur-3xl transition-transform duration-500 group-hover:scale-125" />
              <div className="relative">
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-[--color-accent]/12 text-[--color-accent]">
                  <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[--color-muted]">My Role</p>
                <p className="mt-3 text-xl font-semibold leading-relaxed text-[--color-foreground] md:text-2xl">{caseStudy.role}</p>
              </div>
            </motion.article>

            {/* Team */}
            <motion.article
              variants={scaleIn}
              transition={{ duration, ease }}
              className="group relative overflow-hidden rounded-[2rem] border border-[--color-border]/40 bg-gradient-to-br from-[--surface-elevated] to-[--surface-muted]/20 p-8 transition-colors hover:border-emerald-500/30 lg:p-10"
            >
              <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-500">
                <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--color-muted]">Team</p>
              <p className="mt-3 text-lg font-semibold leading-relaxed text-[--color-foreground]">{caseStudy.team}</p>
            </motion.article>

            {/* Timeline */}
            <motion.article
              variants={scaleIn}
              transition={{ duration, ease }}
              className="group relative overflow-hidden rounded-[2rem] border border-[--color-border]/40 bg-gradient-to-br from-[--surface-elevated] to-[--surface-muted]/20 p-8 transition-colors hover:border-amber-500/30 lg:col-span-2 lg:p-10"
            >
              <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-amber-500/12 text-amber-500">
                <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--color-muted]">Timeline</p>
              <p className="mt-3 text-lg font-semibold leading-relaxed text-[--color-foreground]">{caseStudy.timeline}</p>
            </motion.article>

            {/* Source note - minimal inline */}
            <motion.div
              variants={fadeIn}
              transition={{ duration, ease }}
              className="flex items-center gap-3 rounded-2xl border border-[--color-border]/30 bg-[--surface-muted]/30 px-6 py-4 lg:col-span-1"
            >
              <svg className="size-5 shrink-0 text-[--color-muted]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p className="text-sm text-[--color-muted]">Based on internship report filed at BRAC University</p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Challenge & Scope */}
      <section className="border-t border-[--color-border]/30 bg-gradient-to-b from-[--surface-muted]/20 to-[--surface-primary] py-28 md:py-36">
        <Container>
          <div className="grid gap-20 lg:grid-cols-2 lg:gap-28">
            {/* Challenge */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="space-y-8"
            >
              <motion.div
                variants={scaleIn}
                transition={{ duration: durationFast, ease }}
                className="inline-flex size-16 items-center justify-center rounded-[1.25rem] bg-rose-500/12 text-rose-500"
              >
                <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </motion.div>
              <motion.div variants={fadeUp} transition={{ duration, ease }}>
                <p className="text-sm font-semibold uppercase tracking-widest text-[--color-accent]">The Challenge</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Problem Statement</h2>
              </motion.div>
              <motion.p
                variants={fadeUp}
                transition={{ duration, ease }}
                className="text-lg leading-relaxed text-[--color-muted] md:text-xl"
              >
                {caseStudy.challenge}
              </motion.p>
            </motion.div>

            {/* Scope */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="space-y-8"
            >
              <motion.div
                variants={scaleIn}
                transition={{ duration: durationFast, ease }}
                className="inline-flex size-16 items-center justify-center rounded-[1.25rem] bg-blue-500/12 text-blue-500"
              >
                <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </motion.div>
              <motion.div variants={fadeUp} transition={{ duration, ease }}>
                <p className="text-sm font-semibold uppercase tracking-widest text-[--color-accent]">Scope</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">What We Covered</h2>
              </motion.div>
              <motion.ul variants={stagger} className="space-y-4">
                {caseStudy.scope.map((item, index) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    transition={{ duration: durationFast, ease }}
                    className="flex items-start gap-4 rounded-2xl border border-[--color-border]/40 bg-[--surface-elevated]/50 p-5 transition-colors hover:border-[--color-accent]/30"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[--color-accent]/12 text-sm font-bold text-[--color-accent]">
                      {index + 1}
                    </span>
                    <p className="pt-1.5 leading-relaxed text-[--color-muted]">{item}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Contributions */}
      <section className="border-t border-[--color-border]/30 bg-[--surface-primary] py-28 md:py-36">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mx-auto mb-20 max-w-3xl text-center"
          >
            <motion.div
              variants={scaleIn}
              transition={{ duration: durationFast, ease }}
              className="mx-auto mb-6 inline-flex size-16 items-center justify-center rounded-[1.25rem] bg-[--color-accent]/12 text-[--color-accent]"
            >
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
            </motion.div>
            <motion.p variants={fadeUp} transition={{ duration: durationFast, ease }} className="text-sm font-semibold uppercase tracking-widest text-[--color-accent]">
              Delivery
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration, ease }} className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              What I Built
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration, ease }} className="mx-auto mt-5 max-w-xl text-lg text-[--color-muted]">
              Key implementations delivered throughout the project.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[--color-accent] via-[--color-accent]/30 to-transparent md:left-1/2 md:block" />

            <div className="space-y-8 md:space-y-14">
              {caseStudy.contributions.map((contribution, index) => (
                <motion.div
                  key={contribution}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration, ease, delay: index * 0.1 }}
                  className={`relative flex flex-col gap-4 md:flex-row md:gap-10 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 top-10 hidden size-4 -translate-x-1/2 rounded-full border-4 border-[--surface-primary] bg-[--color-accent] shadow-lg shadow-[--color-accent]/30 md:left-1/2 md:block" />

                  {/* Card */}
                  <div className={`flex-1 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                    <article className="group relative overflow-hidden rounded-[1.75rem] border border-[--color-border]/40 bg-[--surface-elevated] p-7 transition-all hover:border-[--color-accent]/40 hover:shadow-xl hover:shadow-[--color-accent]/5 md:p-9">
                      <span className={`absolute top-6 text-7xl font-black text-[--color-accent]/3 md:top-8 pointer-events-none select-none z-0 ${index % 2 === 1 ? 'right-7 md:right-9' : 'right-7 md:left-9'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className={`relative z-10 ${index % 2 === 1 ? 'md:pr-20' : 'md:pl-20'}`}>
                        <p className="text-lg leading-relaxed text-[--color-muted]">{contribution}</p>
                      </div>
                    </article>
                  </div>

                  <div className="hidden flex-1 md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Outcomes */}
      <section className="border-t border-[--color-border]/30 bg-gradient-to-b from-[--surface-muted]/20 to-[--surface-primary] py-28 md:py-36">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
          >
            <div>
              <motion.p variants={fadeUp} transition={{ duration: durationFast, ease }} className="text-sm font-semibold uppercase tracking-widest text-[--color-accent]">
                Impact
              </motion.p>
              <motion.h2 variants={fadeUp} transition={{ duration, ease }} className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Project Outcomes
              </motion.h2>
              <motion.p variants={fadeUp} transition={{ duration, ease }} className="mt-5 max-w-xl text-lg text-[--color-muted]">
                The measurable impact delivered through this engagement.
              </motion.p>
            </div>
            <motion.div
              variants={scaleIn}
              transition={{ duration: durationFast, ease }}
              className="inline-flex size-16 items-center justify-center rounded-[1.25rem] bg-emerald-500/12 text-emerald-500"
            >
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerSlow}
            className="grid gap-5 md:grid-cols-2"
          >
            {caseStudy.outcomes.map((outcome) => (
              <motion.article
                key={outcome}
                variants={scaleIn}
                transition={{ duration, ease }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-[--color-border]/40 bg-[--surface-elevated] p-7 transition-all hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 md:p-9"
              >
                <div className="absolute -right-8 -top-8 size-32 rounded-full bg-emerald-500/8 blur-3xl transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex items-start gap-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/12 text-emerald-500">
                    <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="pt-2 text-lg leading-relaxed text-[--color-muted]">{outcome}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="border-t border-[--color-border]/30 bg-[--surface-primary] py-28 md:py-36">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <motion.p variants={fadeUp} transition={{ duration: durationFast, ease }} className="text-sm font-semibold uppercase tracking-widest text-[--color-accent]">
              Technology
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration, ease }} className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Tech Stack
            </motion.h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {caseStudy.stack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: durationFast, ease, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="cursor-default rounded-2xl border border-[--color-border]/40 bg-[--surface-elevated] px-6 py-3.5 text-sm font-semibold text-[--color-foreground] shadow-sm transition-colors hover:border-[--color-accent]/40"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-[--color-border]/30 bg-gradient-to-b from-[--surface-muted]/20 to-[--surface-primary] py-28 md:py-36">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration, ease }}
            className="relative overflow-hidden rounded-[2.5rem] border border-[--color-border]/40 bg-gradient-to-br from-[--surface-elevated] via-[--surface-elevated] to-[--color-accent]/5 p-10 md:p-20"
          >
            {/* Decorations */}
            <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[--color-accent]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-[--color-accent]/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Let&apos;s work together</h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-[--color-muted]">
                Open to discussing new projects, creative ideas, or opportunities to collaborate.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[--color-accent] px-8 py-4 text-base font-semibold text-[--color-accent-foreground] shadow-xl shadow-[--color-accent]/20 transition-all hover:shadow-2xl hover:shadow-[--color-accent]/25"
                >
                  Get in Touch
                  <svg className="size-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/#work"
                  className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-[--surface-elevated] px-8 py-4 text-base font-semibold text-[--color-foreground] transition-all hover:border-[--color-accent]/40"
                >
                  View More Work
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
