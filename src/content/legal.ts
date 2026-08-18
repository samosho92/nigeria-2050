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
  lastUpdated: "August 17, 2026",
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
        "Anonymous usage events (page views, cross-pillar navigation, comparator interactions) when analytics is enabled in production.",
        "Browser-local preferences you set on your device, such as theme, data-saver mode, and a short rolling log of anonymous analytics events stored in localStorage.",
        "Questions you type into Ask the Archive, processed in your browser against our curated content. We do not operate a user account system and do not persist chat transcripts on our servers by default.",
        "Information you choose to send by email (for example, a correction report), including your email address and message content.",
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      paragraphs: [
        "In production, we may enable privacy-oriented analytics through Plausible when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured. Plausible is designed to measure aggregate traffic without cross-site tracking profiles.",
        "We also record lightweight, anonymous interaction events locally in your browser to help us understand whether features such as timeline-to-sector links are working. These events do not include your name, email, or precise location.",
        "You can limit site motion and some client-side behavior with the data-saver toggle in the header. Clearing site data in your browser removes locally stored preferences and analytics summaries.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and local storage",
      paragraphs: [
        "Naija2050 uses browser local storage for functional preferences (theme, data-saver, anonymous analytics mirror). We do not use local storage for cross-site advertising.",
        "If Plausible analytics is enabled, Plausible may set a first-party cookie or use local storage consistent with its documentation. Refer to Plausible's own privacy policy for details on their processing.",
      ],
    },
    {
      id: "third-parties",
      title: "Third-party services",
      paragraphs: [
        "The site links to external sources cited in our Source Library. Those sites have their own privacy practices.",
        "Hosting and delivery may be provided by infrastructure vendors (for example, Vercel). They process technical request data needed to serve the site securely.",
        "Ask the Archive runs client-side retrieval against content shipped with the site. It is not a general web search tool and does not send your questions to third-party AI providers in the current implementation.",
      ],
    },
    {
      id: "retention",
      title: "Retention",
      paragraphs: [
        "Local browser data persists until you clear it. Email correspondence is retained only as long as needed to investigate corrections, respond to you, and maintain an editorial record of updates.",
        "Aggregate analytics, if enabled, is retained according to our analytics provider's settings.",
      ],
    },
    {
      id: "rights",
      title: "Your choices and rights",
      paragraphs: [
        "You may browse without creating an account. You can disable non-essential client storage by clearing site data in your browser settings.",
        "Depending on where you live, you may have rights to access, correct, or delete personal information we hold about you. Because we collect very little identifiable data, many requests may simply confirm that we do not maintain a profile for you.",
        "To exercise privacy rights or ask a question about this policy, contact us at the email below.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Naija2050 is a public educational resource intended for a general audience. We do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, contact us and we will delete it.",
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
  lastUpdated: "August 17, 2026",
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
        "Naija2050 publishes interactive history, sourced sector scenarios to 2050, comparators, and educational tools. It is independent civic media, not a government publication, investment advisory service, or news wire.",
        "2050 figures are scenarios built on stated assumptions and cited sources. They are not guarantees, forecasts offered for trading purposes, or professional advice.",
      ],
    },
    {
      id: "permitted-use",
      title: "Permitted use",
      paragraphs: ["You may use the Site for personal, educational, and non-commercial reference, including:"],
      bullets: [
        "Reading, sharing links to, and citing our public pages with attribution.",
        "Using interactive tools (timeline, comparators, Ask the Archive) as intended.",
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
        "Use Ask the Archive or other tools to generate harassment, spam, or unlawful content.",
        "Remove source attributions or imply endorsement by Naija2050 where none exists.",
      ],
    },
    {
      id: "ai-tools",
      title: "Ask the Archive and AI-labeled features",
      paragraphs: [
        "Ask the Archive retrieves answers from Naija2050's curated content store. It may decline out-of-scope questions rather than speculate.",
        "AI-assisted responses and labels are provided for exploration, not as authoritative fact. Always follow links to primary timeline entries, sector pages, and the Source Library before relying on any answer.",
        "Do not treat AI-generated summaries as a substitute for professional, legal, financial, or medical advice.",
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
