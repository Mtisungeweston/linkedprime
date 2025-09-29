import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { NewsletterSubscribe } from "@/components/newsletter-subscribe"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      {children}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <NewsletterSubscribe />
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-serif text-lg font-semibold">LinkedPrime</h3>
              <p className="text-sm text-muted-foreground">Your trusted source for curated industry news.</p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/category/technology" className="hover:text-foreground">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="/category/business" className="hover:text-foreground">
                    Business
                  </a>
                </li>
                <li>
                  <a href="/category/sports" className="hover:text-foreground">
                    Sports
                  </a>
                </li>
                <li>
                  <a href="/category/science" className="hover:text-foreground">
                    Science
                  </a>
                </li>
                <li>
                  <a href="/category/health" className="hover:text-foreground">
                    Health
                  </a>
                </li>
                <li>
                  <a href="/category/world" className="hover:text-foreground">
                    World
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/about" className="hover:text-foreground">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 LinkedPrime. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
