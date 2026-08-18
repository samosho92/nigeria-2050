import type { Metadata } from "next";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SOURCES } from "@/content/sources";

export const metadata: Metadata = {
  title: "Source Library",
  description: "Every cited source in one place for independent credibility-checking.",
};

export default function SourcesPage() {
  const grouped = SOURCES.reduce(
    (acc, source) => {
      const pub = source.publisher;
      if (!acc[pub]) acc[pub] = [];
      acc[pub].push(source);
      return acc;
    },
    {} as Record<string, typeof SOURCES>,
  );

  return (
    <Container className="py-16">
      <PageHeader
        title="Source Library"
        description="Every quantitative claim on Naija2050 traces back here. Click through to verify independently."
      />
      <div className="mt-12 space-y-10">
        {Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([publisher, sources]) => (
            <section key={publisher}>
              <h2 className="mb-4 text-lg font-bold text-accent">{publisher}</h2>
              <ul className="space-y-3">
                {sources.map((source) => (
                  <li
                    key={source.id}
                    id={source.id}
                    className="scroll-mt-24 rounded-lg border border-border bg-card p-4"
                  >
                    <p className="font-medium">{source.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {source.publisher} · {source.year}
                    </p>
                    {source.url && (
                      <Link
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                      >
                        View original
                        <IconExternalLink className="size-3" stroke={1.5} aria-hidden />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </div>
    </Container>
  );
}
