# Naija2050

**Where Nigeria's History Meets Its Future**

An independent, design-forward public web app exploring Nigeria's history and credible long-range future across six key sectors.

## Product docs

- [Product Requirements Document](./Nigeria2050_PRD.md)
- [MVP Plan](./MVP_PLAN.md)

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Charts | Recharts |
| Content | JSON/MDX in `src/content/` |
| Hosting target | Static-generation-friendly (Vercel) |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
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
