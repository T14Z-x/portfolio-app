"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/personal";

const headerActionClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-[--color-border] bg-[--surface-elevated] text-[--color-muted] transition hover:text-[--color-accent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

function HomeIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
    >
      <path
        d="M3 10.5 12 3l9 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 9.75V21h13.5V9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 21v-6h4.5v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[--color-border]/60 bg-[--surface-primary]/80 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-4 text-[11px] uppercase tracking-[0.32em] text-[--color-muted] sm:text-xs">
        <span className="hidden md:inline-flex">{profile.location}</span>
        <Link
          href={`mailto:${profile.email}`}
          className="group inline-flex items-center gap-2 text-[--color-muted] transition hover:text-[--color-accent]"
        >
          <span className="font-medium">{profile.email}</span>
          <span className="size-1 rounded-full bg-[--color-accent] opacity-0 transition group-hover:opacity-100" />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/#main"
            aria-label="Go to homepage"
            className={headerActionClass}
          >
            <HomeIcon />
          </Link>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
