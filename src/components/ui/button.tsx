"use client";

import Link from "next/link";
import { clsx } from "clsx";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "sm";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "type" | "href"> & {
    href: string;
  };

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-[--color-accent]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[--color-accent] text-white shadow-md shadow-[--color-accent-soft] hover:scale-[1.01] active:scale-[0.99]",
  secondary:
    "border border-[--color-border] bg-[--surface-elevated] text-[--color-foreground] hover:border-[--color-accent] hover:text-[--color-accent]",
  ghost:
    "text-[--color-muted] hover:text-[--color-accent] hover:bg-[--color-accent-soft]",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-sm md:text-base",
  sm: "px-4 py-2 text-xs md:text-sm",
};

function getClassName({
  variant,
  size,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
}) {
  return clsx(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={getClassName({ variant, size, className })} {...props}>
      {icon}
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  href,
  ...props
}: AnchorProps) {
  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (href.startsWith("http")) {
    return (
      <a
        className={getClassName({ variant, size, className })}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={getClassName({ variant, size, className })}
      href={href}
      {...props}
    >
      {content}
    </Link>
  );
}
