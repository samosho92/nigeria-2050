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

export const LEGAL_CONTACT_EMAIL = "corrections@nigeria2050.com";

/** Cookie / analytics consent banner and preference reopen. */
export const COOKIE_CONSENT_COPY = {
  title: "Help us see what is useful",
  body: "Anonymous page analytics show which timeline eras, sectors, and tools people open. That guides what we build next. No ads and no personal profile. You can change this anytime.",
  accept: "Allow analytics",
  decline: "Not now",
  privacy: "Privacy policy",
  preferencesTitle: "Analytics preference",
  preferencesBody:
    "Anonymous page analytics help us improve Nigeria2050. No ads and no personal profile. Pick a choice below, or leave it as it is.",
  keepCurrent: "Keep current choice",
} as const;

export const PRIVACY_POLICY: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  eyebrow: "Legal",
  description:
    "How Nigeria2050 handles information when you use the site.",
  lastUpdated: "October 4, 2026",
  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        "Nigeria2050 is independent civic media. You can read the site without creating an account. We do not sell personal information or use the site for targeted advertising.",
        "This policy explains what information we may process, why we process it, and the choices you have.",
      ],
    },
    {
      id: "what-we-collect",
      title: "Information we process",
      paragraphs: [
        "Depending on how you use the site, we may process:",
      ],
      bullets: [
        "Technical and usage data needed to deliver pages securely (for example request metadata handled by our hosting and delivery providers).",
        "Optional analytics events after you consent (for example page views and high-level feature use). These events do not include your name or email.",
        "Preferences stored on your device so the site remembers settings you choose, such as theme, data-saver, analytics consent, and profile bands used by interactive tools.",
        "Content you submit through interactive tools, including poll answers, chat questions, corrections, and project ideas. Poll answers use anonymous bands and a random browser identifier. We do not ask for a name, password, or precise location on those tools.",
        "Information you choose to send us by email or form, such as a page link, a correction, or a contact address. Do not send passwords, payment details, or other sensitive personal data.",
      ],
    },
    {
      id: "how-we-use",
      title: "How we use information",
      paragraphs: [
        "We use information to operate and improve the site, keep interactive features working, understand aggregate usage, respond to messages you send, and support editorial quality.",
        "Poll answers and similar submissions may be shown in aggregate on the site and used for research summaries. We may share or license aggregated, non-identifying results. We do not sell individual identifiable records.",
      ],
    },
    {
      id: "analytics",
      title: "Analytics and consent",
      paragraphs: [
        "Optional analytics runs only after you accept. If you decline, the site still works without those analytics tools.",
        "When analytics is on, we may use first-party analytics services configured for production. You can change your choice anytime through Cookie settings in the footer.",
      ],
    },
    {
      id: "interactive-tools",
      title: "Interactive tools",
      paragraphs: [
        "Some tools have eligibility rules shown on the tool itself (for example age or location). Where a tool records answers, we store only what is needed for that feature, usually as ranges or categories rather than free-text personal details.",
        "Chat and similar guides retrieve answers from our curated site content. Requests are rate-limited. We do not send those questions to third-party AI providers, and we do not keep chat transcripts as a personal profile.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and local storage",
      paragraphs: [
        "We use local storage and, where needed, cookies for essential site function and for preferences you set.",
        "Optional analytics cookies or storage run only after consent. Clearing site data in your browser removes locally stored preferences and consent choices.",
      ],
    },
    {
      id: "third-parties",
      title: "Sharing and third parties",
      paragraphs: [
        "We use service providers to host, deliver, store, and (with consent) measure the site. They process data only as needed to provide those services.",
        "Links to external sources lead to other sites with their own privacy practices.",
        "We may disclose information if required by law, or to protect the security and integrity of the site.",
      ],
    },
    {
      id: "retention",
      title: "Retention",
      paragraphs: [
        "We keep information only as long as needed for the purposes above, including operating interactive features, answering messages, and meeting legal obligations.",
        "Data stored in your browser remains until you clear it. Analytics retention follows the settings of the analytics services we use.",
      ],
    },
    {
      id: "rights",
      title: "Your choices and rights",
      paragraphs: [
        "You may browse without an account. You can withdraw analytics consent in Cookie settings and clear site data in your browser.",
        "Depending on where you live, you may have rights to access, correct, delete, or restrict processing of personal information we hold about you, or to object to certain processing.",
        "Because we collect little identifiable data, many requests will confirm that we do not maintain a personal profile for you. Contact us at the email below to make a request.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "The site is intended for a general audience. We do not knowingly collect personal information from children under 13. Some interactive features are limited to adults; those limits are stated on the relevant pages. Contact us if you believe a child has submitted personal information, and we will delete it.",
      ],
    },
    {
      id: "international",
      title: "Where information is processed",
      paragraphs: [
        "The site and its service providers may process information in countries other than where you live. Where we do so, we take steps appropriate to the nature of the data and the services involved.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy when our practices change. The “Last updated” date on this page will change when we do. Continued use of the site after an update means you have seen the revised policy.",
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
    "Rules for using Nigeria2050, our editorial content, interactive tools, and projections.",
  lastUpdated: "August 19, 2026",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance",
      paragraphs: [
        "By accessing or using Nigeria2050 (the “Site”), you agree to these Terms of Use. If you do not agree, do not use the Site.",
        "We may update these terms from time to time. Continued use after the “Last updated” date changes constitutes acceptance of the revised terms.",
      ],
    },
    {
      id: "about",
      title: "What the Site provides",
      paragraphs: [
        "Nigeria2050 publishes interactive history, sourced sector scenarios to 2050, comparators, and educational tools. It is independent civic media.",
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
        "Remove source attributions or imply endorsement by Nigeria2050 where none exists.",
      ],
    },
    {
      id: "ai-tools",
      title: "Ask the Archive and AI-labeled features",
      paragraphs: [
        "Ask the Archive retrieves answers from Nigeria2050's curated content store on the server. It may decline out-of-scope, abusive, unsafe, or injection-style questions rather than speculate. Requests are rate-limited.",
        "AI-assisted responses and labels are for exploration. Follow the source links before relying on an answer. ",
        "Do not treat AI-generated summaries as a substitute for professional, legal, financial, or medical advice.",
      ],
    },
    {
      id: "street-pulse",
      title: "Street Pulse",
      paragraphs: [
        "Street Pulse is for people 18 or older answering from Nigeria. Answers are anonymous bands. By submitting a ballot you grant Nigeria2050 a license to use it in aggregate research, public charts, and licensed reports. You may skip a demographic field labeled Prefer not to say.",
        "The sample is whoever uses this site. Live n is shown. Treat small counts as a weak signal.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      paragraphs: [
        "Site design, editorial structure, original text, data visualizations, and branding are owned by Nigeria2050 or its licensors unless otherwise noted.",
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
        "To the fullest extent permitted by law, Nigeria2050 disclaims liability for decisions you make based on Site content.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      paragraphs: [
        "Nigeria2050 and its contributors will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Site.",
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
        "These terms are governed by the laws applicable to the operator of Nigeria2050, without regard to conflict-of-law rules. Disputes should first be raised via the contact email above.",
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
