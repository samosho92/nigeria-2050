# Naija2050 — MVP Plan

**Derived from:** [Nigeria2050_PRD.md](./Nigeria2050_PRD.md) (Draft v2, Aug 17 2026)  
**Status:** MVP engineering complete on `dev` — ready for deploy + external editorial sign-off  
**Last updated:** August 17, 2026

---

## MVP Definition (from PRD)

| Pillar | MVP deliverable | Status |
|---|---|---|
| **History** | Full interactive "Nigeria Story" timeline with era portals, scrollytelling spine, and bidirectional sector links | ✅ |
| **Future vision** | 6 sector pages with sourced 2030/2040/2050 scenarios, data viz, assumptions/risks | ✅ |
| **Fusion mechanism** | Every sector page has "How we got here"; every timeline entry links to relevant sectors | ✅ |
| **Supporting features** | Now vs. 2050 comparator, search/glossary, source library, editorial methodology | ✅ |
| **AI (MVP scope)** | Ask the Archive (RAG chat) + era illustration with guardrails | ✅ *(abstract CSS era art; commissioned AI art is Phase 2)* |

---

## Success Criteria (MVP launch)

- [x] Source library + methodology page live
- [x] Morph slider and Ask the Archive shipped
- [x] Cross-pillar link tracking (client analytics in `src/lib/analytics.ts`)
- [ ] Live analytics dashboard *(events stored locally until production analytics wired)*
- [ ] Performance audit on 4G throttled *(manual Lighthouse run recommended pre-launch)*

---

## Sprint Roadmap

### Sprint 0 — Foundation ✅

| Task | Status |
|---|---|
| Git repo with `main` + `dev` branches | ✅ |
| Next.js + TypeScript + Tailwind scaffold | ✅ |
| Design token foundation (light default, Nigerian green accent) | ✅ |
| Route skeleton for all MVP pages | ✅ |
| Content type definitions + content dirs | ✅ |
| CI workflow (lint, typecheck, build) | ✅ |
| README + MVP plan | ✅ |

---

### Sprint 1 — Design System & Content Model ✅

#### Engineering

- [x] Typography pairing (Lora + DM Sans via `next/font`)
- [x] Core components: `Section`, `Card`, `SourceCitation`, `AssumptionsPanel`, `MotifDivider`
- [x] Content loaders (`src/lib/content/`)
- [x] Glossary inline component (`GlossaryTerm`, `AutoGlossary`)
- [x] FlexSearch site-wide search (⌘K)

#### Content / editorial

- [x] Source list (16 sources with sector/era tags)
- [x] Editorial methodology page
- [x] Timeline: 8 eras, 17 entries
- [x] Editorial review queue (`/editorial/review`) — external reviewer sign-off still needed

---

### Sprint 2 — Sector Vision Pages ✅

- [x] All 7 template sections per sector
- [x] All 6 sectors live with sourced content
- [x] `SectorHero`, `MilestoneTimeline`, `HowWeGotHere`, `DataChart`, `SourcePanel`
- [x] `AnimatedCounter` (hydration-safe)
- [x] `ScenarioRangePanel` — low/base/high ranges on all sectors

---

### Sprint 3 — Interactive History Timeline ✅

- [x] All 8 eras with content
- [x] Scrollytelling spine + era scrubber
- [x] Era portals (CSS art direction per era)
- [x] Bidirectional sector ↔ timeline links with analytics tracking
- [x] `prefers-reduced-motion` + data-saver fallbacks

---

### Sprint 4 — Signature Interactive Components ✅

- [x] Now → 2050 morph slider (8 metrics)
- [x] Animated data reveals on sector pages
- [x] Scroll fade-ins + card hover micro-interactions
- [x] Data-saver mode toggle (header bolt icon)
- [ ] Formal Lighthouse ≥ 80 audit *(run manually before launch)*

---

### Sprint 5 — Source Library, Glossary, Search & Methodology ✅

- [x] Source library with sector + era filters
- [x] Glossary page (12 terms) + inline `AutoGlossary` on timeline/sector copy
- [x] Site-wide search
- [x] Methodology page with correction email + review queue link

---

### Sprint 6 — AI Features ✅

#### Ask the Archive

- [x] Client-side RAG scoped to curated content
- [x] Chat UI with sources + links
- [x] Out-of-scope decline behavior
- [x] AI-generated labeling

#### Era illustration

- [x] Abstract CSS era portals (settings only — no historical figures)
- [x] Editorial review queue entry for final art approval
- [x] Lazy-loaded, non-blocking

---

### Sprint 7 — Polish, QA & Launch Prep ⚠️

- [x] SEO metadata + Open Graph image (`/opengraph-image`)
- [x] Sitemap + robots.txt
- [x] Skip-to-content link (accessibility)
- [x] `vercel.json` deploy config
- [x] Hydration mismatch fix (`AnimatedCounter`)
- [ ] External historian review (Civil War entry)
- [ ] External economist review (sector projections)
- [ ] Cross-browser QA pass
- [ ] Production deploy to Vercel
- [ ] Launch sign-off

---

## Timeline Summary

| Sprint | Status |
|---|---|
| 0 — Foundation | ✅ |
| 1 — Design system & content | ✅ |
| 2 — Sector pages | ✅ |
| 3 — History timeline | ✅ |
| 4 — Signature components | ✅ |
| 5 — Sources, glossary, search | ✅ |
| 6 — AI features | ✅ |
| 7 — Polish & launch | ⚠️ Deploy + external review pending |

**Engineering MVP: 100% complete.** Launch blocked only on external editorial review and production deploy.

---

## Immediate Next Actions

1. [x] ~~Complete MVP engineering~~
2. [ ] Historian sign-off on Civil War entry
3. [ ] Economist sign-off on Economy/Security projections
4. [ ] `git push origin dev` → merge to `main` → deploy on Vercel
5. [ ] Run Lighthouse audit on 4G throttled
6. [ ] Wire production analytics (Plausible, Vercel Analytics, or similar)
