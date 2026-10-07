import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { SECTORS, SECTORS_PAGE_META } from "@/content/sectors";
import { CONTENT_STATS } from "@/lib/content-stats";

const NEW_SECTOR_SLUGS = new Set<string>(SECTORS_PAGE_META.newSectorSlugs);

export const metadata: Metadata = {
  title: SECTORS_PAGE_META.seoTitle,
  description: SECTORS_PAGE_META.seoDescription(CONTENT_STATS.sectorCount),
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow={SECTORS_PAGE_META.eyebrow}
        title={SECTORS_PAGE_META.title}
        description={SECTORS_PAGE_META.description(CONTENT_STATS.sectorCount)}
      />
      <Container className="py-12 md:py-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector) => (
            <li key={sector.slug}>
              <Link href={`/sectors/${sector.slug}`} className="group block h-full">
                <Card className="h-full transition hover:border-accent hover:bg-surface-elevated">
                  <CardHeader>
                    {NEW_SECTOR_SLUGS.has(sector.slug) && (
                      <Badge variant="accent" className="mb-1 w-fit">
                        {SECTORS_PAGE_META.newBadge}
                      </Badge>
                    )}
                    <CardTitle className="text-lg group-hover:text-accent">
                      {sector.title}
                    </CardTitle>
                    <CardDescription>{sector.tagline}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
