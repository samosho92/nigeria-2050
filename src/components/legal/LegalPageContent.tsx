import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import type { LegalDocument } from "@/content/legal";

interface LegalPageContentProps {
  document: LegalDocument;
}

function renderParagraph(text: string) {
  const emailMatch = text.match(/([^\s@]+@[^\s@]+\.[^\s@]+)/);
  if (!emailMatch) return text;

  const email = emailMatch[1];
  const [before, after] = text.split(email);
  return (
    <>
      {before}
      <Link href={`mailto:${email}`} className="font-medium text-accent hover:underline">
        {email}
      </Link>
      {after}
    </>
  );
}

export function LegalPageContent({ document }: LegalPageContentProps) {
  return (
    <>
      <PageHero
        eyebrow={document.eyebrow}
        title={document.title}
        description={document.description}
      >
        <p className="mt-2 text-xs text-muted-foreground">
          Last updated {document.lastUpdated}
        </p>
      </PageHero>

      <Container size="narrow" className="py-12 md:py-16">
        <div className="space-y-10">
          {document.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-serif text-xl font-bold text-foreground md:text-2xl">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-foreground/90 md:text-base"
                  >
                    {renderParagraph(paragraph)}
                  </p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 border-l-2 border-accent/20 pl-5">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm leading-relaxed text-foreground/90 md:text-base"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          Last updated {document.lastUpdated}
        </p>
      </Container>
    </>
  );
}
