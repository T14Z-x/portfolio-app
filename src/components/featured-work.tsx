import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";

export function FeaturedWork() {
  return (
    <section
      id="work"
      className="relative overflow-hidden border-b border-[--color-border]/60 bg-[--surface-primary] py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="prism-background" />
        <div className="absolute inset-0 mix-blend-overlay opacity-18 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>
      <Container className="relative z-10 space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Work"
            title="Recent web products engineered with motion-first thinking"
            description="From fintech dashboards to marketing narratives, these builds pair systems strategy with expressive UI and dependable engineering."
          />
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
