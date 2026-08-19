export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDocument {
  slug: "privacy" | "terms";
  title: string;
  eyebrow: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const LEGAL_CONTACT_EMAIL = "corrections@naija2050.org";

export const PRIVACY_POLICY: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  eyebrow: "Legal",
  description:
    "How Naija2050 handles data when you browse the site, use interactive tools, or contact us.",
  lastUpdated: "August 19, 2026",
  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        "Naija2050 is independent civic media. We do not sell personal data, run targeted advertising, or require an account to read the site.",
        "This policy describes what limited information we may collect, why we collect it, and the choices available to you.",
      ],
    },
    {
      id: "what-we-collect",
      title: "Information we collect",
      paragraphs: [
        "Most use of Naija2050 does not involve submitting personal information. Depending on how you interact with the site, we may process:",
      ],
      bullets: [
        "Anonymous usage events (page views, cross-pillar navigation, comparator interactions, Street Pulse spin and answer events that name only the poll id) when analytics is enabled in production.",
        "Browser-local preferences you set on your device, such as theme, data-saver mode, a Street Pulse profile (age band, gender, zone), and a short rolling log of anonymous analytics events stored in localStorage.",
        "Questions you type into Ask the Archive. They are sent to our server for retrieval against curated site content, rate-limited, and not stored as chat transcripts. Blocked or abusive prompts are declined and are not persisted.",
        "Street Pulse ballots: a random browser UUID, the poll and option you pick, plus the age band, gender, and geopolitical zone you chose. Country is read from the request at the edge and is not stored on the ballot. We do not ask for a name, email, or GPS coordinates. Salary and spend answers are stored as bands.",
        "Information you choose to send by email or through the corrections and project-idea forms (for example a page URL, a claim, an optional email address, or a civic proposal). Do not include passwords, bank details, or other sensitive personal data.",
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      paragraphs: [
        "We ask for your consent before enabling optional analytics. If you accept, we may send privacy-oriented usage data to Plausible and Google Analytics 4 (GA4) when those services are configured in production.",
        "If you decline, optional analytics stays off. Core site functions still work.",
        "When analytics is enabled, we record lightweight, anonymous interaction events (page views, cross-pillar navigation, comparator use, Ask the Archive queries, Street Pulse spin and answer events that name only the poll id, search selections, and preference toggles). These events do not include your name, email, or precise location.",
        "You can change your choice anytime through Cookie settings in the footer. Clearing site data in your browser removes locally stored preferences, Street Pulse profile, consent choice, and analytics summaries.",
      ],
    },
    {
      id: "street-pulse",
      title: "Street Pulse",
      paragraphs: [
        "Street Pulse is an anonymous poll for people 18 or older answering from Nigeria. We check country from the network address used to reach the site. We do not store that country on the ballot. We store one answer per poll per browser UUID, with the age band, gender, and zone you select. Results for a poll are shown to you only after you answer it.",
        "In production, ballots are stored in a managed data store. In local development, ballots use a local file for testing. Each row records the question, the band you picked, age, gender, zone, and a timestamp. We may forward a copy of a new ballot to an optional research webhook (Make, a Google Sheet, or similar). That copy uses a short hash instead of the browser UUID. Operators may export the same rows with a secret token.",
        "If enough people answer, Naija2050 may license aggregate tables and crosstabs (for example pay band by zone) to organizations studying Nigerian consumer behavior. We do not sell a row that identifies a person. Crosstabs on the public page require at least five answers in that cell.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and local storage",
      paragraphs: [
        "Naija2050 uses browser local storage for functional preferences such as theme, data-saver, Street Pulse profile, and your analytics consent choice.",
        "Optional analytics only runs after consent. You can accept, decline, or reopen cookie settings from the site footer.",
        "If Plausible analytics is enabled, Plausible may set a first-party cookie or use local storage consistent with its documentation.",
        "If GA4 is enabled, Google may set first-party cookies consistent with Google's documentation. We configure GA4 with anonymized IP and without ad personalization.",
      ],
    },
    {
      id: "third-parties",
      title: "Third-party services",
      paragraphs: [
        "The site links to external sources cited in our Source Library. Those sites have their own privacy practices.",
        "Hosting and delivery may be provided by infrastructure vendors (for example, Vercel). They process technical request data needed to serve the site securely.",
        "Ask the Archive runs a scoped retrieval pass on our servers against content shipped with the site. Questions stay on our servers; we do not send them to third-party AI providers. We rate-limit requests and do not persist question text.",
      ],
    },
    {
      id: "retention",
      title: "Retention",
      paragraphs: [
        "Local browser data persists until you clear it. Street Pulse ballots are retained on the server until the host file is rotated or deleted. Email correspondence is retained only as long as needed to investigate corrections, respond to you, and maintain an editorial record of updates.",
        "Aggregate analytics, if enabled, is retained according to our analytics provider's settings.",
      ],
    },
    {
      id: "rights",
      title: "Your choices and rights",
      paragraphs: [
        "You may browse without creating an account. You can disable non-essential client storage by clearing site data in your browser settings.",
        "You can change analytics consent at any time through Cookie settings in the footer.",
        "Depending on where you live, you may have rights to access, correct, or delete personal information we hold about you. Because we collect very little identifiable data, many requests may simply confirm that we do not maintain a profile for you.",
        "To exercise privacy rights or ask a question about this policy, contact us at the email below.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Naija2050 is a public educational resource intended for a general audience. We do not knowingly collect personal information from children under 13. Street Pulse is limited to people 18 or older answering from Nigeria. If you believe a child has provided us personal information, contact us and we will delete it.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy when our practices change. The “Last updated” date at the top of this page will change when we do. Material changes will be reflected on this page.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `Privacy questions or data requests: ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const TERMS_OF_USE: LegalDocument = {
  slug: "terms",
  title: "Terms of Use",
  eyebrow: "Legal",
  description:
    "Rules for using Naija2050, our editorial content, interactive tools, and projections.",
  lastUpdated: "August 19, 2026",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance",
      paragraphs: [
        "By accessing or using Naija2050 (the “Site”), you agree to these Terms of Use. If you do not agree, do not use the Site.",
        "We may update these terms from time to time. Continued use after the “Last updated” date changes constitutes acceptance of the revised terms.",
      ],
    },
    {
      id: "about",
      title: "What the Site provides",
      paragraphs: [
        "Naija2050 publishes interactive history, sourced sector scenarios to 2050, comparators, and educational tools. It is independent civic media.",
        "2050 figures are scenarios built on stated assumptions and cited sources. They are not guarantees, forecasts offered for trading purposes, or professional advice.",
      ],
    },
    {
      id: "permitted-use",
      title: "Permitted use",
      paragraphs: ["You may use the Site for personal, educational, and non-commercial reference, including:"],
      bullets: [
        "Reading, sharing links to, and citing our public pages with attribution.",
        "Using interactive tools (timeline, comparators, Ask the Archive, Street Pulse) as intended.",
        "Reporting factual errors or broken sources through our corrections process.",
      ],
    },
    {
      id: "prohibited-use",
      title: "Prohibited use",
      paragraphs: ["You may not:"],
      bullets: [
        "Scrape, bulk-download, or mirror the Site in a way that impairs performance or misrepresents ownership.",
        "Attempt to bypass security, probe systems, or inject malicious code.",
        "Misrepresent Site content as official government policy, guaranteed economic outcomes, or personalized professional advice.",
        "Use Ask the Archive, Street Pulse, or other tools to generate harassment, spam, or unlawful content.",
        "Remove source attributions or imply endorsement by Naija2050 where none exists.",
      ],
    },
    {
      id: "ai-tools",
      title: "Ask the Archive and AI-labeled features",
      paragraphs: [
        "Ask the Archive retrieves answers from Naija2050's curated content store on the server. It may decline out-of-scope, abusive, unsafe, or injection-style questions rather than speculate. Requests are rate-limited.",
        "AI-assisted responses and labels are for exploration. Follow the source links before relying on an answer. ",
        "Do not treat AI-generated summaries as a substitute for professional, legal, financial, or medical advice.",
      ],
    },
    {
      id: "street-pulse",
      title: "Street Pulse",
      paragraphs: [
        "Street Pulse is for people 18 or older answering from Nigeria. Answers are anonymous bands. By submitting a ballot you grant Naija2050 a license to use it in aggregate research, public charts, and licensed reports. You may skip a demographic field labeled Prefer not to say.",
        "The sample is whoever uses this site. Live n is shown. Treat small counts as a weak signal.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      paragraphs: [
        "Site design, editorial structure, original text, data visualizations, and branding are owned by Naija2050 or its licensors unless otherwise noted.",
        "Cited third-party data remains subject to the terms of the original publishers. Source links are provided so you can verify rights and reuse conditions at the origin.",
        "Limited quotation with attribution and link-back is welcome for commentary, education, and journalism. Commercial republication of substantial portions requires prior written permission.",
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      paragraphs: [
        'The Site is provided "as is" and "as available." We strive for accuracy and source transparency but do not warrant that content is complete, current, or error-free.',
        "Historical topics, including contested periods, are presented with editorial care yet may not reflect every perspective. Projections depend on assumptions that may not materialize.",
        "To the fullest extent permitted by law, Naija2050 disclaims liability for decisions you make based on Site content.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      paragraphs: [
        "Naija2050 and its contributors will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Site.",
        "Where liability cannot be excluded, it is limited to the amount you paid to use the Site (which is zero for public access).",
      ],
    },
    {
      id: "corrections",
      title: "Corrections",
      paragraphs: [
        `We maintain a public methodology and corrections process. If you believe content is wrong, contact ${LEGAL_CONTACT_EMAIL} with the page URL, the specific claim, and your counter-source.`,
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      paragraphs: [
        "These terms are governed by the laws applicable to the operator of Naija2050, without regard to conflict-of-law rules. Disputes should first be raised via the contact email above.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `Questions about these terms: ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const LEGAL_DOCUMENTS = {
  privacy: PRIVACY_POLICY,
  terms: TERMS_OF_USE,
} as const;
