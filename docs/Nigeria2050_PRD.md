# Product Requirements Document
## Working Title: **Naija2050** — "Where Nigeria's History Meets Its Future"

**Author:** Samuel Osho
**Status:** Draft v2
**Last updated:** August 17, 2026

---

## 1. Executive Summary

Naija2050 is a public web app built on two co-equal MVP pillars — not a vision product with history bolted on, but a single product where neither pillar ships without the other:

1. **Reimagines Nigeria's key sectors by 2050** — economy, governance, security, education, energy, and technology — through credible, data-grounded, optimistic scenario projections.
2. **Makes Nigeria's history legible to people who don't know it** — pre-colonial kingdoms, colonial rule, independence, the civil war, military rule, the return to democracy, and the reform era — as a fully interactive, richly designed experience, not a reference appendix.

The core bet: optimism about Nigeria's future is more persuasive, not less, when it's built on an honest and complete account of the past. Both pillars launch together on day one.

---

## 2. Problem Statement

- **For outsiders and diaspora-adjacent audiences:** Nigeria is largely known through a narrow lens (corruption headlines, Nollywood, Afrobeats, scam stereotypes, or aid-recipient framing). There's no single credible, well-designed public resource that shows both where the country has been and where a serious, non-partisan case says it's headed.
- **For Nigerians themselves, especially younger ones:** History is inconsistently taught, politically contested, and rarely presented with production quality that makes people want to engage with it. Meanwhile, positive long-range thinking about the country's trajectory is crowded out by (legitimate) day-to-day frustration with governance and services.
- **For policy-interested and investor audiences:** Long-range sector projections about Nigeria exist (McKinsey, PwC, World Bank, NBS, Nigeria's own Agenda 2050 / National Development Plan) but are scattered across PDFs, paywalled reports, and dense documents not built for public consumption.

Naija2050 sits at the intersection of civic education, nation-branding, and public data storytelling — a space no single Nigerian or diaspora product currently occupies well.

---

## 3. Vision & Product Principles

**Vision statement:** By 2050, when someone anywhere in the world wants to understand Nigeria's story and trajectory, Naija2050 is the first credible, visually compelling place they go.

**Product principles:**

1. **Optimistic, not naive.** Every 2050 projection is a *scenario built on stated assumptions and cited sources*, not a guarantee.
2. **History is not decoration — it's a launch pillar.** The historical layer ships at MVP with the same design and content investment as the sector visions, and every sector links back to the historical throughline that explains why its future is plausible.
3. **Non-partisan by design.** No current-administration branding, no party affiliation. This is what protects the site's credibility over a 25+ year horizon spanning multiple governments.
4. **Show the data, don't just assert the vision.** Every big claim is sourced and shown with underlying numbers and a range of estimates, not a confident headline alone.
5. **Built for the skeptic, not just the believer.**

---

## 4. Target Users & Personas

| Persona | Description | Primary need |
|---|---|---|
| **Diaspora Nigerian, 2nd-gen or disconnected** | Grew up abroad, weak grasp of Nigerian history, curious but under-informed | A credible, engaging on-ramp to "what actually happened" and "where it's going" |
| **Curious outsider** | Non-Nigerian — journalist, student, investor-adjacent, or simply curious | Fast, trustworthy orientation without academic texts or biased sources |
| **Young Nigerian (18–30, at home)** | In-country, frustrated by present conditions, history taught unevenly in school | Grounded optimism and pride that doesn't feel like government messaging |
| **Policy / investment-adjacent professional** | Analysts, NGO staff, diaspora investors, development students | Digestible, sourced sector data and projections they can cite |
| **Educator** | Teachers, especially diaspora schools or NGOs | Ready-made, well-designed material to teach Nigerian history and civics |

---

## 5. Scope: The Sectors (MVP)

Six flagship sectors at launch, each following the template in Section 8:

1. **Economy & GDP** — growth trajectory, diversification beyond oil, informal-to-formal shift, manufacturing and non-oil exports
2. **Security & Law and Order** — crime/insecurity trends, justice reform, policing, the trajectory to a 2050 baseline
3. **Governance & Institutions** — electoral integrity, anti-corruption infrastructure, decentralization, civic-tech
4. **Talent, Education & Human Capital** — literacy, tertiary education, brain-drain-to-brain-gain reversal
5. **Technology & Innovation** — the Lagos/Abuja tech ecosystem, fintech, digital infrastructure
6. **Energy & Infrastructure** — power grid reliability, renewable transition, transport and urban infrastructure

**Phase 2 sectors:** Healthcare, Agriculture & Food Security, Creative Economy (Nollywood/Afrobeats/gaming), Manufacturing & Industrialization, Financial Inclusion.

---

## 6. Scope: The Historical Layer (MVP, Co-Equal Pillar)

**Core component: "The Nigeria Story" — a fully interactive, richly art-directed timeline**, in scope for launch, covering:

- Pre-colonial era (Benin, Oyo, Sokoto Caliphate, Kanem-Bornu, Igbo polities — presented as a plurality, not a single flattened narrative)
- Colonial period and the 1914 amalgamation
- The path to independence (1960)
- First Republic and the 1966 coups
- The Civil War (1967–1970) — handled with particular editorial care (Section 12)
- Military rule era (1970s–1999)
- Return to democracy (1999–present)
- Recent reform era — the specific policy and institutional shifts that set up the 2050 case

**Cross-linking requirement (the fusion mechanism):** every sector page includes a "How we got here" module pulling 2–3 relevant historical waypoints, and every timeline entry includes a "why this matters for 2050" link back to a sector page. This bidirectional link is the literal product mechanism that fuses the two pillars — it ships at MVP, not later.

**Format:** scrollytelling timeline with era-specific art direction (Section 8), short explainer entries (150–300 words) at a "smart, curious newcomer" reading level, with links to deeper sources.

---

## 7. Core Features (MVP)

### 7.1 Sector Vision Pages (×6)
- Headline 2050 vision, current baseline data, a milestone-based 2030/2040/2050 scenario narrative, a "How we got here" historical module, data visualizations, a sourcing panel, and a "what would have to be true" assumptions/risks section.

### 7.2 Interactive History Timeline (co-equal launch feature — see Section 6)

### 7.3 "Nigeria Now vs. Nigeria 2050" Comparator
Side-by-side current-baseline vs. modeled-2050 widget across GDP per capita, literacy, power generation capacity, security indices, ease-of-doing-business rank, etc.

### 7.4 Search & Glossary
Plain-language glossary for terms a newcomer won't know, surfaced inline wherever they appear.

### 7.5 Source Library
Single page listing every cited source, for independent credibility-checking.

### Explicitly out of scope for MVP
User-generated content, multilingual support beyond English, native mobile app, real-time data feeds. (Gamification/quizzes are now partially in scope — see Section 9.)

---

## 8. UI/UX & Visual, Art, and Motion Direction

This product lives or dies on whether it *feels* like a modern, premium civic-media experience rather than a static reference site — the art direction is a core requirement, not polish applied at the end.

### 8.1 Visual identity
- **Palette:** rooted in Nigerian visual language without leaning on flag-cliché green-white-green — draw from Adire indigo, terracotta/Nsibidi-inspired earth tones, Ankara pattern-derived accent palettes, and a deep "night sky over Lagos" dark mode as the primary theme (dark-mode-first reads as more premium/editorial for a data-heavy product, with a light mode alternative).
- **Typography:** a confident, editorial serif for headlines (evokes gravity for historical content) paired with a clean geometric sans for data/UI — avoid anything that reads as a government-portal or template-default font pairing.
- **Iconography/motif system:** a custom icon set referencing Nigerian textile and architectural patterns (Adire, Aso Oke weave lines, Benin bronze relief motifs) used abstractly as a recurring visual signature across section dividers, loading states, and data-viz accents — not literal cultural imagery reused decoratively, which risks feeling extractive.

### 8.2 Signature components

| Component | Description |
|---|---|
| **Era Portals (timeline hero transitions)** | Each historical era has a full-bleed animated hero — parallax-scrolling illustrated backdrops (not stock photos) that shift palette and motif per era: muted earth tones for pre-colonial, desaturated grays for colonial/military eras, warming palette as the timeline approaches 2050 — the color temperature itself tells the optimism arc |
| **Scrollytelling timeline spine** | A vertical animated "spine" (think a stylized river or road motif) that the user scrolls along; era markers pulse/expand on scroll-into-view; supports scrubbing via a mini-map for users who want to jump ahead |
| **Animated data reveals** | Sector GDP/security/literacy charts animate their draw-in on scroll (counted-up numbers, growing bar/line charts) rather than rendering static — using a charting layer with motion (e.g., Framer Motion + Recharts/D3 combination) |
| **"Now → 2050" morph slider** | A draggable comparator where dragging a slider morphs a stat, an illustrated cityscape, or an icon set from "today" to "2050" state in real time — the single most shareable/screenshot-able component on the site |
| **Ambient micro-interactions** | Subtle hover/parallax on cards, cursor-reactive background motifs on desktop, tasteful (not gratuitous) scroll-triggered fade/slide-ins — restrained enough to stay fast and accessible, not a Dribbble-shot demo that tanks performance |
| **3D/WebGL flagship moment (stretch for MVP, strong Phase 2 candidate)** | A single hero 3D piece — e.g., an interactive map of Nigeria's 36 states + FCT that lights up/populates with data as the user explores sectors, built in Three.js/React Three Fiber — used sparingly as a centerpiece, not throughout |
| **Illustrated character/era art** | Original illustrated art (not photography of real identifiable people, and not AI-generated depictions of real historical figures — see Section 9's guardrails) representing eras and everyday life, commissioned or AI-assisted per the guardrails below |

### 8.3 Motion & performance principles
- Motion should always *support comprehension* (revealing data, showing a before/after state) — never motion for its own sake.
- Respect `prefers-reduced-motion`; every animated component needs a static-equivalent fallback.
- Given the target audience includes users on slower connections in Nigeria itself, performance budgets matter as much as visual richness: lazy-load era art, ship WebGL as an optional enhancement not a requirement, and keep a lightweight "data-saver" mode.

---

## 9. AI-Generated Interactive Media

A dedicated content layer using generative AI to let users explore Nigerian history and the 2050 vision beyond the fixed editorial pages — with explicit guardrails given the sensitivity of the subject matter.

### 9.1 "Ask the Archive" — conversational history guide
An AI chat interface, scoped and grounded to the site's own sourced content (retrieval-augmented against the timeline/source library, not open-ended), that lets a user ask things like "what caused the Civil War" or "how did Nigeria's economy change in the 1980s" and get a sourced, conversational answer with links back to the relevant timeline entry. This is a *guide into the curated content*, not a general-purpose chatbot — it should decline to speculate beyond what the site's sourced content supports.

### 9.2 AI-generated illustrative art for eras and scenarios
- Original illustrated scenes (marketplaces, cityscapes, everyday life) generated per historical era and per 2050 sector scenario, in a consistent illustrated style consistent with Section 8.2, used to make eras/scenarios visually tangible without relying on stock imagery or copyrighted material.
- **Guardrail:** AI-generated imagery is used for *scenes and settings*, never to depict real, identifiable historical or political figures (avoids both misinformation risk and the "deepfake historical figure" problem). Figures are referenced by name in text/citation, not rendered as generated portraits.

### 9.3 "Your Nigeria 2050" personalized scenario generator
A guided, prompt-driven tool where a user picks their sector(s) of interest and gets a short, AI-generated narrative "day in the life in 2050 Nigeria" vignette — generated strictly from the site's own sourced sector projections (not freely hallucinated), functioning as a personalized, shareable synthesis of already-vetted content rather than new unverified claims.

### 9.4 AI-narrated audio walkthroughs
Text-to-speech narration of timeline eras and sector pages, enabling an audio-first "listen to Nigeria's story" mode — useful for accessibility and for a commute/passive-listening use case, and a natural extension into a podcast-style distribution channel (see Section 11, Commercialization).

### 9.5 Editorial guardrails for all AI-generated media
- All AI-generated content is clearly labeled as AI-generated in the UI.
- Historical-fact content generated or surfaced by AI is grounded only in the site's own curated/sourced content — no open-web hallucination on contested history.
- A human editorial review pass applies to AI-generated media before it's added to the permanent content library (the chat guide and personalization tool can generate live, but anything promoted into the illustrated-art library or the era portals goes through review first).
- MVP scope: 9.1 (Ask the Archive) and 9.2 (illustrative art) are realistic for MVP given they reuse already-sourced content. 9.3 and 9.4 are strong Phase 2 candidates once the core content library is stable enough to generate reliably from.

---

## 10. Non-Goals

- Not a government relations, tourism-board, or investment-promotion product, even if useful to those audiences as a side effect.
- Not a current-events or news product — no live headlines, no reaction to this week's politics.
- Not an argument that Nigeria's present problems don't exist — credibility depends on acknowledging them honestly en route to the optimistic case.

---

## 11. Competition & Market Positioning

### 11.1 Direct/adjacent competitors
| Category | Examples | Gap Naija2050 fills |
|---|---|---|
| **Country-branding/vision sites** | Rwanda's "Vision 2050" government site, UAE's "Centennial 2071" | These are official-government products by design — Naija2050's non-partisan positioning and independent editorial voice is the differentiator, at some cost to official endorsement/reach |
| **General reference** | Wikipedia, Britannica | Comprehensive but not narrative, not designed for an emotional/visual "vision" experience, no future-scenario layer at all |
| **Data storytelling sites** | Our World in Data, Visual Capitalist | Excellent data-viz craft but no Nigeria-specific narrative depth, no historical timeline integration |
| **Nigerian government planning documents** | National Development Plan / Agenda 2050 documents (NBS, National Planning Commission) | Source material, not a public-facing product — dense PDFs, not built for a general or diaspora audience |
| **Education platforms** | Diaspora-focused history/culture apps, individual YouTube/TikTok history creators | Often high-quality but fragmented, inconsistent sourcing, no unified sector-vision component |

### 11.2 Positioning statement
*Naija2050 is the independent, design-forward, source-transparent home for Nigeria's story and its credible long-range future — occupying the space between dry government planning documents and fragmented social content, with neither's weaknesses.*

### 11.3 Competitive moats
- The **bidirectional history↔vision linking mechanism** (Section 6) is not something existing reference or government sites do — it's a genuine product differentiator, not just a content differentiator.
- **Design quality** as a moat: most credible Nigeria-data content lives in unglamorous formats (PDFs, government portals, Wikipedia). A best-in-class visual/motion experience is a real barrier to casual replication.
- **Non-partisan, source-transparent editorial trust**, compounding over time — hard for either a government product (structurally partisan-adjacent) or a social creator (structurally less rigorous) to match.

---

## 12. Commercialization

Multiple non-mutually-exclusive paths, sequenced by how much they compromise the non-partisan/credibility positioning (least risk first):

| Model | Description | Risk to credibility |
|---|---|---|
| **Grants / philanthropic & institutional funding** | Foundations, diaspora-investment-focused funds, education-mission funders (e.g., organizations funding African civic education or diaspora engagement) | Low — aligns with mission, no editorial conflict if funders have no content control |
| **B2B/B2institution licensing** | License the platform or content library (white-labeled or co-branded) to schools, diaspora orgs, universities, or NGOs for curriculum use | Low — content stays independent; licensing is for access/embedding, not editorial input |
| **API / data licensing** | License the structured sector-data and sourcing layer to researchers, journalists, or other civic-tech products via an API | Low — monetizes the underlying data infrastructure, not the narrative voice |
| **Premium/supporter tier** | A "friends of Naija2050" membership for individuals (early access to new sectors, ad-free, downloadable reports/data packs) — consumer-donation model similar to public-media membership | Low–Medium — needs to be framed as public-media-style support, not paywalling core civic content |
| **Sponsorships (tightly scoped)** | Brand or institutional sponsorship of specific non-editorial elements (e.g., "the Diaspora Investment data page, presented in partnership with X") with a strict firewall from editorial content | Medium — requires a clear, publicly stated editorial-independence policy to avoid perception risk |
| **Merchandise / cultural products** | Prints of the era-portal illustrated art, a "Nigeria 2050" print/coffee-table book compiling the sector visions | Low — low-risk, brand-building, doesn't touch editorial trust |
| **White-label the model to other countries** | The "History + Vision" product pattern is not Nigeria-specific — once proven, the platform/format itself could be licensed or adapted for other countries' diasporas (long-horizon opportunity) | Low — a platform-business model rather than a content-trust risk |

**Recommended sequencing:** launch on grant/philanthropic funding and a lightweight supporter-membership tier to prove engagement without any sponsor-conflict risk; introduce institutional licensing once the content library and traffic are proven; treat sponsorships and the white-label platform play as Phase 2+ once editorial-independence policy and brand trust are firmly established.

---

## 13. Content Standards & Editorial Policy

- **Sourcing bar:** every quantitative claim cites a named, checkable source. No unsourced assertions in vision copy.
- **Balance on contested history:** Civil War, coups, and unrest are presented with acknowledgment of gravity and contested interpretations, reviewable by a historian without embarrassment.
- **No partisan branding:** no current officeholder's name, party, or campaign imagery anywhere on the site.
- **Explicit uncertainty:** 2050 sector pages show low/base/high scenario ranges where the underlying projections support it.
- **Editorial review step:** each sector page, each historical era entry, and any AI-generated media promoted into the permanent library gets a subject-matter review pass before publication — flagged as a real project dependency, not solvable in engineering alone.

---

## 14. Sensitive Content Handling

- **The Civil War (Biafra, 1967–70):** factual context, causes, and human cost without adopting a purely federal-government or purely secessionist framing; multiple credible sources rather than one narrative voice.
- **Military rule era and specific coups/regimes:** name what happened without glorifying or flattening any individual figure's record.
- **Ethnic and regional plurality:** the "pre-colonial Nigeria" framing avoids implying a single unified pre-colonial nation, while staying accessible to a newcomer.
- **AI-generated content specifically:** no AI-generated portraits of real historical/political figures (Section 9.2); AI chat/narrative tools grounded only in the site's sourced content, not open-web generation, on contested history (Section 9.5).

Recommendation: a visible, dated **editorial methodology page** plus a feedback/correction mechanism from launch.

---

## 15. Success Metrics

**MVP-stage (first 2 quarters post-launch):**
- Unique visitors and return-visit rate
- Average sectors/timeline-entries viewed per session (validates the fused history↔vision design)
- % of sessions crossing from a sector page into a linked history entry or vice versa (the core cross-pillar metric)
- Time on history timeline specifically
- Engagement with the "Now → 2050" morph slider and "Ask the Archive" (proxy for whether the rich/interactive components are landing, not just being visited)
- Source-library and methodology page visits (skeptical-user credibility-checking behavior)
- Organic share rate / referral traffic

**Longer-term (6–18 months):**
- Return usage from educators; citations/backlinks from press, education, or policy-adjacent sites
- Supporter-tier conversion (if launched) as a proxy for depth of engagement/trust
- API/licensing inquiries as a proxy for commercialization viability

---

## 16. Rough Technical Approach

- **Frontend:** responsive web app (React/TypeScript/Tailwind), Framer Motion for micro-interactions and scroll-triggered animation, Recharts/D3 for animated data-viz, React Three Fiber for the optional 3D map centerpiece.
- **Content model:** structured content (sector pages, timeline entries, sources, AI-generated media metadata) suited to a headless CMS or MDX-based content repo, given the frequency of copy/sourcing iteration pre- and post-launch.
- **AI layer:** retrieval-augmented chat scoped to the site's own content store for "Ask the Archive" (Section 9.1); a separate, tightly-prompted generation pipeline for illustrative art (9.2) with a human-review queue before assets enter the permanent library.
- **Data refresh:** sector data on a defined quarterly manual refresh cadence for MVP.
- **Hosting:** static-generation-friendly for the content layer, with the AI chat/personalization features served via API — keeps hosting costs low while supporting the richer interactive layer.

---

## 17. Risks

| Risk | Mitigation |
|---|---|
| Read as government propaganda or as glossing over real problems | Non-partisan policy, visible sourcing, "what would have to be true" sections, editorial methodology page |
| Historical content perceived as biased on contested topics | Multi-source citation requirement, subject-matter review pass, visible correction mechanism |
| Credibility risk if 2050 numbers seen as made up | Every projection sourced or labeled as an original scenario with stated assumptions and ranges |
| Rich art/motion direction hurts performance, especially for in-Nigeria users on slower connections | Lazy-loading, optional WebGL, data-saver mode, hard performance budgets (Section 8.3) |
| AI-generated media introduces factual or representational risk (e.g., misrepresenting historical figures) | Guardrails in Section 9.5: no AI portraits of real figures, grounding to sourced content only, human review before permanent library inclusion |
| Sponsorship/commercialization paths erode perceived independence | Sequencing in Section 12 — low-risk funding first, strict editorial firewall before any sponsorship |
| Scope creep — sectors, eras, AI features, and rich art direction all competing for one-person build bandwidth | Hard MVP cap at 6 sectors + full timeline + two AI features (9.1, 9.2) + core UI component set; everything else explicitly phased |

---

## 18. Open Questions

1. Final name/brand — "Naija2050" is a placeholder; worth testing how a few options read to both Nigerian and non-Nigerian audiences.
2. Resourcing plan for subject-matter review (historian, economist) before launch — self-sourced network, paid consultation, or academic partnership?
3. Primary distribution channel at launch — diaspora social/community channels, education partnerships, or press/PR push? Affects which sector pages and which AI feature to polish first.
4. How much of the 3D/WebGL centerpiece (Section 8.2) is realistic for MVP given one-person build bandwidth — worth prototyping early to test feasibility before committing it to the MVP list.
5. Funding path for the initial subject-matter review and any commissioned illustration work, given Section 12's recommendation to lead with grant/philanthropic funding.

---

## 19. Suggested Roadmap

- **Phase 0 (now):** Finalize sector list, source list per sector, full timeline era list, and the core component design system (Section 8).
- **Phase 1 (MVP):** 6 sector pages + full interactive history timeline with bidirectional cross-linking + comparator widget + source library + core signature UI components (era portals, scrollytelling spine, animated data reveals, morph slider) + "Ask the Archive" and AI-generated era illustration, English only, no community features.
- **Phase 2:** Multilingual (Hausa, Yoruba, Igbo), remaining 5 sectors, personalized "Your Nigeria 2050" generator, AI audio narration, quizzes/engagement features, lightweight community submission/correction flow, 3D/WebGL centerpiece if not shipped at MVP.
- **Phase 3:** Commercialization expansion (licensing, sponsorships per Section 12's sequencing), partnerships (diaspora orgs, schools), potential native app, white-label platform exploration.
