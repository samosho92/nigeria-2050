# Naija2050 — MVP Plan

**Derived from:** [Nigeria2050_PRD.md](./Nigeria2050_PRD.md) (Draft v2, Aug 17 2026)  
**Build plan:** [BUILD_PLAN.md](./BUILD_PLAN.md) — Phase 1 launch checklist + Phase 2 done / deferred  
**Status:** ✅ **MVP engineering complete** · ⚠️ **Phase 2 content shipped ahead of launch** (Icons, Cool Projects, server-side Ask) · launch blocked on external editorial review + production deploy  
**Last updated:** August 18, 2026

---

## MVP Definition (from PRD)

| Pillar | MVP deliverable | Status |
|---|---|---|
| **History** | Full interactive "Nigeria Story" timeline with era portals, scrollytelling spine, and bidirectional sector links | ✅ |
| **Future vision** | 6 sector pages with sourced 2030/2040/2050 scenarios, data viz, assumptions/risks | ✅ *(library later expanded to 13 — see Phase 2)* |
| **Fusion mechanism** | Every sector page has "How we got here"; every timeline entry links to relevant sectors | ✅ |
| **Supporting features** | Now vs. 2050 comparator, search/glossary, source library, editorial methodology | ✅ |
| **AI (MVP scope)** | Ask the Archive (RAG chat) + era illustration with guardrails | ✅ *(abstract CSS/SVG era art; commissioned AI art is **deferred**)* |

---

## Success Criteria (MVP launch)

- [x] Source library + methodology page live
- [x] Morph slider and Ask the Archive shipped
- [x] Cross-pillar link tracking (`src/lib/analytics.ts`)
- [x] Production analytics hook (optional Plausible via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)
- [ ] Performance audit on 4G throttled *(manual Lighthouse — see BUILD_PLAN Phase 1 checklist)*
- [ ] Production deploy to Vercel
- [ ] Historian + economist sign-off on `pending-review` queue items

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

- [x] Source list (now 38 sources with sector/era tags; 16 at original MVP freeze)
- [x] Editorial methodology page
- [x] Timeline: 8 eras, 26 entries (17 at MVP freeze + 9 Phase 2)
- [x] Editorial review queue (`/editorial/review`) — **9 items still `pending-review`** (Civil War, economy/security, healthcare, agriculture, transportation, real estate, era art, Icons register); external reviewer sign-off still needed

---

### Sprint 2 — Sector Vision Pages ✅

- [x] All 7 template sections per sector
- [x] Flagship 6 sectors live with sourced content
- [x] `SectorHero` (editorial layout + `StatSnapshot`), interactive `MilestoneTimeline`, `HowWeGotHere`, `DataChart`, `SourcePanel`
- [x] `AnimatedCounter` (hydration-safe)
- [x] `ScenarioRangePanel` — low/base/high ranges on all sectors
- [x] 2030–2050 UI labeled as scenarios (`SCENARIO_UI_NOTE`) — not mixed with sourced baselines

---

### Sprint 3 — Interactive History Timeline ✅

- [x] All 8 eras with content
- [x] Scrollytelling spine + era scrubber
- [x] Era portals (CSS/SVG art direction per era)
- [x] Bidirectional sector ↔ timeline links with analytics tracking
- [x] `prefers-reduced-motion` + data-saver fallbacks

---

### Sprint 4 — Signature Interactive Components ✅

- [x] Now → 2050 morph slider (10 metrics; 2050 values labeled scenario)
- [x] Animated data reveals on sector pages
- [x] Scroll fade-ins + interactive milestone timeline (clickable rail)
- [x] Data-saver mode toggle (header bolt icon)
- [ ] Formal Lighthouse ≥ 80 audit *(run manually before launch)*

---

### Sprint 5 — Source Library, Glossary, Search & Methodology ✅

- [x] Source library with sector + era filters
- [x] Glossary page (18 terms) + inline `AutoGlossary` on timeline/sector copy
- [x] Site-wide search
- [x] Methodology page with correction form + review queue link

---

### Sprint 6 — AI Features ✅

#### Ask the Archive

- [x] Retrieval scoped to curated content (timeline, sectors, glossary, icons, projects)
- [x] Server route `POST /api/ask` (rate-limited; origin check in production; no question persistence)
- [x] Client pre-check + chat UI with sources + internal links only (full chunks stay on the server)
- [x] Out-of-scope / abuse / injection / self-harm decline behavior (`src/lib/ask-guardrails.ts`)
- [x] AI-generated labeling

#### Era illustration

- [x] Abstract CSS/SVG era portals (settings only — no historical figures)
- [x] Editorial review queue entry for final art approval
- [x] Lazy-loaded, non-blocking
- [ ] Commissioned illustrated art — **deferred** (BUILD_PLAN §2.8)

---

### Sprint 7 — Polish, QA & Launch Prep ⚠️

- [x] SEO metadata + Open Graph image (`/opengraph-image`)
- [x] Sitemap + robots.txt
- [x] Skip-to-content link (accessibility)
- [x] `vercel.json` deploy config
- [x] Hydration mismatch fixes (`AnimatedCounter`, `FadeIn`, `useMounted`)
- [x] Dev cache corruption guards (`prebuild`, `preclean`, `turbopack.root`)
- [x] Optional Plausible analytics integration
- [x] Playwright smoke tests (`e2e/smoke.spec.ts`) — pages plus Ask/corrections API; **not yet in CI**
- [x] Security headers (CSP, framing denial, HSTS) + `/api` `no-store` / `noindex`
- [x] Privacy + terms pages (`src/content/legal.ts`)
- [ ] External historian review (Civil War entry + Icons register)
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

**Engineering MVP: 100% complete.** Launch is editorial + ops, not remaining product code.

---

## Phase roadmap (see BUILD_PLAN.md for detail)

| Phase | Scope | Status |
|---|---|---|
| **Phase 1** | MVP launch — 6 sectors, full timeline, fusion, Ask the Archive, comparator | ✅ Built · launch checklist open |
| **Phase 2** | Extra sectors, G7, Your 2050, quizzes, corrections, home map, Icons, Cool Projects, Ask hardening | ⚠️ **Mostly shipped** · i18n, TTS, commissioned art, R3F, CMS **deferred** |
| **Phase 3** | Commercialization, licensing, partnerships | 🔮 Future |

### Phase 2 — done vs deferred (summary)

**Done**

- 7 expansion sectors (original 5 plus transportation + real estate) → **13 total**
- 9 extra timeline entries → **26 total**
- Nigeria vs. G7 (`/compare/g7`)
- Your Nigeria 2050 (`/your-2050`, client-side grounded vignettes — no LLM API)
- Icons of Nigeria (`/icons`, 150 sourced figures)
- Cool Projects (`/projects`, 26 editorial ideas + anonymous vote/submit)
- Correction form + `/api/corrections` (origin, rate limit, URL allowlist)
- Ask the Archive moved to `/api/ask` with expanded guardrails
- Home isometric zone map (not WebGL)
- 5 sector quizzes
- Privacy / terms

**Deferred** — full list in [BUILD_PLAN.md §2.8](./BUILD_PLAN.md)

- Hausa / Yoruba / Igbo
- TTS audio walkthroughs
- Commissioned era illustration
- LLM-backed Your 2050 + per-vignette OG cards
- Era quizzes and remaining sector quizzes
- React Three Fiber 3D map
- Headless CMS, public content API, Playwright-in-CI
- User accounts (write paths exist without login)

---

## Immediate next actions

1. [x] ~~Complete MVP engineering~~
2. [x] ~~Phase 2 Sprint A content (healthcare → real estate)~~
3. [ ] Historian sign-off on Civil War entry **and** Icons register
4. [ ] Economist sign-off on Economy/Security (and remaining `pending-review` sectors)
5. [ ] `npm run stop:dev && npm run build` → merge `dev` → `main` → deploy on Vercel
6. [ ] Set `NEXT_PUBLIC_SITE_URL` + optional `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `CORRECTIONS_WEBHOOK_URL`, `PROJECTS_WEBHOOK_URL` in Vercel
7. [ ] Run Lighthouse audit on 4G throttled
8. [ ] After launch: pick from deferred backlog (i18n first if distribution needs it)
