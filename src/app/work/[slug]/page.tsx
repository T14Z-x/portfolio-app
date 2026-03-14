import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyContent } from "@/components/case-study-content";
import { SiteFooter } from "@/components/site-footer";
import { getProjectByCaseStudySlug, hasCaseStudy, projects } from "@/data/projects";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects
    .filter(hasCaseStudy)
    .map((project) => ({ slug: project.caseStudy.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectByCaseStudySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectByCaseStudySlug(slug);

  if (!project?.caseStudy) {
    notFound();
  }

  return (
    <>
      <CaseStudyContent project={project} />
      <SiteFooter />
    </>
  );
}
