import { ArticleCard } from "@/components/article-card"
import { ArticleListItem } from "@/components/article-list-item"
import { Button } from "@/components/ui/button"
import { generateOrganizationJsonLd, generateWebSiteJsonLd } from "@/lib/seo"
import { NewsletterSubscribe } from "@/components/newsletter-subscribe"

export default function HomePage() {
  const featuredArticles = [
    {
      id: 1,
      title: "AI Breakthrough: New Model Achieves Human-Level Performance",
      excerpt:
        "Researchers announce a significant milestone in artificial intelligence development with a new model that matches human performance across multiple benchmarks.",
      slug: "ai-breakthrough-new-model-achieves-human-level-performance",
      category: "Technology",
      source: "TechCrunch",
      publishedAt: "2 hours ago",
      imageUrl: "/ai-technology-concept.png",
    },
    {
      id: 2,
      title: "Tech Giants Announce New Privacy Standards",
      excerpt:
        "Major technology companies collaborate on industry-wide privacy standards aimed at protecting user data.",
      slug: "tech-giants-announce-new-privacy-standards",
      category: "Technology",
      source: "The Verge",
      publishedAt: "5 hours ago",
      imageUrl: "/privacy-security.jpg",
    },
    {
      id: 3,
      title: "Global Markets Rally on Economic Recovery Signs",
      excerpt: "Stock markets worldwide show strong gains as economic indicators point to sustained recovery.",
      slug: "global-markets-rally-on-economic-recovery-signs",
      category: "Business",
      source: "Bloomberg",
      publishedAt: "8 hours ago",
      imageUrl: "/stock-market-analysis.png",
    },
  ]

  const latestArticles = [
    {
      title: "Scientists Discover New Treatment for Rare Disease",
      slug: "scientists-discover-new-treatment-for-rare-disease",
      source: "Nature",
      publishedAt: "Jan 15 2025",
      category: "Science",
    },
    {
      title: "Quantum Computing Reaches New Milestone",
      slug: "quantum-computing-reaches-new-milestone",
      source: "MIT Technology Review",
      publishedAt: "Jan 14 2025",
      category: "Technology",
    },
    {
      title: "Renewable Energy Investment Hits Record High",
      slug: "renewable-energy-investment-hits-record-high",
      source: "Reuters",
      publishedAt: "Jan 14 2025",
      category: "Business",
    },
    {
      title: "New Study Reveals Impact of Sleep on Cognitive Function",
      slug: "new-study-reveals-impact-of-sleep-on-cognitive-function",
      source: "Science Daily",
      publishedAt: "Jan 13 2025",
      category: "Science",
    },
    {
      title: "Startup Raises $100M for Revolutionary Battery Technology",
      slug: "startup-raises-100m-for-revolutionary-battery-technology",
      source: "TechCrunch",
      publishedAt: "Jan 13 2025",
      category: "Technology",
    },
  ]

  const organizationJsonLd = generateOrganizationJsonLd()
  const websiteJsonLd = generateWebSiteJsonLd()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <div className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl text-balance">Featured Stories</h1>
            <p className="text-lg text-muted-foreground">The most important news from today</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <NewsletterSubscribe />
        </section>

        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Latest News</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="divide-y">
            {latestArticles.map((article, i) => (
              <ArticleListItem key={i} {...article} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
