import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";
import { AboutSection } from "@/components/about-section";
import { FeaturedWork } from "@/components/featured-work";
import { LogoMarquee } from "@/components/logo-marquee";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <main id="main" className="flex-1">
        <Hero />
        <TechStack />
        <AboutSection />
        <FeaturedWork />
        <LogoMarquee />
        <ExperienceTimeline />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
