// API route to scrape all active sources
import { NextResponse } from "next/server"
import { scrapeSource } from "@/lib/scraper"

export async function POST() {
  try {
    // In production, fetch all active sources from database
    // const sources = await getSources(true)

    const results = {
      total_sources: 0,
      successful: 0,
      failed: 0,
      articles_found: 0,
      articles_new: 0,
      articles_duplicate: 0,
      duration_ms: 0,
    }

    const startTime = Date.now()

    // Mock sources for demonstration
    const mockSources = [
      {
        id: 1,
        name: "TechCrunch",
        url: "https://techcrunch.com",
        scrape_config: {
          article_selector: "article",
          title_selector: "h2",
          link_selector: "a",
        },
      },
      {
        id: 2,
        name: "The Verge",
        url: "https://www.theverge.com",
        scrape_config: {
          article_selector: "article",
          title_selector: "h2",
          link_selector: "a",
        },
      },
    ]

    results.total_sources = mockSources.length

    for (const source of mockSources) {
      const result = await scrapeSource(source.url, source.scrape_config)

      if (result.success) {
        results.successful++
        results.articles_found += result.articles.length

        // In production, check against database for duplicates
        // For now, just count all as new
        results.articles_new += result.articles.length
      } else {
        results.failed++
      }

      // Rate limiting: wait 2 seconds between sources
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    results.duration_ms = Date.now() - startTime

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error("[v0] Scrape all API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
