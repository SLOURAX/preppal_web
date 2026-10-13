"use client";

import {
  Bookmark,
  Check,
  Heart,
  MessageCircle,
  Send,
  Share2,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";
import { postNewsComment, type ReaderComment } from "../news-api";

interface ArticleEngagementProps {
  readonly articleSlug: string;
  readonly articleTitle: string;
  readonly initialLikes: number;
  readonly initialCommentCount: number;
  readonly initialComments: readonly ReaderComment[];
}

export function ArticleEngagement({
  articleSlug,
  articleTitle,
  initialLikes,
  initialCommentCount,
  initialComments,
}: ArticleEngagementProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [hasShared, setHasShared] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<readonly ReaderComment[]>(initialComments);
  const [isPosting, setIsPosting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  const requireAuth = (): void => {
    if (isAuthenticated) return;
    router.push(
      `/login?returnTo=${encodeURIComponent(window.location.pathname)}`,
    );
  };

  const shareArticle = async (): Promise<void> => {
    const shareUrl = window.location.href;
    if (navigator.share)
      await navigator.share({ title: articleTitle, url: shareUrl });
    else await navigator.clipboard.writeText(shareUrl);
    setHasShared(true);
    window.setTimeout(() => setHasShared(false), 1800);
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const message = commentText.trim();
    if (!message) return;
    setCommentError(null); setIsPosting(true);
    try { const comment = await postNewsComment(articleSlug, message); setComments((current) => [comment, ...current]); setCommentText(""); }
    catch { setCommentError("Your comment could not be posted. Please try again."); }
    finally { setIsPosting(false); }
  };

  return (
    <section className="mt-10" aria-labelledby="conversation-heading">
      <div className="surface-card flex flex-wrap items-center justify-between gap-3 p-3">
        <div className="flex items-center gap-2">
          <button
            aria-pressed={isLiked}
            className={cn(
              "hover:bg-surface-subtle flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium",
              isLiked && "bg-red-500/10 text-red-500",
            )}
            onClick={() => {
              if (!isAuthenticated) return requireAuth();
              setIsLiked((current) => !current);
            }}
            type="button"
          >
            <Heart className={cn("size-4", isLiked && "fill-current")} />{" "}
            {initialLikes + (isLiked ? 1 : 0)}
          </button>
          <span className="text-muted-foreground flex items-center gap-2 rounded-full px-3 py-2 text-sm">
            <MessageCircle className="size-4" />{" "}
            {initialCommentCount + comments.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Bookmark article"
            aria-pressed={isBookmarked}
            className={cn(
              "hover:bg-surface-subtle grid size-9 place-items-center rounded-full",
              isBookmarked && "bg-primary/10 text-primary",
            )}
            onClick={() => {
              if (!isAuthenticated) return requireAuth();
              setIsBookmarked((current) => !current);
            }}
            type="button"
          >
            <Bookmark
              className={cn("size-4", isBookmarked && "fill-current")}
            />
          </button>
          <button
            className="hover:bg-surface-subtle flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium"
            onClick={shareArticle}
            type="button"
          >
            {hasShared ? (
              <Check className="text-success size-4" />
            ) : (
              <Share2 className="size-4" />
            )}{" "}
            {hasShared ? "Copied" : "Share"}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2
          className="text-foreground text-xl font-bold"
          id="conversation-heading"
        >
          Join the conversation
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Share a thoughtful response with other learners.
        </p>
        {isAuthenticated ? (
          <form className="surface-card mt-5 p-4" onSubmit={submitComment}>
            <label className="sr-only" htmlFor="article-comment">
              Write a comment
            </label>
            <textarea
              className="bg-surface-subtle placeholder:text-muted-foreground focus:ring-primary/30 min-h-24 w-full resize-y rounded-2xl p-4 text-sm outline-none focus:ring-2"
              id="article-comment"
              maxLength={500}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Add to the conversation…"
              value={commentText}
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-muted-foreground text-xs">
                {commentText.length}/500
              </span>
              <Button
                className="gap-2"
                disabled={!commentText.trim() || isPosting}
                type="submit"
              >
                <Send className="size-4" /> {isPosting ? "Posting…" : "Post comment"}
              </Button>
            </div>
            {commentError ? <p className="mt-2 text-xs text-destructive">{commentError}</p> : null}
          </form>
        ) : (
          <div className="surface-card mt-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-sm">
              Sign in to join the conversation with other learners.
            </p>
            <Link
              className="bg-primary text-primary-foreground inline-flex shrink-0 items-center justify-center rounded-xl px-4 py-2.5 text-xs font-semibold"
              href={`/login?returnTo=${encodeURIComponent(typeof window === "undefined" ? "/news" : window.location.pathname)}`}
            >
              Sign in to comment
            </Link>
          </div>
        )}

        <div className="divide-border mt-5 divide-y">
          {comments.map((comment) => (
            <article className="flex gap-3 py-5" key={comment.id}>
              <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold">
                {comment.author.slice(0, 1)}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-x-2">
                  <h3 className="text-sm font-semibold">{comment.author}</h3>
                  <time className="text-muted-foreground text-xs">
                    {new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(new Date(comment.postedAt))}
                  </time>
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {comment.message}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
