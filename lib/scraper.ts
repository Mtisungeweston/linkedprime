// Web scraping utilities
import * as crypto from "crypto"

export interface ScrapeConfig {
  article_selector: string
  title_selector: string
  link_selector: string
  excerpt_selector?: string
  image_selector?: string
  content_selector?: string
  author_selector?: string
  date_selector?: string
}

export interface ScrapedArticle {
  title: string
  url: string
  excerpt?: string
  content?: string
  image_url?: string
  author?: string
  published_at?: Date
}

export interface ScrapeResult {
  success: boolean
  articles: ScrapedArticle[]
  error?: string
  duration_ms: number
}

// Generate content hash for deduplication
export function generateContentHash(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex")
}

// Normalize URL for comparison
export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url)
    // Remove tracking parameters
    const cleanParams = new URLSearchParams()
    for (const [key, value] of parsed.searchParams) {
      if (!key.match(/^(utm_|fbclid|gclid)/)) {
        cleanParams.set(key, value)
      }
    }
    parsed.search = cleanParams.toString()
    return parsed.toString()
  } catch {
    return url
  }
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100)
}

// Extract text content from HTML
function extractText(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// Parse HTML and extract articles using CSS selectors
function parseHTML(html: string, config: ScrapeConfig, baseUrl: string): ScrapedArticle[] {
  const articles: ScrapedArticle[] = []

  try {
    // Simple regex-based parsing (in production, use a proper HTML parser like cheerio)
    const articleRegex = new RegExp(`<[^>]*class="[^"]*${config.article_selector.replace(".", "")}[^"]*"[^>]*>`, "gi")
    const matches = html.match(articleRegex)

    if (!matches) return articles

    // For demo purposes, extract basic article data
    // In production, use a proper HTML parser
    const titleRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/i
    const linkRegex = /<a[^>]*href="([^"]+)"[^>]*>/i
    const imgRegex = /<img[^>]*src="([^"]+)"[^>]*>/i

    for (let i = 0; i < Math.min(matches.length, 20); i++) {
      const articleHtml = matches[i]
      const titleMatch = articleHtml.match(titleRegex)
      const linkMatch = articleHtml.match(linkRegex)
      const imgMatch = articleHtml.match(imgRegex)

      if (titleMatch && linkMatch) {
        const title = extractText(titleMatch[1])
        let url = linkMatch[1]

        // Convert relative URLs to absolute
        if (url.startsWith("/")) {
          url = new URL(url, baseUrl).toString()
        }

        articles.push({
          title,
          url: normalizeUrl(url),
          image_url: imgMatch ? imgMatch[1] : undefined,
          excerpt: title.substring(0, 200),
        })
      }
    }
  } catch (error) {
    console.error("[v0] HTML parsing error:", error)
  }

  return articles
}

// Scrape articles from a source
export async function scrapeSource(sourceUrl: string, config: ScrapeConfig): Promise<ScrapeResult> {
  const startTime = Date.now()

  try {
    const response = await fetch(sourceUrl, {
      headers: {
        "User-Agent": "LinkedPrime News Aggregator Bot/1.0 (+https://news.linkedprime.com)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      signal: AbortSignal.timeout(30000), // 30 second timeout
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    const articles = parseHTML(html, config, sourceUrl)

    return {
      success: true,
      articles,
      duration_ms: Date.now() - startTime,
    }
  } catch (error) {
    console.error("[v0] Scraping error:", error)
    return {
      success: false,
      articles: [],
      error: error instanceof Error ? error.message : "Unknown error",
      duration_ms: Date.now() - startTime,
    }
  }
}

// Calculate similarity between two texts (Jaccard similarity)
export function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/))
  const words2 = new Set(text2.toLowerCase().split(/\s+/))

  const intersection = new Set([...words1].filter((x) => words2.has(x)))
  const union = new Set([...words1, ...words2])

  return union.size > 0 ? (intersection.size / union.size) * 100 : 0
}

// Check if article is duplicate
export function isDuplicate(newArticle: ScrapedArticle, existingArticles: ScrapedArticle[], threshold = 80): boolean {
  for (const existing of existingArticles) {
    const similarity = calculateSimilarity(newArticle.title, existing.title)
    if (similarity >= threshold) {
      return true
    }
  }
  return false
}
