"use client";

import { ArrowLeft, Bookmark } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { DataState } from "@/components/ui";
import { useAuthStore } from "@/store";
import { getNewsBookmarks } from "../news-api";
import { NewsCard } from "./news-card";

export function SavedNews() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const bookmarks = useQuery({
    queryKey: ["news-bookmarks"],
    queryFn: getNewsBookmarks,
    enabled: isAuthenticated,
  });
  const savedArticles = bookmarks.data?.posts ?? [];

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <Link
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold"
        href="/news"
      >
        <ArrowLeft className="size-4" /> Back to News
      </Link>
      <header className="mt-7 max-w-2xl">
        <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-2xl">
          <Bookmark className="size-5 fill-current" />
        </span>
        <h1 className="text-foreground mt-4 text-3xl font-black tracking-[-0.045em] sm:text-4xl">
          Saved articles
        </h1>
        <p className="text-muted-foreground mt-2 text-[.85rem] leading-5">
          Keep useful study guides and stories close, then return to them
          whenever you need them.
        </p>
      </header>

      <section className="mt-8" aria-label="Saved articles">
        {!isAuthenticated ? (
          <DataState
            title="Sign in to see your saved articles"
            description="Your bookmarks are securely linked to your Preppal account."
            action={
              <Link
                className="bg-primary text-primary-foreground inline-flex rounded-xl px-4 py-2.5 text-xs font-semibold"
                href="/login?returnTo=%2Fnews%2Fsaved"
              >
                Sign in
              </Link>
            }
          />
        ) : bookmarks.isLoading ? (
          <DataState
            title="Loading saved articles"
            description="Fetching your bookmarked stories."
          />
        ) : bookmarks.isError ? (
          <DataState
            tone="error"
            title="Saved articles could not load"
            description="Please refresh the page and try again."
          />
        ) : savedArticles.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {savedArticles.map((article) => (
              <NewsCard article={article} key={article.slug} />
            ))}
          </div>
        ) : (
          <DataState
            title="No saved articles yet"
            description="Use the bookmark button on any article to keep it here."
            action={
              <Link
                className="bg-primary text-primary-foreground inline-flex rounded-xl px-4 py-2.5 text-xs font-semibold"
                href="/news"
              >
                Explore articles
              </Link>
            }
          />
        )}
      </section>
    </main>
  );
}
