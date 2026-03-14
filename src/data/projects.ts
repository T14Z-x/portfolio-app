import type { Project, ProjectCaseStudy } from "./types";

export const projects: Project[] = [
  {
    id: "cattlesync",
    title: "CattleSync ERP",
    summary:
      "Enterprise ERP for cattle farm operations, centralizing livestock records, people management, customer tracking, and sales workflows in one system.",
    tags: ["React", "Vite", "Tailwind CSS", "Laravel", "MySQL"],
    image: "/media/projects/cattlesync.png",
    link: {
      type: "private",
      label: "Private (NDA)",
      note: "Client URL and repository are confidential.",
    },
    year: 2025,
    caseStudy: {
      slug: "cattlesync-erp",
      role: "Software Developer Intern (Frontend-focused, Full-stack collaboration)",
      team: "4 developers (2 frontend, 2 backend) with QA collaboration",
      timeline: "Oct 21, 2024 - Apr 21, 2025 (6 months)",
      expansionHero: {
        mediaType: "image",
        mediaSrc:
          "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80",
        bgImageSrc:
          "https://images.unsplash.com/photo-1588152850700-c82ecb8ba9b1?auto=format&fit=crop&w=1600&q=80",
        date: "Enterprise Farm Ops",
        scrollToExpand: "Scroll to expand case study",
        textBlend: true,
      },
      reportLabel: "Internship Report (BRACU)",
      reportUrl:
        "https://dspace.bracu.ac.bd:8443/xmlui/bitstream/handle/10361/26749/21301616_CSE.pdf?sequence=1",
      challenge:
        "Build a production-ready ERP that digitizes farm workflows and supports high-volume operational periods for a growing cattle business.",
      scope: [
        "Inventory and livestock classification management.",
        "User management with role-based account setup.",
        "HRM features for staff records and payroll-related views.",
        "Customer management with pagination, searching, and transaction history.",
        "API integration and verification with Axios and Postman.",
      ],
      contributions: [
        "Built responsive interfaces with React, Vite, and Tailwind CSS across core ERP modules.",
        "Implemented CRUD workflows for user, HRM, and customer-facing data flows.",
        "Developed form validation and role assignment logic for secure user onboarding.",
        "Integrated frontend modules with backend endpoints through Axios and coordinated debugging with backend teammates.",
        "Ran API testing and issue verification using Postman in collaboration with QA feedback loops.",
      ],
      outcomes: [
        "Delivered the ERP before Eid Ul Adha, a key business milestone for the client.",
        "Centralized cattle buying, livestock data, sales tracking, people management, and customer records.",
        "Improved operational reliability through API testing, debugging, and QA-assisted validation.",
        "Strengthened team delivery through module-wise ownership, GitHub PR reviews, and regular sync routines.",
      ],
      stack: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Laravel",
        "MySQL",
        "MongoDB",
        "Axios",
        "Postman",
        "GitHub",
      ],
      confidentialityNote:
        "Public details are sanitized from the BRAC University internship report; client codebase and production URL remain private.",
    },
  },
  {
    id: "adelaide-candy",
    title: "Adelaide Candy Co.",
    summary:
      "Playful e-commerce experience for a boutique candy shop with animated storytelling, flavor filters, and seamless checkout flows.",
    tags: ["Next.js", "React", "Framer Motion"],
    image: "/media/projects/adelaide-candy.png",
    link: {
      type: "private",
      label: "Private project",
      note: "Public link unavailable.",
    },
    year: 2025,
    caseStudy: {
      slug: "adelaide-candy-commerce",
      role: "Frontend Engineer (UI Architecture & Motion Design System)",
      team: "3 developers (frontend, backend, QA) + 1 product designer",
      timeline: "May 2025 - Aug 2025 (14 weeks)",
      expansionHero: {
        mediaType: "image",
        mediaSrc: "/media/projects/adelaide-candy.png",
        bgImageSrc:
          "https://images.unsplash.com/photo-1543295740-24cb7bc0c119?auto=format&fit=crop&w=1920&q=80",
        date: "Boutique Candy Commerce",
        scrollToExpand: "Scroll to expand case study",
        textBlend: true,
      },
      challenge:
        "Transform a visually playful candy brand into a production-ready e-commerce platform without sacrificing speed, usability, or brand personality.",
      scope: [
        "Product discovery with category filters, featured collections, and seasonal promos.",
        "Motion-led storytelling blocks across landing, collection, and product detail pages.",
        "Cart and checkout UX with clearer pricing breakdown and shipping context.",
        "Content-managed sections for merchandising updates without code releases.",
        "Mobile-first behavior tuning for product browsing and conversion-critical actions.",
      ],
      contributions: [
        "Built reusable commerce UI primitives in Next.js and React to keep layouts consistent across pages.",
        "Implemented Framer Motion patterns for page transitions and interactive product storytelling.",
        "Designed performant card, gallery, and CTA states with attention to perceived speed and visual hierarchy.",
        "Coordinated with backend and QA to stabilize cart behavior, edge-case states, and checkout validation.",
        "Helped define a component-driven structure so new campaigns could ship with minimal regression risk.",
      ],
      outcomes: [
        "Shipped a cohesive branded storefront that balanced playful visuals with conversion-focused UX.",
        "Reduced UI inconsistency by moving repeated sections onto reusable component patterns.",
        "Improved mobile browsing flow through tighter information hierarchy and clearer interaction cues.",
        "Enabled faster campaign rollout with content-managed sections and predictable page modules.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Framer Motion",
        "Tailwind CSS",
        "Headless CMS",
        "REST API",
        "Vercel",
      ],
      confidentialityNote:
        "Case study details are sanitized; production repository, analytics, and merchant operations remain private.",
    },
  },
  {
    id: "shukria-meat",
    title: "Shukria Meat",
    summary:
      "Direct-to-consumer meat delivery site with product bundles, freshness tracking, and regional fulfillment dashboards.",
    tags: ["React", "TypeScript", "Headless CMS"],
    image: "/media/projects/shukria-meat.png",
    link: {
      type: "private",
      label: "Private project",
      note: "Public link unavailable.",
    },
    year: 2025,
    caseStudy: {
      slug: "shukria-meat-commerce",
      role: "Frontend Engineer (Commerce UX & Fulfillment Flows)",
      team: "4 developers (2 frontend, 1 backend, 1 QA)",
      timeline: "Sep 2025 - Nov 2025 (10 weeks)",
      expansionHero: {
        mediaType: "image",
        mediaSrc: "/media/projects/shukria-meat.png",
        bgImageSrc:
          "https://images.unsplash.com/photo-1606677661991-446cea8ee182?auto=format&fit=crop&w=1920&q=80",
        date: "Fresh Delivery Platform",
        scrollToExpand: "Scroll to expand case study",
        textBlend: true,
      },
      challenge:
        "Create a trust-first online ordering flow for fresh meat delivery where product confidence, timing, and operational clarity directly affect purchase decisions.",
      scope: [
        "Category and cut-based product discovery with bundle and quantity controls.",
        "Delivery-zone and slot-aware checkout experience for reliable fulfillment.",
        "Freshness, sourcing, and handling info modules integrated into product pages.",
        "Order lifecycle states from placement to dispatch with customer-facing status updates.",
        "Operational handoff views aligned with warehouse and delivery coordination steps.",
      ],
      contributions: [
        "Built product and bundle interfaces focused on fast selection, quantity clarity, and price transparency.",
        "Implemented reusable checkout components with strong validation and resilient empty/error states.",
        "Integrated zone-based delivery logic and user feedback messaging for unavailable slots.",
        "Worked closely with QA to verify high-risk ordering paths including retries, edits, and out-of-stock scenarios.",
        "Refined responsive layouts so catalog, cart, and order tracking remained clear on smaller devices.",
      ],
      outcomes: [
        "Delivered a streamlined purchase journey with clearer delivery expectations and fewer ambiguous states.",
        "Improved buyer confidence through better product context, freshness communication, and checkout clarity.",
        "Reduced operational friction by mapping customer-facing states more accurately to fulfillment workflow steps.",
        "Established reusable commerce blocks that accelerated future page and campaign updates.",
      ],
      stack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Headless CMS",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Axios",
      ],
      confidentialityNote:
        "Implementation details are portfolio-safe; production metrics, vendor integrations, and internal tooling are private.",
    },
  },
  {
    id: "one-stop-pet",
    title: "One Stop Pet Adoption",
    summary:
      "Pet adoption marketplace connecting shelters with families through guided onboarding, smart matching, and real-time availability.",
    tags: ["React", "TypeScript", "GraphQL"],
    image: "/media/projects/one-stop-pet.png",
    link: {
      type: "private",
      label: "Private project",
      note: "Public link unavailable.",
    },
    year: 2024,
    caseStudy: {
      slug: "one-stop-pet-adoption",
      role: "Frontend Engineer (Matching Flow & Applicant Experience)",
      team: "3 developers + shelter operations advisor",
      timeline: "Jan 2024 - Apr 2024 (12 weeks)",
      expansionHero: {
        mediaType: "image",
        mediaSrc: "/media/projects/one-stop-pet.png",
        bgImageSrc:
          "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?auto=format&fit=crop&w=1920&q=80",
        date: "Adoption Matching Marketplace",
        scrollToExpand: "Scroll to expand case study",
        textBlend: true,
      },
      challenge:
        "Design an adoption journey that helps families decide confidently while reducing repetitive communication load for shelters.",
      scope: [
        "Guided onboarding to collect adopter preferences and household context.",
        "Search, filters, and profile comparison for discoverability across available pets.",
        "Structured application flow with status visibility and next-step communication.",
        "Shelter-facing profile management and listing availability controls.",
        "Trust and safety UX around eligibility, verification, and expectation-setting.",
      ],
      contributions: [
        "Implemented profile browsing and match-oriented UI patterns to improve decision flow.",
        "Built multi-step applicant forms with progress cues and robust client-side validation.",
        "Integrated GraphQL queries/mutations with clean loading, empty, and failure states.",
        "Collaborated with stakeholders to simplify high-friction points in application and review stages.",
        "Improved component consistency across listing, profile, and dashboard views for faster iteration.",
      ],
      outcomes: [
        "Delivered a clearer adoption journey from discovery to application submission.",
        "Reduced confusion in the handoff between applicants and shelters via explicit status communication.",
        "Improved maintainability with reusable flow components and shared data-fetch patterns.",
        "Enabled faster shelter-side updates to listings and availability through structured admin views.",
      ],
      stack: [
        "React",
        "TypeScript",
        "GraphQL",
        "Apollo Client",
        "Tailwind CSS",
        "Node.js",
        "PostgreSQL",
      ],
      confidentialityNote:
        "Screens and workflows are generalized for portfolio use; user records and partner operations are confidential.",
    },
  },
];

type ProjectWithCaseStudy = Project & { caseStudy: ProjectCaseStudy };

export function hasCaseStudy(project: Project): project is ProjectWithCaseStudy {
  return Boolean(project.caseStudy);
}

export function getProjectByCaseStudySlug(slug: string): ProjectWithCaseStudy | undefined {
  return projects.find((project): project is ProjectWithCaseStudy => project.caseStudy?.slug === slug);
}
