# Naija2050 — MVP Plan

**Derived from:** [Nigeria2050_PRD.md](./Nigeria2050_PRD.md) (Draft v2, Aug 17 2026)  
**Status:** Foundation phase complete — ready for Sprint 1  
**Last updated:** August 17, 2026

---

## MVP Definition (from PRD)

The MVP is **not** a vision product with history bolted on. Both pillars launch together on day one:

| Pillar | MVP deliverable |
|---|---|
| **History** | Full interactive "Nigeria Story" timeline with era portals, scrollytelling spine, and bidirectional sector links |
| **Future vision** | 6 sector pages with sourced 2030/2040/2050 scenarios, data viz, assumptions/risks |
| **Fusion mechanism** | Every sector page has "How we got here"; every timeline entry links to relevant sectors |
| **Supporting features** | Now vs. 2050 comparator, search/glossary, source library, editorial methodology |
| **AI (MVP scope)** | Ask the Archive (RAG chat) + AI-generated era illustration (with guardrails) |

**Explicitly out of MVP:** UGC, multilingual, native app, real-time data feeds, Your Nigeria 2050 generator, AI audio narration, 3D/WebGL map (Phase 2 stretch).

---

## Success Criteria (MVP launch)

From PRD §15 — track from day one:

- [ ] Cross-pillar navigation: % sessions moving sector → timeline or timeline → sector
- [ ] Avg sectors + timeline entries viewed per session ≥ 2
- [ ] Morph slider and Ask the Archive engagement
- [ ] Source library + methodology page visits (credibility signal)
- [ ] Performance: usable on slower connections (lazy-load art, data-saver mode)

---

## Sprint Roadmap

Estimated for a **solo builder** with editorial/content dependencies called out explicitly.

### Sprint 0 — Foundation ✅ (this commit)

**Goal:** Repo, branches, scaffold, design tokens, route skeleton.

| Task | Status |
|---|---|
| Git repo with `main` + `dev` branches | ✅ |
| Next.js + TypeScript + Tailwind scaffold | ✅ |
| Design token foundation (dark-mode-first palette) | ✅ |
| Route skeleton for all MVP pages | ✅ |
| Content type definitions + empty content dirs | ✅ |
| CI workflow (lint, typecheck, build) | ✅ |
| README + MVP plan | ✅ |

**Exit criteria:** `npm run build` passes; all MVP routes render placeholders.

---

### Sprint 1 — Design System & Content Model (2 weeks)

**Goal:** Reusable components and content pipeline before writing copy.

#### Engineering

- [ ] Finalize typography pairing (editorial serif + geometric sans — license and load via `next/font`)
- [ ] Build core layout components: `Section`, `Card`, `SourceCitation`, `AssumptionsPanel`
- [ ] Implement motif/divider system (abstract Adire/Aso Oke patterns as SVG/CSS)
- [ ] Content loader utilities (`src/lib/content/`) reading JSON/MDX from `src/content/`
- [ ] Glossary inline-term component with hover/tooltip
- [ ] Search index (client-side for MVP — e.g. FlexSearch or Pagefind)

#### Content / editorial (parallel)

- [ ] Finalize source list per sector (World Bank, NBS, McKinsey, PwC, Agenda 2050 docs)
- [ ] Draft editorial methodology page
- [ ] Lock timeline era list and entry outline (8 eras, ~3–5 entries each)
- [ ] Identify subject-matter reviewers (historian, economist) — **PRD dependency**

**Exit criteria:** One sector page can be rendered entirely from structured JSON with sourcing panel.

---

### Sprint 2 — Sector Vision Pages (3 weeks)

**Goal:** All 6 sector pages at full template fidelity.

#### Per-sector page template (PRD §7.1, §8)

Each of the 6 sectors gets:

1. Headline 2050 vision
2. Current baseline data (with charts)
3. Milestone narrative: 2030 → 2040 → 2050
4. **"How we got here"** module (2–3 historical waypoints)
5. Animated data visualizations (Recharts + Framer Motion scroll reveals)
6. Sourcing panel (linked to source library)
7. "What would have to be true" assumptions + risks section

#### Sectors (build order — diaspora-friendly first)

| Priority | Sector | Rationale |
|---|---|---|
| 1 | Economy & GDP | Highest general interest; anchors comparator |
| 2 | Technology & Innovation | Strong diaspora/young-Nigerian hook |
| 3 | Governance & Institutions | Credibility anchor for non-partisan positioning |
| 4 | Talent, Education & Human Capital | Educator persona |
| 5 | Energy & Infrastructure | Tangible "daily life" relevance |
| 6 | Security & Law and Order | Sensitive — needs careful editorial pass |

#### Engineering components

- [ ] `SectorHero`, `MilestoneTimeline`, `HowWeGotHere`, `DataChart`, `SourcePanel`
- [ ] Animated number count-up on scroll
- [ ] Low/base/high scenario range display where data supports it

**Exit criteria:** All 6 sector pages live with real sourced content and historical cross-links (links may 404 until Sprint 3).

---

### Sprint 3 — Interactive History Timeline (3 weeks)

**Goal:** Co-equal history pillar — the product differentiator.

#### Timeline content (8 eras)

1. Pre-colonial (plurality: Benin, Oyo, Sokoto, Kanem-Bornu, Igbo polities)
2. Colonial period & 1914 amalgamation
3. Path to independence (1960)
4. First Republic & 1966 coups
5. Civil War (1967–70) — **extra editorial care** (PRD §12, §14)
6. Military rule (1970s–1999)
7. Return to democracy (1999–present)
8. Recent reform era → sets up 2050 case

#### Engineering components

- [ ] Scrollytelling timeline spine (vertical animated river/road motif)
- [ ] Era portals — full-bleed hero transitions with palette shift per era
- [ ] Era mini-map / scrubber for jump navigation
- [ ] Timeline entry cards (150–300 words, "smart newcomer" reading level)
- [ ] **Bidirectional links:** each entry → related sector pages; each sector → waypoints
- [ ] `prefers-reduced-motion` static fallbacks for all animations

#### Art direction per era (PRD §8.2)

| Era | Palette direction |
|---|---|
| Pre-colonial | Muted earth tones |
| Colonial / military | Desaturated grays |
| Independence → democracy | Warming palette |
| Reform → 2050 bridge | Optimism gold accents |

**Exit criteria:** Full timeline scrollable; cross-pillar links work both directions; Civil War entry reviewed by historian.

---

### Sprint 4 — Signature Interactive Components (2 weeks)

**Goal:** The shareable, premium-feel interactions that differentiate from PDFs and Wikipedia.

- [ ] **Now → 2050 morph slider** — draggable comparator (GDP, literacy, power, security, EoDB)
- [ ] Animated data reveals polish across sector pages
- [ ] Ambient micro-interactions (card hover, scroll fade-ins — restrained)
- [ ] Performance budget enforcement:
  - Lazy-load era art
  - Lighthouse perf score target ≥ 80 on 4G throttled
  - Optional data-saver mode toggle

**Exit criteria:** Comparator widget live with ≥ 5 metrics; morph slider is screenshot/share-worthy.

---

### Sprint 5 — Source Library, Glossary, Search & Methodology (1.5 weeks)

**Goal:** Credibility infrastructure for skeptical users.

- [ ] Source library page — every citation across site, filterable by sector/era
- [ ] Glossary with inline surfacing across sector + timeline copy
- [ ] Site-wide search (sectors, timeline entries, glossary terms)
- [ ] Editorial methodology page (dated, with correction/feedback mechanism)
- [ ] Feedback/correction form (email or lightweight form — no UGC publishing)

**Exit criteria:** A skeptical user can verify any quantitative claim end-to-end.

---

### Sprint 6 — AI Features (2 weeks)

**Goal:** PRD §9.1 + §9.2 within guardrails.

#### Ask the Archive (§9.1)

- [ ] RAG pipeline scoped to site's own content store (not open web)
- [ ] Chat UI with sourced answers + links to timeline/sector pages
- [ ] Decline behavior for questions outside curated content
- [ ] Clear "AI-generated" labeling

#### AI illustrative art (§9.2)

- [ ] Consistent illustrated style for era scenes and 2050 scenarios
- [ ] **Guardrail:** scenes/settings only — no AI portraits of real historical figures
- [ ] Human editorial review queue before assets enter permanent library
- [ ] Lazy-loaded, optional enhancement (not blocking page load)

**Exit criteria:** Ask the Archive answers 10 test questions correctly with citations; ≥ 1 illustrated asset per timeline era approved.

---

### Sprint 7 — Polish, QA & Launch Prep (1.5 weeks)

- [ ] Full editorial review pass (all 6 sectors + all timeline entries)
- [ ] Accessibility audit (WCAG 2.1 AA target)
- [ ] Cross-browser + mobile testing
- [ ] Analytics instrumentation (cross-pillar navigation metric is priority)
- [ ] SEO metadata, OG images, sitemap
- [ ] Deploy to production (Vercel recommended)
- [ ] Launch checklist sign-off

**Exit criteria:** MVP live at production URL; all PRD §7 features shipped.

---

## Timeline Summary

| Sprint | Duration | Cumulative |
|---|---|---|
| 0 — Foundation | — | ✅ Done |
| 1 — Design system & content model | 2 wks | Week 2 |
| 2 — Sector pages | 3 wks | Week 5 |
| 3 — History timeline | 3 wks | Week 8 |
| 4 — Signature components | 2 wks | Week 10 |
| 5 — Sources, glossary, search | 1.5 wks | Week 11.5 |
| 6 — AI features | 2 wks | Week 13.5 |
| 7 — Polish & launch | 1.5 wks | **~Week 15** |

**Total estimated MVP timeline: ~15 weeks** (solo builder, assuming editorial review doesn't block sprints).

---

## Dependencies & Risks

| Dependency | Owner | Blocks |
|---|---|---|
| Subject-matter review (historian) | Editorial | Sprint 3 Civil War entry, timeline launch |
| Subject-matter review (economist) | Editorial | Sprint 2 sector projections |
| Source data gathering | Editorial | Sprint 2 sector pages |
| AI API keys + RAG infra | Engineering | Sprint 6 |
| Illustrated art (commissioned or AI-assisted) | Design/Editorial | Sprint 3 era portals |

| Risk | Mitigation |
|---|---|
| Scope creep (6 sectors + full timeline + AI + rich art) | Hard cap per PRD §17 — Phase 2 list is explicit |
| Performance on slow connections | Lazy-load, data-saver mode, no WebGL at MVP |
| Historical bias perception | Multi-source citations, methodology page, historian review |
| Solo bandwidth | Sprint order prioritizes fusion mechanism over polish |

---

## Phase 2 Backlog (post-MVP)

Do **not** start until MVP launch metrics validate cross-pillar engagement:

- Multilingual (Hausa, Yoruba, Igbo)
- 5 additional sectors (Healthcare, Agriculture, Creative Economy, Manufacturing, Financial Inclusion)
- "Your Nigeria 2050" personalized scenario generator (§9.3)
- AI audio narration (§9.4)
- Quizzes / engagement features
- 3D/WebGL Nigeria map centerpiece
- Community submission/correction flow
- Commercialization: supporter tier, institutional licensing (§12)

---

## Immediate Next Actions

1. **Run `npm install && npm run dev`** — verify local dev works
2. **Start Sprint 1** — pick fonts and build `Section`/`Card` components
3. **Begin source list** for Economy sector (highest priority content)
4. **Reach out to historian/economist** for review commitment before Sprint 2 content is written
5. **All feature work on `dev` branch** — merge to `main` at sprint milestones
