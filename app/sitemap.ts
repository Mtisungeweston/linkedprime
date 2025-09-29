import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  // In production, fetch all articles and categories from database
  const baseUrl = "https://news.linkedprime.com"

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/category/technology`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category/business`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category/science`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    },
  ]

  // Mock article URLs (in production, fetch from database)
  const articleUrls = [
    "ai-breakthrough-new-model-achieves-human-level-performance",
    "tech-giants-announce-new-privacy-standards",
    "global-markets-rally-on-economic-recovery-signs",
    "scientists-discover-new-treatment-for-rare-disease",
    "quantum-computing-reaches-new-milestone",
  ].map((slug) => ({
    url: `${baseUrl}/article/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...articleUrls]
}
