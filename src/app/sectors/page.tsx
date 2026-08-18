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
import { SECTORS } from "@/content/sectors";
import { CONTENT_STATS } from "@/lib/content-stats";

/** Highlighted until they sit with the rest of the grid as familiar entries. */
const NEW_SECTOR_SLUGS = new Set(["transportation", "real-estate"]);

export const metadata: Metadata = {
  title: "Sectors",
  description: `${CONTENT_STATS.sectorCount} sector visions for Nigeria by 2050.`,
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="2050 visions"
        title="Sector Visions"
        description={`Sourced, scenario-based projections across ${CONTENT_STATS.sectorCount} sectors. Each page links back to the historical throughline that makes the future case plausible.`}
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
                        New
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
