"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { clsx } from "clsx";

const iconClass = "size-5 transition";

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx(iconClass, className)}
  >
    <path
      d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx(iconClass, className)}
  >
    <path
      d="M20.354 15.354a9 9 0 0 1-11.708-11.708 9 9 0 1 0 11.708 11.708Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";
  const label = isDark ? "Activate light theme" : "Activate dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[--color-border] bg-[--surface-elevated] text-[--color-muted] transition hover:text-[--color-accent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      {!mounted ? null : isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
