import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-serif font-semibold tracking-tight">LinkedPrime</span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Latest
            </Link>
            <Link
              href="/category/technology"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Technology
            </Link>
            <Link
              href="/category/business"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Business
            </Link>
            <Link
              href="/category/sports"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Sports
            </Link>
            <Link
              href="/category/science"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Science
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
