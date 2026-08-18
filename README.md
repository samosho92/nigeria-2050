# Naija2050

**Where Nigeria's History Meets Its Future**

An independent, design-forward public web app exploring Nigeria's history and credible long-range future across **13 sectors** (6 MVP + 7 expansion).

**Build status (Aug 18, 2026):** MVP and most Phase 2 content are in the repo. Production launch is still blocked on editorial review and Vercel deploy. Localization, TTS audio, commissioned art, and WebGL are deferred — see [Build Plan](./docs/BUILD_PLAN.md).

## Product docs

- [Product Requirements Document](./docs/Nigeria2050_PRD.md)
- [MVP Plan](./docs/MVP_PLAN.md)
- [Build Plan — Phase 1 & Phase 2](./docs/BUILD_PLAN.md)

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + semantic design tokens |
| Icons | Tabler Icons (`@tabler/icons-react`) |
| Theming | `next-themes` (light / dark via CSS variables) |
| Animation | Framer Motion |
| Charts | Recharts |
| Content | JSON/MDX in `src/content/` |
| Hosting target | Static-generation-friendly (Vercel) |

## Design system

All colors, fonts, and radii live in `src/app/globals.css` as CSS custom properties — components use semantic tokens only (`bg-background`, `text-foreground`, `bg-primary`, `text-accent`, etc.). Never hardcode hex values or font families in components.

- **Light mode** (default): Clean white background with Nigerian green (`#008751`) accents on CTAs, links, and highlights
- **Dark mode**: Optional via header toggle — deep green backgrounds

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3500](http://localhost:3500).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack, port 3500) |
| `npm run dev:clean` | Stop dev, wipe `.next`, restart — safe reset |
| `npm run dev:webpack` | Dev server without Turbopack |
| `npm run stop:dev` | Stop any process on port 3500 |
| `npm run build` | Production build (fails if dev server is running) |
| `npm run start` | Start production server |
| `npm run clean` | Stop dev and delete `.next` |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks |

## Project structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI components (layout, timeline, sectors, etc.)
├── content/          # Structured content (sectors, timeline, sources)
├── lib/              # Utilities and constants
└── types/            # Shared TypeScript types
docs/                 # PRD, MVP plan, editorial docs
```

## Git workflow

| Branch | Purpose |
|---|---|
| `main` | Production-ready releases |
| `dev` | Active development integration |

Feature work branches off `dev` and merges back via PR.

## Principles

1. **Optimistic, not naive** — scenarios with stated assumptions and cited sources
2. **History is co-equal** — timeline ships at MVP with the same investment as sectors
3. **Non-partisan** — no current-administration branding
4. **Show the data** — every big claim is sourced
5. **Built for the skeptic**
