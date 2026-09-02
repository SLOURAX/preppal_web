import { Clock3, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { NewsArticle } from "../news.constants";
import { formatNewsDate, formatNewsTime } from "../news.utils";

interface NewsCardProps {
  readonly article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="surface-card group overflow-hidden">
      <Link
        aria-label={`Read ${article.title}`}
        className="relative block aspect-[16/10] overflow-hidden"
        href={`/news/${article.slug}`}
      >
        <Image
          alt=""
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={article.image}
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-[11px] font-semibold">
            {article.category}
          </span>
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <Clock3 className="size-3.5" /> {article.readTime}
          </span>
        </div>
        <h2 className="text-foreground mt-4 line-clamp-2 text-lg leading-6 font-bold tracking-[-0.02em]">
          <Link
            className="hover:text-primary transition-colors"
            href={`/news/${article.slug}`}
          >
            {article.title}
          </Link>
        </h2>
        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">
          {article.excerpt}
        </p>
        <div className="text-muted-foreground mt-5 flex items-center justify-between text-[11px]">
          <span>
            {formatNewsDate(article.publishedAt)} ·{" "}
            {formatNewsTime(article.publishedAt)}
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart className="size-3.5" /> {article.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="size-3.5" /> {article.comments}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
