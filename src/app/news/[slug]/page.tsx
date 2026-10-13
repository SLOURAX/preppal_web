import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { AdSlot } from "@/components/ads";
import {
  ArticleEngagement,
  formatNewsDate,
  formatNewsTime,
  getNewsArticle,
  readTime,
} from "@/features/news";

interface ArticlePageProps {
  readonly params: Promise<{ slug: string }>;
}

const richArticleBlock =
  /<(?:p|br|strong|b|em|i|u|sub|sup|ul|ol|li|blockquote|code|pre|span|div|h2|h3|table|thead|tbody|tr|th|td|figure|figcaption|img|a)\b/i;

function ArticleBodyBlock({ value }: { readonly value: string }) {
  if (!richArticleBlock.test(value)) return <p>{value}</p>;
  return (
    <div
      className="rich-content [&_blockquote]:border-primary [&_figcaption]:text-muted-foreground [&_td]:border-border [&_th]:border-border [&_th]:bg-surface-subtle [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_figcaption]:mt-2 [&_figcaption]:text-xs [&_figure]:my-7 [&_figure]:text-center [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-bold [&_img]:mx-auto [&_img]:max-h-[32rem] [&_img]:max-w-full [&_img]:rounded-2xl [&_ol]:list-decimal [&_ol]:pl-6 [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:p-2.5 [&_th]:border [&_th]:p-2.5 [&_ul]:list-disc [&_ul]:pl-6"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getNewsArticle(slug);
  return data
    ? {
        title: `${data.article.title} | Preppal Journal`,
        description: data.article.excerpt,
      }
    : {};
}
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const data = await getNewsArticle(slug);
  if (!data) notFound();
  const { article, comments } = data;
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
              <Clock3 className="size-3.5" />{" "}
              {readTime(article.readTimeMinutes)}
            </span>
          </div>
        </header>
        <div className="relative mt-9 aspect-[16/9] overflow-hidden rounded-3xl shadow-[0_24px_70px_rgb(58_34_140/0.12)]">
          <Image
            alt={article.imageAlt ?? article.title}
            className="object-cover"
            fill
            loading="lazy"
            sizes="(max-width: 896px) 100vw, 896px"
            src={article.image ?? "/news/ai-study-support.png"}
          />
        </div>
        <div className="text-muted-foreground mx-auto mt-10 max-w-2xl space-y-6 text-[15px] leading-8">
          {article.content.map((block, index) => (
            <div key={`${index}-${block.slice(0, 20)}`}>
              <ArticleBodyBlock value={block} />
              {index === 0 ? (
                <AdSlot
                  className="my-10"
                  format="rectangle"
                  slotId="news-article-after-intro"
                />
              ) : null}
            </div>
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
        <AdSlot
          className="my-10"
          format="horizontal"
          slotId="news-article-before-engagement"
        />
        <ArticleEngagement
          articleSlug={article.slug}
          articleTitle={article.title}
          initialCommentCount={article.comments}
          initialLikes={article.likes}
          initialComments={comments}
        />
      </div>
    </main>
  );
}
