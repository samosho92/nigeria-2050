import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { AskArchiveChat } from "@/components/ask/AskArchiveChat";
import { LinkButton } from "@/components/ui/LinkButton";
import { ASK_PAGE_META } from "@/content/ask";

export const metadata: Metadata = {
  title: ASK_PAGE_META.seoTitle,
  description: ASK_PAGE_META.seoDescription,
};

export default function AskPage() {
  return (
    <>
      <PageHero
        eyebrow={ASK_PAGE_META.eyebrow}
        title={ASK_PAGE_META.title}
        description={ASK_PAGE_META.description}
        actions={
          <LinkButton href="/" variant="secondary" className="gap-1.5">
            <IconArrowLeft className="size-4" stroke={1.5} aria-hidden />
            {ASK_PAGE_META.backHome}
          </LinkButton>
        }
      />
      <Container size="narrow" className="py-12 md:py-16">
        <AskArchiveChat />
        <p className="mt-8 text-center text-xs text-muted-foreground">
          {ASK_PAGE_META.footerLead}{" "}
          <Link href="/timeline" className="font-medium text-accent hover:underline">
            {ASK_PAGE_META.footerTimeline}
          </Link>
          ,{" "}
          <Link href="/literature" className="font-medium text-accent hover:underline">
            {ASK_PAGE_META.footerLiterature}
          </Link>
          , or{" "}
          <Link href="/sources" className="font-medium text-accent hover:underline">
            {ASK_PAGE_META.footerSources}
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
