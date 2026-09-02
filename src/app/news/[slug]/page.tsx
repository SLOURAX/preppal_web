import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";

import {
  ArticleEngagement,
  ArticleNavigation,
  NEWS_ARTICLES,
  formatNewsDate,
  formatNewsTime,
} from "@/features/news";

interface ArticlePageProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((entry) => entry.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | Preppal Journal`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const articleIndex = NEWS_ARTICLES.findIndex((entry) => entry.slug === slug);
  if (articleIndex === -1) notFound();

  const article = NEWS_ARTICLES[articleIndex];
  const previous = NEWS_ARTICLES[articleIndex + 1];
  const next = NEWS_ARTICLES[articleIndex - 1];

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8">
      <Link
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
        href="/news"
      >
        <ArrowLeft className="size-4" /> Back to all stories
      </Link>

      <article className="mt-8">
        <header className="mx-auto max-w-3xl text-center">
          <span className="bg-primary/10 text-primary inline-flex rounded-full px-3 py-1.5 text-xs font-semibold">
            {article.category}
          </span>
          <h1 className="text-foreground mt-5 text-4xl leading-tight font-bold tracking-[-0.045em] sm:text-5xl">
            {article.title}
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-base leading-7">
            {article.excerpt}
          </p>
          <div className="text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            <span className="text-foreground font-semibold">
              {article.author}
            </span>
            <time dateTime={article.publishedAt}>
              {formatNewsDate(article.publishedAt)} ·{" "}
              {formatNewsTime(article.publishedAt)}
            </time>
            <span className="flex items-center gap-1">
              <Clock3 className="size-3.5" /> {article.readTime}
            </span>
          </div>
        </header>

        <div className="relative mt-9 aspect-[16/9] overflow-hidden rounded-3xl shadow-[0_24px_70px_rgb(58_34_140/0.12)]">
          <Image
            alt=""
            className="object-cover"
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            src={article.image}
          />
        </div>

        <div className="text-muted-foreground mx-auto mt-10 max-w-2xl space-y-6 text-[15px] leading-8">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              className="bg-surface-subtle text-muted-foreground rounded-full px-3 py-1.5 text-xs"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </article>

      <div className="mx-auto max-w-2xl">
        <ArticleEngagement
          articleTitle={article.title}
          initialCommentCount={article.comments}
          initialLikes={article.likes}
        />
      </div>
      <ArticleNavigation next={next} previous={previous} />
    </main>
  );
}
