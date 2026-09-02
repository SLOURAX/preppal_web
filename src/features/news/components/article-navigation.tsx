import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { NewsArticle } from "../news.constants";

interface ArticleNavigationProps {
  readonly previous?: NewsArticle;
  readonly next?: NewsArticle;
}

export function ArticleNavigation({ previous, next }: ArticleNavigationProps) {
  return (
    <nav
      aria-label="Article navigation"
      className="mt-10 grid gap-3 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          className="surface-card group p-5"
          href={`/news/${previous.slug}`}
        >
          <span className="text-muted-foreground flex items-center gap-2 text-xs">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />{" "}
            Previous story
          </span>
          <span className="text-foreground mt-2 line-clamp-2 text-sm font-semibold">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          className="surface-card group p-5 text-right"
          href={`/news/${next.slug}`}
        >
          <span className="text-muted-foreground flex items-center justify-end gap-2 text-xs">
            Next story{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="text-foreground mt-2 line-clamp-2 text-sm font-semibold">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
