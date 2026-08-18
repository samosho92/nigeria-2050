import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SECTORS } from "@/lib/constants/sectors";

export const metadata: Metadata = {
  title: "Sectors",
  description: "Six flagship sector visions for Nigeria by 2050.",
};

export default function SectorsPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title="Sector Visions"
        description="Sourced, scenario-based projections across six flagship sectors — each linked back to the historical throughline."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {SECTORS.map((sector) => (
          <li key={sector.slug}>
            <Link href={`/sectors/${sector.slug}`}>
              <Card className="transition hover:border-secondary">
                <CardHeader>
                  <CardTitle className="text-lg">{sector.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{sector.tagline}</p>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
