"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const LOADER_DURATION_MS = 2200;
const LOADER_MAX_PROGRESS_BEFORE_READY = 96;
const LOADER_FINISH_DURATION_MS = 280;
const EXIT_DURATION_MS = 900;
const MAX_ASSET_WAIT_MS = 7000;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const easeOutQuart = (value: number) => 1 - (1 - value) ** 4;

const waitForWindowLoad = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") {
      resolve();
      return;
    }

    const handleLoad = () => resolve();
    window.addEventListener("load", handleLoad, { once: true });
  });

const waitForFonts = () => {
  if (typeof document === "undefined" || !("fonts" in document)) {
    return Promise.resolve();
  }

  return document.fonts.ready.then(() => undefined).catch(() => undefined);
};

const waitForCriticalVideos = () => {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  const videos = Array.from(document.querySelectorAll("video"));
  if (videos.length === 0) {
    return Promise.resolve();
  }

  return Promise.all(
    videos.map(
      (video) =>
        new Promise<void>((resolve) => {
          if (video.readyState >= 2) {
            resolve();
            return;
          }

          const finish = () => {
            video.removeEventListener("loadeddata", finish);
            video.removeEventListener("error", finish);
            resolve();
          };

          video.addEventListener("loadeddata", finish, { once: true });
          video.addEventListener("error", finish, { once: true });
        }),
    ),
  ).then(() => undefined);
};

const waitForInitialSiteReady = async () => {
  await Promise.race([
    Promise.all([waitForWindowLoad(), waitForFonts(), waitForCriticalVideos()]),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, MAX_ASSET_WAIT_MS);
    }),
  ]);
};

export function SiteLoader() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showRevealMark, setShowRevealMark] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const duration = prefersReducedMotion ? 900 : LOADER_DURATION_MS;
  const exitDuration = prefersReducedMotion ? 250 : EXIT_DURATION_MS;
  const markHoldDuration = prefersReducedMotion ? 80 : 220;

  const statusLabel = useMemo(() => {
    if (progress < 28) return "booting scene";
    if (progress < 62) return "warming motion";
    if (progress < 88) return "indexing interface";
    if (progress < 100) return "syncing final assets";
    return "revealing portfolio";
  }, [progress]);

  useEffect(() => {
    if (!isVisible) return;

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let frameId = 0;
    let markTimer = 0;
    let exitTimer = 0;
    let cancelled = false;
    let isReady = false;
    let revealStartedAt: number | null = null;
    let hasScheduledReveal = false;
    const startedAt = performance.now();

    waitForInitialSiteReady().then(() => {
      if (cancelled) return;
      isReady = true;
    });

    const updateFrame = (now: number) => {
      const elapsed = now - startedAt;
      const minDurationElapsed = elapsed >= duration;

      if (isReady && minDurationElapsed) {
        if (revealStartedAt === null) {
          revealStartedAt = now;
        }

        const revealElapsed = now - revealStartedAt;
        const revealProgress = clamp(
          revealElapsed / LOADER_FINISH_DURATION_MS,
          0,
          1,
        );
        const nextProgress =
          LOADER_MAX_PROGRESS_BEFORE_READY +
          (100 - LOADER_MAX_PROGRESS_BEFORE_READY) * easeOutQuart(revealProgress);
        setProgress(Math.round(nextProgress));

        if (revealProgress >= 1) {
          setProgress(100);
          if (!hasScheduledReveal) {
            hasScheduledReveal = true;
            setShowRevealMark(true);
            markTimer = window.setTimeout(() => {
              setIsExiting(true);
            }, markHoldDuration);
            exitTimer = window.setTimeout(() => {
              setIsVisible(false);
            }, markHoldDuration + exitDuration);
          }
          return;
        }
      } else {
        const normalized = clamp(elapsed / duration, 0, 1);
        const nextProgress = Math.min(
          LOADER_MAX_PROGRESS_BEFORE_READY,
          Math.round(easeOutQuart(normalized) * LOADER_MAX_PROGRESS_BEFORE_READY),
        );
        setProgress(nextProgress);
      }

      frameId = window.requestAnimationFrame(updateFrame);
    };

    frameId = window.requestAnimationFrame(updateFrame);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(markTimer);
      window.clearTimeout(exitTimer);
    };
  }, [duration, exitDuration, isVisible, markHoldDuration, prefersReducedMotion]);

  if (!isVisible) {
    return null;
  }

  const progressLabel = String(progress).padStart(3, "0");

  return (
    <AnimatePresence>
      <motion.div
        key="site-loader"
        className="pointer-events-auto fixed inset-0 z-[120] overflow-hidden text-[#f6f3ea]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {showRevealMark && !isExiting ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.2, ease: "easeOut" }}
          >
            <span className="terminal-loader-mark text-[clamp(4.5rem,14vw,9rem)] leading-none">
              T14Z
            </span>
          </motion.div>
        ) : null}
        <motion.div
          aria-hidden
          className="terminal-loader-panel absolute inset-x-0 top-0 h-1/2 border-b border-white/10"
          animate={isExiting ? { y: "-105%" } : { y: 0 }}
          transition={{ duration: exitDuration / 1000, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          aria-hidden
          className="terminal-loader-panel absolute inset-x-0 bottom-0 h-1/2 border-t border-white/10"
          animate={isExiting ? { y: "105%" } : { y: 0 }}
          transition={{ duration: exitDuration / 1000, ease: [0.76, 0, 0.24, 1] }}
        />
        {isExiting ? (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2 overflow-hidden"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: "-105%", opacity: 1 }}
              transition={{ duration: exitDuration / 1000, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute inset-0">
                <span className="terminal-loader-mark absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[clamp(4.5rem,14vw,9rem)] leading-none">
                  T14Z
                </span>
              </div>
            </motion.div>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 overflow-hidden"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: "105%", opacity: 1 }}
              transition={{ duration: exitDuration / 1000, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute inset-0">
                <span className="terminal-loader-mark absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-[clamp(4.5rem,14vw,9rem)] leading-none">
                  T14Z
                </span>
              </div>
            </motion.div>
          </>
        ) : null}

        <motion.div
          className="terminal-loader-grid relative z-10 flex min-h-screen flex-col justify-between px-5 py-5 sm:px-8 sm:py-7"
          animate={
            isExiting
              ? { opacity: 0, scale: 0.985, filter: "blur(8px)" }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: prefersReducedMotion ? 0.18 : 0.42, ease: "easeInOut" }}
        >
          <div className="flex items-start justify-between gap-4 text-[0.68rem] uppercase tracking-[0.32em] text-[#f6f3ea]/62 sm:text-[0.74rem]">
            <div className="space-y-2">
              <p className="terminal-loader-chip">Loading</p>
              <p>/ boot sequence initialized</p>
            </div>
            <div className="text-right">
              <p>portfolio shell</p>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
              <div>
                <motion.p
                  className="text-[0.72rem] uppercase tracking-[0.34em] text-[#f6f3ea]/54 sm:text-[0.8rem]"
                  animate={prefersReducedMotion ? undefined : { opacity: [0.45, 0.75, 0.45] }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  [{statusLabel}]
                </motion.p>
                <div className="mt-5 flex items-end gap-4 sm:gap-6">
                  <p className="text-[clamp(5rem,16vw,11rem)] font-semibold leading-none tracking-[-0.08em]">
                    {progressLabel}
                  </p>
                  <p className="pb-4 text-xl font-medium tracking-[-0.04em] text-[#f6f3ea]/78 sm:pb-5 sm:text-3xl">
                    %
                  </p>
                </div>
                <div className="mt-8 max-w-2xl">
                  <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full bg-[#f6f3ea]"
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.18 }}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4 text-[0.68rem] uppercase tracking-[0.3em] text-[#f6f3ea]/48 sm:text-[0.72rem]">
                    <span>/ preparing reveal</span>
                    <span className="terminal-loader-cursor inline-flex items-center gap-2">
                      <span>&gt;</span>
                      <span>stand by</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-l border-white/10 pl-4 text-[0.7rem] uppercase tracking-[0.28em] text-[#f6f3ea]/52 sm:pl-6 sm:text-[0.76rem]">
                <p>[ theme ] light/dark sync</p>
                <p>[ media ] hero background armed</p>
                <p>[ motion ] smooth scroll online</p>
                <p>[ route ] initial viewport locked</p>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 text-[0.68rem] uppercase tracking-[0.3em] text-[#f6f3ea]/46 sm:text-[0.72rem]">
            <span>© initializing interface</span>
            <span>/{progressLabel}]</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
