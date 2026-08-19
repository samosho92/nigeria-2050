import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { FAQ_ITEMS, FAQ_META } from "@/content/faq";

export function FaqPageContent() {
  return (
    <>
      <PageHero
        eyebrow={FAQ_META.eyebrow}
        title={FAQ_META.title}
        description={FAQ_META.description}
      />
      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-4">
          {FAQ_ITEMS.map((item) => (
            <section key={item.question} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold text-foreground">{item.question}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </section>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-4xl text-sm text-muted-foreground">
          Need more detail? Visit{" "}
          <Link href="/methodology" className="text-accent transition hover:underline">
            Methodology
          </Link>{" "}
          and{" "}
          <Link href="/sources" className="text-accent transition hover:underline">
            Sources
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
