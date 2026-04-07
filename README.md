## Gazi Asif Imtiaz (Tiaz) — Product-minded Full Stack Developer

High-polish personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind v4**, and **Framer Motion**. The site spotlights motion-rich hero messaging, tech stack, featured work, experience timeline, an animated logo marquee, and an accessible contact form with validation.

### ✨ Feature Highlights
- Split-line hero with staggered motion, CTA buttons, and quick stat cards.
- Typed content layer in `src/data` for projects, experience, technologies, and profile metadata.
- Reusable UI primitives (`Container`, `Button`, `Badge`, `SectionHeading`) and a custom theme provider with light/dark toggle.
- Accessible logo marquee with reduced-motion fallback and hover/focus pause.
- Contact form with client-side validation, honeypot spam protection, success state, and aria-live announcements.
- Metadata, Open Graph, and color theme configuration for shareable previews.

### 🧱 Tech Stack
- Next.js 15 App Router + TypeScript
- Tailwind CSS v4 (inline theming)
- Framer Motion for entrance and scroll-reveal animations
- Custom CSS tokens + Next Font (`Plus Jakarta Sans`, `Fira Code`)

### 📁 Key Structure
```
src/
  app/
    layout.tsx      # Global layout, theme provider, metadata
    page.tsx        # Home page composition
    globals.css     # Tailwind v4 theme + global utilities
  components/
    ui/             # Button, Container, Badge primitives
    hero.tsx        # Animated hero section
    featured-work.tsx, project-card.tsx, ...
    contact-form.tsx
  data/
    personal.ts     # Profile + copy
    projects.ts     # Featured work entries
    experience.ts   # Timeline data
    technologies.ts, logos.ts
```

### 🚀 Commands
| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Start local dev server (Turbopack). |
| `npm run lint`     | Run ESLint/TypeScript checks.       |
| `npm run build`    | Production build (uses Turbopack).  |
| `npm run start`    | Serve the production build.         |

### ✉️ Contact Form Setup
The contact form posts to `POST /api/contact` and sends mail through Resend.

1. Copy `.env.example` to `.env.local`.
2. Set `RESEND_API_KEY`.
3. Set `CONTACT_TO_EMAIL` to the inbox that should receive portfolio inquiries.
4. Set `CONTACT_FROM_EMAIL` to a sender address verified in Resend.

When the environment variables are missing, the form stays visible but the API returns a configuration error instead of pretending it sent the message.

### 🛠 Customising Content
- Update personal details, socials, and bio in `src/data/personal.ts`.
- Add/edit projects in `src/data/projects.ts` and drop new artwork into `public/media/projects`.
- Maintain experience entries in `src/data/experience.ts`.
- Edit technology badges via `src/data/technologies.ts` and marquee names in `src/data/logos.ts`.

Animations, spacing, and semantics are tuned for accessibility. The marquee halts for `prefers-reduced-motion`, skip links aid keyboard users, and all interactive controls have focus styles.

### 🌐 Deployment
Deploy to Vercel (recommended) or any platform that supports Node.js. The build outputs static HTML for `/` and can be served via any static hosting solution once built (`.next` directory).

> Tip: update the canonical URL in `src/app/layout.tsx` once you point the portfolio to a live domain.
