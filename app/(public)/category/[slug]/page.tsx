import { ArticleCard } from "@/components/article-card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  return {
    title: `${categoryName} News | LinkedPrime`,
    description: `Latest ${categoryName.toLowerCase()} news and articles from trusted sources. Stay updated with curated industry news.`,
    openGraph: {
      title: `${categoryName} News`,
      description: `Latest ${categoryName.toLowerCase()} news and articles from trusted sources.`,
      type: "website",
    },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  const articles = [
    {
      id: 1,
      title: "AI Breakthrough: New Model Achieves Human-Level Performance",
      excerpt:
        "Researchers announce a significant milestone in artificial intelligence development with a new model that matches human performance.",
      slug: "ai-breakthrough-new-model-achieves-human-level-performance",
      category: categoryName,
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
      category: categoryName,
      source: "The Verge",
      publishedAt: "5 hours ago",
      imageUrl: "/privacy-security.jpg",
    },
    {
      id: 3,
      title: "Quantum Computing Reaches New Milestone",
      excerpt:
        "Researchers achieve record-breaking quantum coherence times, bringing practical quantum computers closer to reality.",
      slug: "quantum-computing-reaches-new-milestone",
      category: categoryName,
      source: "MIT Technology Review",
      publishedAt: "1 day ago",
      imageUrl: "/quantum-computing-visualization.png",
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} News`,
    description: `Latest ${categoryName.toLowerCase()} news and articles`,
    url: `https://news.linkedprime.com/category/${params.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Badge className="mb-4">{categoryName}</Badge>
          <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">{categoryName} News</h1>
          <p className="text-lg text-muted-foreground">Latest articles in {categoryName.toLowerCase()}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </>
  )
}
