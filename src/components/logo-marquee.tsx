import { Container } from "@/components/ui/container";
import { logos } from "@/data/logos";

const marqueeItems = [...logos, ...logos];

export function LogoMarquee() {
  return (
    <section
      id="logos"
      className="relative overflow-hidden border-b border-[--color-border]/60 bg-[--surface-elevated]/40 py-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_center,_rgba(0,0,0,0.9),_transparent_78%)]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(59,130,246,0.08),_rgba(14,165,233,0.06),_transparent_65%)]" />
        <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:110px_110px]" />
      </div>
      <Container className="relative z-10 space-y-6">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.32em] text-[--color-muted]">
          <span>Trusted by teams & partners</span>
          <span className="hidden sm:block">Hover or focus to pause</span>
        </div>
        <div className="marquee-container" aria-hidden>
          <div className="marquee-track">
            {marqueeItems.map((logo, index) => (
              <span key={`${logo.name}-${index}`} className="marquee-item">
                {logo.name}
              </span>
            ))}
          </div>
        </div>
        <p className="sr-only">
          Clients and collaborators include {logos.map((logo) => logo.name).join(", ")}
        </p>
      </Container>
    </section>
  );
}
