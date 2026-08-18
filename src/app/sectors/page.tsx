import type { Metadata } from "next";
import Link from "next/link";
import { SECTORS } from "@/lib/constants/sectors";

export const metadata: Metadata = {
  title: "Sectors",
  description: "Six flagship sector visions for Nigeria by 2050.",
};

export default function SectorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-bold md:text-4xl">Sector Visions</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">
        Sourced, scenario-based projections across six flagship sectors — each
        linked back to the historical throughline.
      </p>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {SECTORS.map((sector) => (
          <li key={sector.slug}>
            <Link
              href={`/sectors/${sector.slug}`}
              className="block rounded-xl border border-lagos-border bg-lagos-surface p-6 transition hover:border-adire-indigo-light"
            >
              <h2 className="text-lg font-semibold">{sector.title}</h2>
              <p className="mt-2 text-sm text-text-secondary">{sector.tagline}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
