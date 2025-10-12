import Link from "next/link";
import { Container } from "@/components/ui/container";
import { profile } from "@/data/personal";

const currentYear = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="bg-[--surface-elevated]/40 py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-sm text-[--color-muted]">
          <p className="font-semibold text-[--color-foreground]">
            {profile.firstName} {profile.lastName}
          </p>
          <p>{profile.title}</p>
          <p>© {currentYear} · Crafted with React & TypeScript</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-[--color-muted]">
          <span>{profile.location}</span>
          <Link
            href={`mailto:${profile.email}`}
            className="transition hover:text-[--color-accent]"
          >
            {profile.email}
          </Link>
          <Link
            href="https://github.com/vercel/next.js"
            className="transition hover:text-[--color-accent]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built on Next.js
          </Link>
        </div>
      </Container>
    </footer>
  );
}
