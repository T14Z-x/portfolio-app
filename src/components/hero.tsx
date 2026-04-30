"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { profile } from "@/data/personal";
import { HeroBackground } from "./hero-background";

const heroStats = [
  {
    label: "Core stack",
    value: "Next.js / TypeScript / Motion",
  },
  {
    label: "Years shipping",
    value: `${profile.yearsOfExperience}+`,
  },
  {
    label: "Recent partners",
    value: "Fintech, SaaS, Agencies",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;
  const containerVariants = animationsEnabled ? staggerContainer : undefined;
  const itemVariants = animationsEnabled ? fadeIn : undefined;
  const parentInitial = animationsEnabled ? "hidden" : undefined;
  const parentAnimate = animationsEnabled ? "visible" : undefined;

  return (
    <motion.section
      id="hero"
      className="relative overflow-hidden border-b border-white/10 bg-[#050814]"
      initial={animationsEnabled ? { opacity: 0, y: 24 } : undefined}
      animate={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: animationsEnabled ? 0.7 : 0, ease: [0.21, 0.71, 0.4, 1] }}
    >
      <HeroBackground />
      <Container className="relative z-10 flex flex-col items-center gap-16 pb-28 pt-20 text-center text-white sm:gap-20 sm:pt-28">
        <motion.div
          className="flex flex-col items-center gap-6"
          variants={containerVariants}
          initial={parentInitial}
          animate={parentAnimate}
        >
          <motion.span
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70"
          >
            {profile.title}
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-balance text-5xl font-semibold uppercase tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="block leading-none">{profile.firstName}</span>
            <span className="block leading-none">{profile.lastName}</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base text-white/78 md:text-lg"
          >
            {profile.heroTagline}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          variants={containerVariants}
          initial={parentInitial}
          animate={parentAnimate}
        >
          <motion.div
            variants={itemVariants}
            whileHover={animationsEnabled ? { y: -3 } : undefined}
            whileTap={animationsEnabled ? { scale: 0.98 } : undefined}
          >
            <ButtonLink href="#work">View Work</ButtonLink>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={animationsEnabled ? { y: -3 } : undefined}
            whileTap={animationsEnabled ? { scale: 0.98 } : undefined}
          >
            <ButtonLink
              href={`mailto:${profile.email}`}
              variant="secondary"
              className="border-white/20 bg-white/8 text-white backdrop-blur-md hover:border-white/40 hover:text-white"
            >
              Start a project
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/58 sm:hidden"
          variants={containerVariants}
          initial={parentInitial}
          whileInView={animationsEnabled ? "visible" : undefined}
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <div className="text-center">
                <p>{stat.label}</p>
                <p className="mt-1 text-[0.8rem] font-semibold normal-case tracking-normal text-white/84">
                  {stat.value}
                </p>
              </div>
              {index < heroStats.length - 1 ? (
                <span aria-hidden className="size-1 rounded-full bg-white/26" />
              ) : null}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="hidden w-full gap-4 sm:grid sm:grid-cols-3"
          variants={containerVariants}
          initial={parentInitial}
          whileInView={animationsEnabled ? "visible" : undefined}
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {heroStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={animationsEnabled ? { y: -6, scale: 1.01 } : undefined}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="rounded-3xl border border-white/12 bg-black/28 p-6 shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur-md"
            >
              <div className="flex h-full flex-col items-center text-center">
                <p className="text-xs uppercase tracking-[0.28em] text-white/58">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
