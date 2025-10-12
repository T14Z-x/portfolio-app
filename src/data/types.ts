export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  image?: string;
  url?: string;
  year: number;
  caseStudyRoute?: string;
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
