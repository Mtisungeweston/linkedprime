import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // In production, fetch article from database
  const article = {
    title: "AI Breakthrough: New Model Achieves Human-Level Performance",
    excerpt:
      "Researchers announce a significant milestone in artificial intelligence development with a new model that matches human performance across multiple benchmarks.",
    imageUrl: "/ai-technology-concept.png",
    author: "Sarah Johnson",
    publishedAt: "2025-01-15T10:00:00Z",
    source: "TechCrunch",
  }

  return {
    title: `${article.title} | LinkedPrime News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // In production, fetch article from database using params.slug
  const article = {
    title: "AI Breakthrough: New Model Achieves Human-Level Performance",
    excerpt:
      "Researchers announce a significant milestone in artificial intelligence development with a new model that matches human performance across multiple benchmarks.",
    content: `
      <p>In a groundbreaking development, researchers have unveiled a new AI model that demonstrates human-level performance across a wide range of cognitive tasks. This achievement marks a significant milestone in the field of artificial intelligence and opens up new possibilities for practical applications.</p>
      
      <p>The model, developed by a team of international researchers, has been tested on numerous benchmarks including language understanding, reasoning, and problem-solving tasks. In each category, it has matched or exceeded human performance, representing a major leap forward from previous AI systems.</p>
      
      <h2>Key Achievements</h2>
      
      <p>The new model demonstrates several key capabilities that set it apart from previous AI systems:</p>
      
      <ul>
        <li>Advanced natural language understanding and generation</li>
        <li>Complex reasoning and problem-solving abilities</li>
        <li>Contextual awareness and adaptive learning</li>
        <li>Multi-modal processing of text, images, and data</li>
      </ul>
      
      <h2>Implications for the Future</h2>
      
      <p>This breakthrough has significant implications for various industries, from healthcare and education to business and entertainment. Experts predict that this technology could revolutionize how we interact with computers and automate complex tasks.</p>
      
      <p>However, researchers also emphasize the importance of responsible development and deployment of such powerful AI systems, calling for continued focus on safety, ethics, and transparency.</p>
    `,
    category: "Technology",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com/example-article",
    author: "Sarah Johnson",
    publishedAt: "January 15, 2025",
    publishedAtISO: "2025-01-15T10:00:00Z",
    imageUrl: "/ai-technology-concept.png",
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl,
    datePublished: article.publishedAtISO,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "LinkedPrime News",
      logo: {
        "@type": "ImageObject",
        url: "https://news.linkedprime.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://news.linkedprime.com/article/${params.slug}`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <Button variant="ghost" size="sm" className="mb-6" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to articles
            </Link>
          </Button>

          <article>
            <header className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <Badge>{article.category}</Badge>
                <time dateTime={article.publishedAtISO} className="text-sm text-muted-foreground">
                  {article.publishedAt}
                </time>
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl text-balance">
                {article.title}
              </h1>
              <p className="mb-6 text-xl text-muted-foreground text-pretty">{article.excerpt}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium">{article.author}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{article.source}</span>
                <Button variant="ghost" size="sm" asChild>
                  <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    View original
                  </a>
                </Button>
              </div>
            </header>

            {article.imageUrl && (
              <div className="mb-8 overflow-hidden rounded-lg">
                <img src={article.imageUrl || "/placeholder.svg"} alt={article.title} className="w-full" />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          <footer className="mt-12 border-t pt-8">
            <p className="text-sm text-muted-foreground">
              This article was originally published on {article.source}. All rights belong to the original publisher.
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}
