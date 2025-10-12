import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  highlight?: boolean;
};

export function Badge({ className, highlight, ...rest }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border border-transparent px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[--color-foreground]/80 transition",
        highlight
          ? "bg-[--color-accent] text-white shadow-[0_14px_32px_var(--color-accent-soft)]"
          : "bg-[--surface-elevated]/80 border-[--color-border] backdrop-blur",
        className,
      )}
      {...rest}
    />
  );
}
