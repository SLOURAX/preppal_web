"use client";

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Heart,
  MessageCircle,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { DataState } from "@/components/ui";

import { NEWS_ARTICLES, NEWS_CATEGORIES } from "../news.constants";
import { formatNewsDate, formatNewsTime } from "../news.utils";
import { NewsCard } from "./news-card";

const ARTICLES_PER_PAGE = 3;

export function NewsLanding() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const featuredArticle = NEWS_ARTICLES.find((article) => article.featured);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return NEWS_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        !normalizedQuery ||
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.excerpt.toLowerCase().includes(normalizedQuery);
      const isDefaultFeature =
        article.featured && selectedCategory === "All" && !normalizedQuery;
      return matchesCategory && matchesSearch && !isDefaultFeature;
    });
  }, [searchQuery, selectedCategory]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE),
  );
  const safePage = Math.min(currentPage, pageCount);
  const visibleArticles = filteredArticles.slice(
    (safePage - 1) * ARTICLES_PER_PAGE,
    safePage * ARTICLES_PER_PAGE,
  );

  const updateCategory = (category: string): void => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <header className="max-w-2xl">
        <h1 className="text-foreground mt-4 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">
          Ideas for better learning.
        </h1>
        <p className="text-muted-foreground mt-1 text-base leading-7">
          Practical study guidance, product updates, learner stories, and
          thoughtful perspectives from the Preppal community.
        </p>
      </header>

      <div className="surface-card mt-8 flex flex-col gap-3 p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          {NEWS_CATEGORIES.map((category) => (
            <button
              aria-pressed={selectedCategory === category}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface-subtle hover:text-foreground",
              )}
              key={category}
              onClick={() => updateCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <label className="bg-surface-subtle flex min-w-0 items-center gap-2 rounded-full px-4 py-2.5 lg:w-72">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <span className="sr-only">Search news</span>
          <input
            className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search stories"
            type="search"
            value={searchQuery}
          />
        </label>
      </div>

      {featuredArticle && selectedCategory === "All" && !searchQuery.trim() ? (
        <article className="surface-card mt-8 grid overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">
          <Link
            className="relative min-h-72 overflow-hidden"
            href={`/news/${featuredArticle.slug}`}
          >
            <Image
              alt=""
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              src={featuredArticle.image}
            />
          </Link>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <span className="text-primary text-xs font-semibold">
              Featured · {featuredArticle.category}
            </span>
            <h2 className="text-foreground mt-3 text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
              <Link
                className="hover:text-primary transition-colors"
                href={`/news/${featuredArticle.slug}`}
              >
                {featuredArticle.title}
              </Link>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {featuredArticle.excerpt}
            </p>
            <div className="text-muted-foreground mt-5 flex flex-wrap items-center gap-4 text-xs">
              <span>
                {formatNewsDate(featuredArticle.publishedAt)} ·{" "}
                {formatNewsTime(featuredArticle.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock3 className="size-3.5" /> {featuredArticle.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="size-3.5" /> {featuredArticle.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="size-3.5" />{" "}
                {featuredArticle.comments}
              </span>
            </div>
            <Link
              className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-semibold"
              href={`/news/${featuredArticle.slug}`}
            >
              Read featured story <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>
      ) : null}

      <section className="mt-10" aria-labelledby="latest-stories">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-muted-foreground text-xs font-medium">
              Updated regularly
            </p>
            <h2
              className="text-foreground mt-1 text-2xl font-bold"
              id="latest-stories"
            >
              Latest stories
            </h2>
          </div>
          <p className="text-muted-foreground text-xs">
            {filteredArticles.length} article
            {filteredArticles.length === 1 ? "" : "s"}
          </p>
        </div>

        {visibleArticles.length > 0 ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleArticles.map((article) => (
              <NewsCard article={article} key={article.slug} />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <DataState
              title="No stories found"
              description="Try another search or category. New exam and study updates will appear here as they are published."
            />
          </div>
        )}

        {filteredArticles.length > ARTICLES_PER_PAGE ? (
          <nav
            aria-label="News pagination"
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              aria-label="Previous page"
              className="bg-surface hover:bg-surface-subtle grid size-10 place-items-center rounded-full shadow-sm disabled:opacity-40"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              type="button"
            >
              <ArrowLeft className="size-4" />
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (page) => (
                <button
                  aria-current={safePage === page ? "page" : undefined}
                  className={cn(
                    "grid size-10 place-items-center rounded-full text-sm font-semibold",
                    safePage === page
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface hover:bg-surface-subtle",
                  )}
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  type="button"
                >
                  {page}
                </button>
              ),
            )}
            <button
              aria-label="Next page"
              className="bg-surface hover:bg-surface-subtle grid size-10 place-items-center rounded-full shadow-sm disabled:opacity-40"
              disabled={safePage === pageCount}
              onClick={() =>
                setCurrentPage((page) => Math.min(pageCount, page + 1))
              }
              type="button"
            >
              <ArrowRight className="size-4" />
            </button>
          </nav>
        ) : null}
      </section>
    </main>
  );
}
