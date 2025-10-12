import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    company: "T14Z Studio",
    role: "Founder & Lead Product Engineer",
    start: "2022",
    end: "Present",
    bullets: [
      "Partner with global founders to ship conversion-focused marketing sites, dashboards, and SaaS platforms end to end.",
      "Design motion systems and UI kits that keep teams aligned on brand feel while accelerating delivery.",
      "Own discovery, prototyping, and technical delivery across Next.js, serverless APIs, and third-party integrations.",
    ],
    tech: ["Next.js", "TypeScript", "Framer Motion", "Node.js"],
  },
  {
    company: "Skarbol.Tech",
    role: "Full Stack Developer",
    start: "2024",
    end: "Present",
    bullets: [
      "Rebuilt a multi-tenant analytics platform with real-time dashboards, globalisation, and motion-rich onboarding flows.",
      "Implemented a shared component library and animation guidelines to keep marketing and product surfaces consistent.",
      "Collaborated with design and backend teammates to ship quarterly feature launches across four time zones.",
    ],
    tech: ["React", "Next.js", "Tailwind CSS", "Storybook"],
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    start: "2019",
    end: "2020",
    bullets: [
      "Delivered bespoke web apps and marketing experiences for agencies across Bangladesh, Singapore, and the UK.",
      "Guided clients through product discovery, content modeling, and analytics instrumentation.",
      "Integrated CMS workflows, payment gateways, and automation pipelines that scaled with client growth.",
    ],
    tech: ["Vue", "Laravel", "WordPress", "AWS"],
  },
];
