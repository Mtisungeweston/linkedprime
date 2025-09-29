"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your news aggregator</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scraping Configuration</CardTitle>
            <CardDescription>Global settings for article scraping</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-approve articles</Label>
                <p className="text-sm text-muted-foreground">Automatically publish scraped articles</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable deduplication</Label>
                <p className="text-sm text-muted-foreground">Check for duplicate content</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="similarity">Similarity threshold (%)</Label>
              <Input id="similarity" type="number" defaultValue="80" />
              <p className="text-sm text-muted-foreground">Articles above this similarity are marked as duplicates</p>
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="rate-limit">Rate limit (requests/minute)</Label>
              <Input id="rate-limit" type="number" defaultValue="10" />
              <p className="text-sm text-muted-foreground">Maximum requests per minute per source</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Search engine optimization configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" defaultValue="LinkedPrime News" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="site-description">Site Description</Label>
              <Input id="site-description" defaultValue="Your trusted source for curated industry news" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Generate sitemaps</Label>
                <p className="text-sm text-muted-foreground">Automatically create XML sitemaps</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>JSON-LD schema</Label>
                <p className="text-sm text-muted-foreground">Include structured data markup</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automation</CardTitle>
            <CardDescription>Scheduled tasks and cron jobs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable automated scraping</Label>
                <p className="text-sm text-muted-foreground">Run scraping jobs on schedule</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="cron-schedule">Cron Schedule</Label>
              <Input id="cron-schedule" defaultValue="0 */30 * * *" className="font-mono" />
              <p className="text-sm text-muted-foreground">Cron expression for scraping schedule</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg">Save Settings</Button>
        </div>
      </div>
    </div>
  )
}
