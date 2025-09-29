import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface ArticleListItemProps {
  title: string
  slug: string
  source: string
  publishedAt: string
  category?: string
}

export function ArticleListItem({ title, slug, source, publishedAt, category }: ArticleListItemProps) {
  return (
    <Link href={`/article/${slug}`} className="group block border-b py-6 transition-colors hover:bg-muted/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <time className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">{publishedAt}</time>
          <h3 className="mb-2 text-lg font-medium leading-tight text-balance group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{source}</span>
            {category && (
              <>
                <span>•</span>
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              </>
            )}
          </div>
        </div>
        <ArrowRight className="mt-2 h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </Link>
  )
}
