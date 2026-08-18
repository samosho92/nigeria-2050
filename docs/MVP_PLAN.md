# Naija2050 — MVP Plan

**Derived from:** [Nigeria2050_PRD.md](./Nigeria2050_PRD.md) (Draft v2, Aug 17 2026)  
**Build plan:** [BUILD_PLAN.md](./BUILD_PLAN.md) — Phase 1 launch checklist + Phase 2 roadmap  
**Status:** ✅ **MVP engineering complete** — launch blocked on external editorial review + production deploy  
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
- [x] Cross-pillar link tracking (`src/lib/analytics.ts`)
- [x] Production analytics hook (optional Plausible via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)
- [ ] Performance audit on 4G throttled *(manual Lighthouse — see BUILD_PLAN Phase 1 checklist)*
- [ ] Production deploy to Vercel

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
- [x] `SectorHero` (editorial layout + `StatSnapshot`), interactive `MilestoneTimeline`, `HowWeGotHere`, `DataChart`, `SourcePanel`
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
- [x] Scroll fade-ins + interactive milestone timeline (clickable rail)
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
- [x] Hydration mismatch fixes (`AnimatedCounter`, `FadeIn`, `useMounted`)
- [x] Dev cache corruption guards (`prebuild`, `preclean`, `turbopack.root`)
- [x] Optional Plausible analytics integration
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

**Engineering MVP: 100% complete.**

---

## Phase roadmap (see BUILD_PLAN.md for detail)

| Phase | Scope | Status |
|---|---|---|
| **Phase 1** | MVP launch — 6 sectors, full timeline, fusion, Ask the Archive, comparator | ✅ Built · launch checklist open |
| **Phase 2** | +5 sectors, i18n (Hausa/Yoruba/Igbo), Your Nigeria 2050, audio, quizzes, 3D map | 📋 Planned |
| **Phase 3** | Commercialization, licensing, partnerships | 🔮 Future |

---

## Immediate next actions

1. [x] ~~Complete MVP engineering~~
2. [ ] Historian sign-off on Civil War entry
3. [ ] Economist sign-off on Economy/Security projections
4. [ ] `npm run stop:dev && npm run build` → merge `dev` → `main` → deploy on Vercel
5. [ ] Set `NEXT_PUBLIC_SITE_URL` + optional `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in Vercel
6. [ ] Run Lighthouse audit on 4G throttled
7. [ ] Begin Phase 2 Sprint A scoping (healthcare + agriculture sectors first)
