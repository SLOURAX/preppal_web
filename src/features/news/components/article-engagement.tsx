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

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ReaderComment {
  readonly id: string;
  readonly author: string;
  readonly message: string;
  readonly postedAt: string;
}

interface ArticleEngagementProps {
  readonly articleTitle: string;
  readonly initialLikes: number;
  readonly initialCommentCount: number;
}

const INITIAL_COMMENTS: readonly ReaderComment[] = [
  {
    id: "comment-1",
    author: "Ada M.",
    message:
      "This is a useful way to think about reviewing mistakes. I’m going to try it in my next practice session.",
    postedAt: "2 hours ago",
  },
  {
    id: "comment-2",
    author: "Daniel O.",
    message: "The practical examples made the idea much easier to understand.",
    postedAt: "Yesterday",
  },
];

export function ArticleEngagement({
  articleTitle,
  initialLikes,
  initialCommentCount,
}: ArticleEngagementProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [hasShared, setHasShared] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] =
    useState<readonly ReaderComment[]>(INITIAL_COMMENTS);

  const shareArticle = async (): Promise<void> => {
    const shareUrl = window.location.href;
    if (navigator.share)
      await navigator.share({ title: articleTitle, url: shareUrl });
    else await navigator.clipboard.writeText(shareUrl);
    setHasShared(true);
    window.setTimeout(() => setHasShared(false), 1800);
  };

  const submitComment = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const message = commentText.trim();
    if (!message) return;
    setComments((current) => [
      {
        id: `comment-${Date.now()}`,
        author: "You",
        message,
        postedAt: "Just now",
      },
      ...current,
    ]);
    setCommentText("");
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
            onClick={() => setIsLiked((current) => !current)}
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
            onClick={() => setIsBookmarked((current) => !current)}
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
              disabled={!commentText.trim()}
              type="submit"
            >
              <Send className="size-4" /> Post comment
            </Button>
          </div>
        </form>

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
                    {comment.postedAt}
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
