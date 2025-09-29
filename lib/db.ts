// Database utility functions
// This file provides database connection and query helpers

export interface Source {
  id: number
  name: string
  url: string
  base_domain: string
  scrape_config: any
  is_active: boolean
  fetch_frequency_minutes: number
  last_fetched_at: Date | null
  success_count: number
  error_count: number
  created_at: Date
  updated_at: Date
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  created_at: Date
}

export interface Article {
  id: number
  source_id: number
  category_id: number | null
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  author: string | null
  source_url: string
  image_url: string | null
  published_at: Date | null
  content_hash: string
  status: "pending" | "approved" | "rejected"
  views: number
  created_at: Date
  updated_at: Date
}

export interface ScrapeLog {
  id: number
  source_id: number
  status: "success" | "error" | "partial"
  articles_found: number
  articles_new: number
  articles_duplicate: number
  error_message: string | null
  duration_ms: number | null
  created_at: Date
}

export async function query(sql: string, params: any[] = []): Promise<{ rows: any[] }> {
  // Mock implementation - replace with actual database connection
  // When you connect a real database (Supabase/Neon), this will execute actual queries
  console.log("[v0] Database query called:", sql, params)
  return { rows: [] }
}

// Mock database functions (replace with actual database queries when integration is added)
export async function getArticles(options: {
  status?: string
  category?: string
  limit?: number
  offset?: number
}): Promise<Article[]> {
  // This would connect to your actual database
  // For now, returning mock data structure
  return []
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return null
}

export async function getSources(activeOnly = true): Promise<Source[]> {
  return []
}

export async function getCategories(): Promise<Category[]> {
  return []
}

export async function createArticle(article: Omit<Article, "id" | "created_at" | "updated_at">): Promise<Article> {
  throw new Error("Database not connected")
}

export async function updateArticleStatus(id: number, status: Article["status"]): Promise<void> {
  throw new Error("Database not connected")
}

export async function logScrape(log: Omit<ScrapeLog, "id" | "created_at">): Promise<void> {
  throw new Error("Database not connected")
}
