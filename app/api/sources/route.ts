// API routes for source management
import { type NextRequest, NextResponse } from "next/server"

// GET all sources
export async function GET() {
  try {
    // In production, fetch from database
    // const sources = await getSources()

    const mockSources = [
      {
        id: 1,
        name: "TechCrunch",
        url: "https://techcrunch.com",
        base_domain: "techcrunch.com",
        is_active: true,
        fetch_frequency_minutes: 30,
        last_fetched_at: new Date().toISOString(),
        success_count: 145,
        error_count: 3,
      },
      {
        id: 2,
        name: "The Verge",
        url: "https://www.theverge.com",
        base_domain: "theverge.com",
        is_active: true,
        fetch_frequency_minutes: 30,
        success_count: 132,
        error_count: 1,
      },
      {
        id: 3,
        name: "Ars Technica",
        url: "https://arstechnica.com",
        base_domain: "arstechnica.com",
        is_active: false,
        fetch_frequency_minutes: 60,
        success_count: 89,
        error_count: 5,
      },
    ]

    return NextResponse.json({ sources: mockSources })
  } catch (error) {
    console.error("[v0] Sources API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST create new source
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, url, scrape_config, fetch_frequency_minutes } = body

    if (!name || !url || !scrape_config) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In production, insert into database
    // const newSource = await createSource({ name, url, scrape_config, fetch_frequency_minutes })

    const newSource = {
      id: Date.now(),
      name,
      url,
      base_domain: new URL(url).hostname,
      scrape_config,
      is_active: true,
      fetch_frequency_minutes: fetch_frequency_minutes || 60,
      success_count: 0,
      error_count: 0,
      created_at: new Date().toISOString(),
    }

    return NextResponse.json({ source: newSource }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create source API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
