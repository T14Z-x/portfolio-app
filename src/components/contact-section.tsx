import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/personal";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b border-[--color-border]/60 bg-[--surface-primary] py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="prism-background" />
        <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>
      <Container className="relative z-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="flex h-full flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s ship your next release"
              description="Share a problem statement, Figma link, or growth target. I typically reply within two business days with next steps."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-1 flex-col justify-between gap-6 rounded-3xl border border-[--color-border]/70 bg-[--surface-elevated]/60 p-8 shadow-[var(--shadow-soft)]/40">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[--color-muted]">Location</p>
                <p className="mt-2 text-lg font-semibold text-[--color-foreground]">{profile.location}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[--color-muted]">Email</p>
                <Link
                  href={`mailto:${profile.email}`}
                  className="mt-2 inline-flex items-center text-lg font-medium text-[--color-accent] transition hover:underline"
                >
                  {profile.email}
                </Link>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[--color-muted]">Socials</p>
                <ul className="mt-2 flex flex-wrap gap-3 text-sm font-medium text-[--color-muted]">
                  {profile.socials.map((social) => (
                    <li key={social.label}>
                      <Link
                        href={social.href}
                        className="transition hover:text-[--color-accent]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[--color-muted]">Discord</p>
                <p className="mt-2 text-sm font-semibold text-[--color-foreground]">t14z</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[--color-muted]">Response Time</p>
                <p className="mt-2 text-sm text-[--color-muted]">Typically replies within 24 hours (GMT+6)</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="h-full">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
