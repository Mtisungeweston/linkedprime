// API routes for individual source management
import { type NextRequest, NextResponse } from "next/server"

// GET single source
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In production, fetch from database
    // const source = await getSourceById(id)

    const mockSource = {
      id: Number.parseInt(id),
      name: "TechCrunch",
      url: "https://techcrunch.com",
      base_domain: "techcrunch.com",
      scrape_config: {
        article_selector: "article.post-block",
        title_selector: "h2.post-block__title",
        link_selector: "a.post-block__title__link",
        excerpt_selector: "div.post-block__content",
        image_selector: "img.post-block__media__image",
      },
      is_active: true,
      fetch_frequency_minutes: 30,
      last_fetched_at: new Date().toISOString(),
      success_count: 145,
      error_count: 3,
    }

    return NextResponse.json({ source: mockSource })
  } catch (error) {
    console.error("[v0] Get source API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH update source
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const updates = await request.json()

    // In production, update in database
    // const updatedSource = await updateSource(id, updates)

    return NextResponse.json({
      source: {
        id: Number.parseInt(id),
        ...updates,
        updated_at: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("[v0] Update source API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE source
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In production, delete from database
    // await deleteSource(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Delete source API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
