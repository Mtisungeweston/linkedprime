"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, X, Eye, Search } from "lucide-react"

export default function ArticlesPage() {
  const [filter, setFilter] = useState("all")

  const articles = [
    {
      id: 1,
      title: "AI Breakthrough: New Model Achieves Human-Level Performance",
      source: "TechCrunch",
      category: "Technology",
      status: "pending",
      date: "2 hours ago",
      image: "/ai-technology-concept.png",
    },
    {
      id: 2,
      title: "Tech Giants Announce New Privacy Standards",
      source: "The Verge",
      category: "Technology",
      status: "approved",
      date: "5 hours ago",
      image: "/privacy-security.jpg",
    },
    {
      id: 3,
      title: "Global Markets Rally on Economic Recovery Signs",
      source: "Bloomberg",
      category: "Business",
      status: "pending",
      date: "8 hours ago",
      image: "/stock-market-analysis.png",
    },
    {
      id: 4,
      title: "Scientists Discover New Treatment for Rare Disease",
      source: "Nature",
      category: "Science",
      status: "approved",
      date: "12 hours ago",
      image: "/medical-research-lab.png",
    },
  ]

  const filteredArticles = filter === "all" ? articles : articles.filter((a) => a.status === filter)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <p className="text-muted-foreground">Review and moderate scraped articles</p>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-9" />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Articles</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <Card key={article.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="h-24 w-36 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 text-lg font-semibold leading-tight">{article.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{article.source}</span>
                        <span>•</span>
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <Badge variant={article.status === "approved" ? "default" : "secondary"}>{article.status}</Badge>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    {article.status === "pending" && (
                      <>
                        <Button size="sm" variant="default">
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
