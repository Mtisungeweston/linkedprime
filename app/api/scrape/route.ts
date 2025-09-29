// API route for manual scraping trigger
import { type NextRequest, NextResponse } from "next/server"
import { scrapeSource, generateContentHash, generateSlug } from "@/lib/scraper"
import type { Source } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { sourceId } = await request.json()

    if (!sourceId) {
      return NextResponse.json({ error: "Source ID required" }, { status: 400 })
    }

    // In production, fetch source from database
    // const source = await getSourceById(sourceId)

    // Mock source for demonstration
    const mockSource: Source = {
      id: sourceId,
      name: "TechCrunch",
      url: "https://techcrunch.com",
      base_domain: "techcrunch.com",
      scrape_config: {
        article_selector: "article.post-block",
        title_selector: "h2.post-block__title",
        link_selector: "a.post-block__title__link",
      },
      is_active: true,
      fetch_frequency_minutes: 30,
      last_fetched_at: null,
      success_count: 0,
      error_count: 0,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = await scrapeSource(mockSource.url, mockSource.scrape_config)

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error,
          duration_ms: result.duration_ms,
        },
        { status: 500 },
      )
    }

    // Process articles (deduplication, hashing, etc.)
    const processedArticles = result.articles.map((article) => ({
      ...article,
      slug: generateSlug(article.title),
      content_hash: generateContentHash(article.title + article.url),
    }))

    return NextResponse.json({
      success: true,
      articles_found: result.articles.length,
      articles: processedArticles,
      duration_ms: result.duration_ms,
    })
  } catch (error) {
    console.error("[v0] Scrape API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
