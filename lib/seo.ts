// SEO utility functions

export interface ArticleSEO {
  title: string
  description: string
  url: string
  imageUrl: string
  publishedAt: string
  author: string
  category: string
}

export function generateArticleJsonLd(article: ArticleSEO) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: article.imageUrl,
    datePublished: article.publishedAt,
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
      "@id": article.url,
    },
    articleSection: article.category,
  }
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LinkedPrime News",
    url: "https://news.linkedprime.com",
    logo: "https://news.linkedprime.com/logo.png",
    description: "Your trusted source for curated industry news",
    sameAs: [
      "https://twitter.com/linkedprime",
      "https://linkedin.com/company/linkedprime",
      "https://facebook.com/linkedprime",
    ],
  }
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LinkedPrime News",
    url: "https://news.linkedprime.com",
    description: "Curated news aggregation platform delivering the latest stories from trusted sources",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://news.linkedprime.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
}
