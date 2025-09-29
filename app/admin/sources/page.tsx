"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, Pause, Trash2, Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SourcesPage() {
  const [sources] = useState([
    {
      id: 1,
      name: "TechCrunch",
      url: "https://techcrunch.com",
      isActive: true,
      frequency: 30,
      lastFetch: "2 minutes ago",
      successRate: 98.5,
    },
    {
      id: 2,
      name: "The Verge",
      url: "https://www.theverge.com",
      isActive: true,
      frequency: 30,
      lastFetch: "15 minutes ago",
      successRate: 96.2,
    },
    {
      id: 3,
      name: "Ars Technica",
      url: "https://arstechnica.com",
      isActive: false,
      frequency: 60,
      lastFetch: "2 hours ago",
      successRate: 87.3,
    },
  ])

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">News Sources</h1>
          <p className="text-muted-foreground">Manage your news sources and scraping configuration</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Source
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add News Source</DialogTitle>
              <DialogDescription>Configure a new source for article scraping</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Source Name</Label>
                <Input id="name" placeholder="TechCrunch" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" placeholder="https://techcrunch.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frequency">Fetch Frequency (minutes)</Label>
                <Input id="frequency" type="number" placeholder="30" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="config">Scrape Configuration (JSON)</Label>
                <Textarea
                  id="config"
                  placeholder='{"article_selector": "article", "title_selector": "h2"}'
                  className="font-mono text-sm"
                  rows={6}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Source</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {sources.map((source) => (
          <Card key={source.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {source.name}
                    <Badge variant={source.isActive ? "default" : "secondary"}>
                      {source.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{source.url}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    {source.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Fetch Frequency</p>
                  <p className="text-lg font-semibold">Every {source.frequency} min</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Fetched</p>
                  <p className="text-lg font-semibold">{source.lastFetch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-lg font-semibold">{source.successRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
