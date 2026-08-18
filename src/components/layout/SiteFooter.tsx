import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-lagos-border bg-lagos-surface px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <p className="font-bold">Naija2050</p>
          <p className="mt-2 max-w-sm text-sm text-text-secondary">
            Independent, non-partisan, source-transparent civic media about
            Nigeria&apos;s story and trajectory.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-text-secondary">
          <Link href="/methodology" className="hover:text-text-primary">
            Editorial Methodology
          </Link>
          <Link href="/sources" className="hover:text-text-primary">
            Source Library
          </Link>
          <Link href="/ask" className="hover:text-text-primary">
            Ask the Archive
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-text-muted">
        © {new Date().getFullYear()} Naija2050. Optimistic, not naive — every
        projection is a scenario built on stated assumptions.
      </p>
    </footer>
  );
}
