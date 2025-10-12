import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { technologies } from "@/data/technologies";
import { TechMarquee } from "@/components/tech-marquee";

export function TechStack() {
  return (
    <section
      id="tech"
      className="relative overflow-hidden border-b border-[--color-border]/60 bg-[--surface-primary]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="prism-background" />
        <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>
      <Container className="relative z-10 grid gap-12 py-16 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
        <div className="space-y-8">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-[0.32em] text-[--color-muted]">
              Core Stack
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-base text-[--color-muted] md:text-lg">
              A motion-obsessed toolkit anchored in React and TypeScript, tuned for rapid iteration,
              production reliability, and expressive interface design.
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <Reveal key={tech.name} delay={index * 0.05 + 0.12}>
                <Badge highlight={tech.highlight}>{tech.name}</Badge>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.12} className="h-full">
          <TechMarquee technologies={technologies} />
        </Reveal>
      </Container>
    </section>
  );
}
