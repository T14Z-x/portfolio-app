import { clsx } from "clsx";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <header className={clsx("space-y-4", className)}>
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full bg-[--color-accent-soft] px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[--color-accent]">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base text-[--color-muted] md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
