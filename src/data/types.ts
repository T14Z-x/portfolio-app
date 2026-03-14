export type ProjectLink =
  | {
      type: "public";
      href: string;
      label?: string;
    }
  | {
      type: "private";
      label?: string;
      note?: string;
    };

export type ProjectCaseStudy = {
  slug: string;
  role: string;
  team: string;
  timeline: string;
  expansionHero?: {
    mediaType?: "video" | "image";
    mediaSrc: string;
    posterSrc?: string;
    bgImageSrc: string;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
  };
  reportUrl?: string;
  reportLabel?: string;
  challenge: string;
  scope: string[];
  contributions: string[];
  outcomes: string[];
  stack: string[];
  confidentialityNote?: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  image?: string;
  url?: string;
  link?: ProjectLink;
  year: number;
  caseStudyRoute?: string;
  caseStudy?: ProjectCaseStudy;
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string | "Present";
  bullets: string[];
  tech: string[];
};

export type Logo = {
  name: string;
  image?: string;
  url?: string;
};

export type Technology = {
  name: string;
  highlight?: boolean;
  asset?: string;
  blurb?: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type PersonalProfile = {
  firstName: string;
  lastName: string;
  nickname?: string;
  location: string;
  email: string;
  title: string;
  heroTagline: string;
  aboutHeadline: string;
  about: string[];
  yearsOfExperience: number;
  socials: SocialLink[];
};
