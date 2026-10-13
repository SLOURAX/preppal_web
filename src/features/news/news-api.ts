import { apiClient } from "@/lib/api/client";
import { env } from "@/config/env";

export interface PublicNewsArticle { slug: string; title: string; excerpt: string; content: string[]; category: string; author: string; image: string | null; imageAlt: string | null; tags: string[]; readTimeMinutes: number; likes: number; comments: number; featured: boolean; publishedAt: string; }
export interface ReaderComment { id: string; author: string; message: string; postedAt: string; avatarUrl: string | null; }
export interface NewsArticleDetail { article: PublicNewsArticle; comments: ReaderComment[]; }
export const readTime = (minutes: number) => `${minutes} min read`;
export const getNewsPosts = (category?: string, search?: string) => apiClient<{ posts: PublicNewsArticle[]; categories: string[] }>(`/api/v1/blog/posts?${new URLSearchParams({ ...(category ? { category } : {}), ...(search ? { search } : {}) })}`);
export const postNewsComment = (slug: string, body: string) => apiClient<ReaderComment>(`/api/v1/blog/posts/${slug}/comments`, { method: "POST", body: JSON.stringify({ body }) });
export async function getNewsArticle(slug: string): Promise<NewsArticleDetail | null> { const response = await fetch(`${env.apiUrl}/api/v1/blog/posts/${encodeURIComponent(slug)}`, { cache: "no-store" }); return response.ok ? response.json() as Promise<NewsArticleDetail> : null; }
