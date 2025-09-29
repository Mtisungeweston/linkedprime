import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ArticleCardProps {
  title: string
  excerpt: string
  slug: string
  category: string
  source: string
  publishedAt: string
  imageUrl?: string
}

export function ArticleCard({ title, excerpt, slug, category, source, publishedAt, imageUrl }: ArticleCardProps) {
  return (
    <Link href={`/article/${slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        {imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <span className="text-xs text-muted-foreground">{source}</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold leading-tight text-balance group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2 text-pretty">{excerpt}</p>
          <time className="text-xs text-muted-foreground">{publishedAt}</time>
        </div>
      </Card>
    </Link>
  )
}
