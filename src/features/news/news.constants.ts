export interface NewsArticle {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly image: string;
  readonly category: string;
  readonly author: string;
  readonly publishedAt: string;
  readonly readTime: string;
  readonly likes: number;
  readonly comments: number;
  readonly featured?: boolean;
  readonly body: readonly string[];
  readonly tags: readonly string[];
}
