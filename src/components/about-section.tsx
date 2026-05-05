"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Container } from "@/components/ui/container";
import Folder from "@/components/ui/folder";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/personal";

gsap.registerPlugin(ScrollTrigger);

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

type AboutSignal = {
  id: string;
  label: string;
  headline: string;
  body: string;
  chips: string[];
  accent: string;
  codeLines: string[];
  interfaceLabel: string;
};

const aboutSignals: AboutSignal[] = [
  {
    id: "software",
    label: "Software",
    headline: "I build products with real structure under the visuals.",
    body: "My CS background keeps me grounded in maintainable logic, scalable features, and product decisions that survive beyond the first launch.",
    chips: ["BRAC CS", "Full Stack", "Product Thinking"],
    accent: "99, 102, 241",
    codeLines: ["type Product = {", "  logic: stable;", "  ui: intentional;", "}"],
    interfaceLabel: "system map",
  },
  {
    id: "frontend",
    label: "Frontend",
    headline: "Clean interaction, sharp hierarchy, and modern execution matter to me.",
    body: "From Skarbol Tech to Aurwave, I have been learning through real interfaces, not throwaway concepts. I like shipping UI that feels crisp, intentional, and production-ready.",
    chips: ["React", "Next.js", "Motion-first"],
    accent: "56, 189, 248",
    codeLines: ["<motion.main>", "  <Flow state=\"ready\" />", "</motion.main>"],
    interfaceLabel: "frontend flow",
  },
  {
    id: "design",
    label: "Design",
    headline: "I care about cool modern design, not generic layouts dressed up with effects.",
    body: "The goal is not decoration. It is to make the product feel confident, memorable, and easier to understand because the visual decisions are doing real work.",
    chips: ["Visual Systems", "Hierarchy", "Brand Feel"],
    accent: "244, 114, 182",
    codeLines: ["tokens = {", "  rhythm: clear,", "  contrast: useful", "}"],
    interfaceLabel: "visual system",
  },
  {
    id: "ai",
    label: "AI",
    headline: "I am actively exploring RAGs, LLM workflows, and where AI becomes useful inside products.",
    body: "I do not want AI as a buzzword add-on. I am interested in where it genuinely improves research, tooling, automation, and product capability.",
    chips: ["RAGs", "LLMs", "Founder Direction"],
    accent: "34, 197, 94",
    codeLines: ["const answer = rag(", "  context,", "  userIntent", ");"],
    interfaceLabel: "ai workflow",
  },
];

const socialPaperOrder = ["LinkedIn", "Discord", "GitHub"];
const connectSocials = socialPaperOrder
  .map((label) => profile.socials.find((social) => social.label === label))
  .filter((social): social is (typeof profile.socials)[number] => Boolean(social));

function AboutCopyCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-[--color-border]/70 bg-[color-mix(in_srgb,var(--surface-elevated)_78%,transparent)] p-6 shadow-[var(--shadow-soft)] backdrop-blur sm:p-7">
      <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[--color-muted]">
        {title}
      </p>
      <p className="text-base leading-relaxed text-[--color-foreground]/86 md:text-lg">
        {text}
      </p>
    </div>
  );
}

function CodeToDesignPanel({
  signal,
  animationsEnabled,
}: {
  signal: AboutSignal;
  animationsEnabled: boolean;
}) {
  return (
    <div
      data-signal-item
      className="relative h-[154px] overflow-hidden rounded-[22px] border border-[--color-border]/70 bg-[color-mix(in_srgb,var(--surface-primary)_72%,transparent)] p-4"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--text-primary) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--text-primary) 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-20"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${signal.accent}, 0.16), transparent)`,
        }}
        animate={animationsEnabled ? { x: ["-45%", "560%"] } : undefined}
        transition={
          animationsEnabled
            ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      />

      <div className="relative z-10 grid h-full grid-cols-[1fr_auto_1fr] gap-4">
        <div className="flex min-w-0 flex-col justify-center gap-2 font-mono text-[0.72rem] leading-none text-[--color-muted]">
          {signal.codeLines.map((line, index) => (
            <motion.p
              key={`${signal.id}-${line}`}
              animate={animationsEnabled ? { opacity: [0.46, 0.84, 0.46] } : undefined}
              transition={
                animationsEnabled
                  ? {
                      duration: 2.1,
                      repeat: Infinity,
                      delay: index * 0.18,
                      ease: "easeInOut",
                    }
                  : undefined
              }
              className="truncate"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <div
          aria-hidden
          className="my-1 w-px"
          style={{
            background: `linear-gradient(180deg, transparent, rgba(${signal.accent}, 0.8), transparent)`,
          }}
        />

        <div className="flex min-w-0 flex-col justify-center gap-3">
          <div className="h-4 w-20 rounded-full bg-[--surface-muted]" />
          <div className="grid grid-cols-[0.75fr_1fr] gap-2">
            <div
              className="h-12 rounded-xl"
              style={{ backgroundColor: `rgba(${signal.accent}, 0.28)` }}
            />
            <div className="space-y-2">
              <div className="h-3 rounded-full bg-[--surface-muted]" />
              <div className="h-3 w-2/3 rounded-full bg-[color-mix(in_srgb,var(--surface-muted)_70%,transparent)]" />
              <div
                className="h-3 w-1/2 rounded-full"
                style={{ backgroundColor: `rgba(${signal.accent}, 0.36)` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[--color-muted]">
              {signal.interfaceLabel}
            </p>
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: `rgb(${signal.accent})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialBrandIcon({ label }: { label: string }) {
  const normalizedLabel = label.toLowerCase();
  const iconClass = "size-5";

  if (normalizedLabel === "github") {
    return (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.49 0 12.27c0 5.42 3.44 10.02 8.21 11.64.6.11.82-.27.82-.59 0-.29-.01-1.06-.02-2.08-3.34.74-4.04-1.65-4.04-1.65-.55-1.42-1.33-1.8-1.33-1.8-1.09-.76.08-.75.08-.75 1.21.09 1.84 1.27 1.84 1.27 1.07 1.88 2.81 1.34 3.49 1.02.11-.8.42-1.34.76-1.65-2.67-.31-5.47-1.36-5.47-6.06 0-1.34.47-2.43 1.24-3.29-.13-.31-.54-1.56.12-3.24 0 0 1.01-.33 3.3 1.26A11.25 11.25 0 0 1 12 5.9c1.02 0 2.05.14 3.01.41 2.29-1.59 3.3-1.26 3.3-1.26.65 1.68.24 2.93.12 3.24.77.86 1.24 1.95 1.24 3.29 0 4.71-2.81 5.75-5.49 6.06.43.38.82 1.13.82 2.28 0 1.65-.02 2.98-.02 3.39 0 .33.22.71.83.59A12.18 12.18 0 0 0 24 12.27C24 5.49 18.63 0 12 0Z" />
      </svg>
    );
  }

  if (normalizedLabel === "linkedin") {
    return (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
      </svg>
    );
  }

  if (normalizedLabel === "discord") {
    return (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.45.86-.61 1.25a18.27 18.27 0 0 0-5.48 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.89 1.52.06.06 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06c0 .02.01.04.03.06a19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.23-2a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.88-.9.08.08 0 0 1-.01-.12l.38-.3a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01l.37.3a.08.08 0 0 1-.01.13 12.3 12.3 0 0 1-1.87.89.08.08 0 0 0-.04.11c.36.7.77 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.5-4.76-.84-8.89-3.55-12.55a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-.96-2.16-2.16 0-1.19.96-2.15 2.16-2.15 1.19 0 2.15.96 2.15 2.15 0 1.2-.96 2.16-2.15 2.16Zm7.98 0c-1.18 0-2.16-.96-2.16-2.16 0-1.19.96-2.15 2.16-2.15 1.19 0 2.16.96 2.16 2.15 0 1.2-.97 2.16-2.16 2.16Z" />
      </svg>
    );
  }

  return (
    <span className="text-sm font-semibold uppercase" aria-hidden="true">
      {label.slice(0, 1)}
    </span>
  );
}

function SocialFolderPaper({
  social,
}: {
  social: (typeof profile.socials)[number];
}) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${social.label}`}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      className="flex h-full flex-col justify-between p-2 text-[#07111f] transition-transform hover:scale-[1.03]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-[#07111f] text-white">
          <SocialBrandIcon label={social.label} />
        </span>
        <span className="text-[0.34rem] font-black uppercase tracking-[0.16em] text-[#07111f]/38">
          Open
        </span>
      </div>
      <div>
        <p className="text-[0.62rem] font-black leading-none tracking-tight">
          {social.label}
        </p>
        <p className="mt-1 text-[0.38rem] font-semibold uppercase tracking-[0.12em] text-[#07111f]/48">
          Profile link
        </p>
      </div>
    </a>
  );
}

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelContentRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const activeSignal = aboutSignals[activeSignalIndex] ?? aboutSignals[0];

  useEffect(() => {
    if (!animationsEnabled) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSignalIndex((current) => (current + 1) % aboutSignals.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [animationsEnabled]);

  useEffect(() => {
    if (!animationsEnabled || !panelRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 42, rotateX: 8, filter: "blur(18px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 74%",
          },
        },
      );

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.08,
          rotation: 8,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, panelRef);

    return () => ctx.revert();
  }, [animationsEnabled]);

  useEffect(() => {
    if (!animationsEnabled || !panelContentRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-signal-item]",
        { opacity: 0, y: 18, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
        },
      );
    }, panelContentRef);

    return () => ctx.revert();
  }, [activeSignalIndex, animationsEnabled]);

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-[--color-border]/60 bg-[--surface-primary] py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="prism-background" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(color-mix(in_srgb,var(--text-primary)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--text-primary)_6%,transparent)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>

      <Container className="relative z-10 space-y-16">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title={profile.aboutHeadline}
            description={profile.about[0]}
          />
        </Reveal>

        <motion.div
          className="grid gap-4 md:grid-cols-[0.94fr_1.06fr] md:items-stretch"
          variants={animationsEnabled ? staggerContainer : undefined}
          initial={animationsEnabled ? "hidden" : undefined}
          whileInView={animationsEnabled ? "visible" : undefined}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={animationsEnabled ? fadeIn : undefined}
            className="grid content-start gap-4"
          >
            <AboutCopyCard title="Journey" text={profile.about[1]} />
            <AboutCopyCard title="Direction" text={profile.about[2]} />
            <AboutCopyCard
              title="How I Build"
              text="I like turning rough ideas into usable product surfaces: first clarifying the flow, then shaping the interface, then tightening the implementation until the experience feels deliberate."
            />
          </motion.div>

          <motion.div
            variants={animationsEnabled ? fadeIn : undefined}
            className="flex h-full items-stretch justify-center"
          >
            <div
              ref={panelRef}
              className="relative flex w-full overflow-hidden rounded-[28px] border border-[--color-border]/70 bg-[color-mix(in_srgb,var(--surface-elevated)_84%,transparent)] p-6 shadow-[var(--shadow-soft)] backdrop-blur sm:p-7"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-45"
                style={{
                  backgroundImage:
                    "linear-gradient(color-mix(in srgb, var(--text-primary) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--text-primary) 7%, transparent) 1px, transparent 1px)",
                  backgroundSize: "70px 70px",
                }}
              />
              <div
                ref={glowRef}
                className="pointer-events-none absolute inset-[-18%] opacity-90"
                style={{
                  background: `
                    radial-gradient(circle at 20% 18%, rgba(${activeSignal.accent}, 0.3), transparent 28%),
                    radial-gradient(circle at 84% 20%, color-mix(in srgb, var(--surface-elevated) 42%, transparent), transparent 24%),
                    radial-gradient(circle at 52% 100%, rgba(${activeSignal.accent}, 0.22), transparent 38%)
                  `,
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,_transparent,_color-mix(in_srgb,var(--color-foreground)_34%,transparent),_transparent)]" />

              <div className="relative z-10 flex w-full flex-col gap-8">
                <div className="flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[--color-muted]">
                  <span>Focus</span>
                  <span>{`0${activeSignalIndex + 1} / 0${aboutSignals.length}`}</span>
                </div>

                <div
                  key={activeSignal.id}
                  ref={panelContentRef}
                  className="flex h-full flex-col gap-8"
                >
                  <div className="space-y-4">
                    <div
                      data-signal-item
                      className="inline-flex w-fit rounded-full border px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.26em]"
                      style={{
                        color: `rgb(${activeSignal.accent})`,
                        borderColor: `rgba(${activeSignal.accent}, 0.3)`,
                        backgroundColor: `rgba(${activeSignal.accent}, 0.1)`,
                      }}
                    >
                      {activeSignal.label}
                    </div>

                    <div data-signal-item className="space-y-4">
                      <h3 className="text-4xl font-semibold leading-none tracking-[-0.06em] text-[--color-foreground] sm:text-5xl">
                        {activeSignal.label}
                      </h3>
                      <div
                        className="h-px w-24"
                        style={{
                          background: `linear-gradient(90deg, rgba(${activeSignal.accent}, 0.96), transparent)`,
                        }}
                      />
                    </div>
                  </div>

                  <CodeToDesignPanel
                    signal={activeSignal}
                    animationsEnabled={animationsEnabled}
                  />

                  <div className="space-y-4">
                    <p
                      data-signal-item
                      className="max-w-xl text-lg leading-relaxed text-[--color-foreground]/90 sm:text-xl"
                    >
                      {activeSignal.headline}
                    </p>
                    <p
                      data-signal-item
                      className="max-w-xl text-sm leading-relaxed text-[--color-muted] sm:text-base"
                    >
                      {activeSignal.body}
                    </p>
                  </div>

                  <div data-signal-item className="flex flex-wrap gap-2">
                    {activeSignal.chips.map((chip) => (
                      <span
                        key={`${activeSignal.id}-${chip}`}
                        className="rounded-full border border-[--color-border]/70 bg-[color-mix(in_srgb,var(--surface-primary)_72%,transparent)] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[--color-muted]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={animationsEnabled ? fadeIn : undefined}
          initial={animationsEnabled ? "hidden" : undefined}
          whileInView={animationsEnabled ? "visible" : undefined}
          viewport={{ once: true, amount: 0.5 }}
          className="relative overflow-visible rounded-[28px] border border-[--color-border]/70 bg-[color-mix(in_srgb,var(--surface-elevated)_84%,transparent)] p-6 shadow-[var(--shadow-soft)] backdrop-blur sm:p-8"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--text-primary) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--text-primary) 7%, transparent) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_minmax(260px,0.7fr)] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[--color-muted]">
                Connect
              </p>
              <h3 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-[--color-foreground] md:text-3xl">
                Open the folder to reach me.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[--color-muted] md:text-base">
                GitHub, LinkedIn, and Discord sit inside the file. Click the folder, then open the paper you need.
              </p>
            </div>

            <div className="flex min-h-[310px] flex-col items-center justify-center gap-8 py-10">
              <Folder
                size={1.45}
                color="#38BDF8"
                items={connectSocials.map((social) => (
                  <SocialFolderPaper key={social.label} social={social} />
                ))}
                className="origin-center"
              />
              <p className="text-center text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[--color-muted]">
                Click folder, then click a paper
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
