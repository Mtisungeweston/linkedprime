// Cron job utilities for automated scraping
export interface CronConfig {
  enabled: boolean
  interval_minutes: number
  max_concurrent: number
}

export async function runScheduledScrape() {
  try {
    console.log("[v0] Starting scheduled scrape...")

    const response = await fetch("/api/scrape/all", {
      method: "POST",
    })

    const result = await response.json()

    console.log("[v0] Scheduled scrape completed:", result)

    return result
  } catch (error) {
    console.error("[v0] Scheduled scrape error:", error)
    throw error
  }
}

// Setup cron job (would be configured in deployment)
export function setupCronJob(config: CronConfig) {
  if (!config.enabled) {
    console.log("[v0] Cron jobs disabled")
    return
  }

  console.log(`[v0] Cron job configured: every ${config.interval_minutes} minutes`)

  // In production, this would be handled by Vercel Cron Jobs or similar
  // Example vercel.json configuration:
  // {
  //   "crons": [{
  //     "path": "/api/cron/scrape",
  //     "schedule": "0 */30 * * *"
  //   }]
  // }
}
