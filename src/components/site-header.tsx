"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/personal";

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
        <ThemeToggle />
      </Container>
    </header>
  );
}
