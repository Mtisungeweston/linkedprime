import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Mail } from "lucide-react"

export default function SubscribersPage() {
  // Mock data - in production, fetch from database
  const subscribers = [
    {
      id: 1,
      email: "john.doe@example.com",
      subscribedAt: "2025-01-15 10:30:00",
      verified: true,
      active: true,
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      subscribedAt: "2025-01-14 15:45:00",
      verified: true,
      active: true,
    },
    {
      id: 3,
      email: "bob.wilson@example.com",
      subscribedAt: "2025-01-13 09:20:00",
      verified: false,
      active: true,
    },
    {
      id: 4,
      email: "alice.johnson@example.com",
      subscribedAt: "2025-01-12 14:10:00",
      verified: true,
      active: false,
    },
    {
      id: 5,
      email: "charlie.brown@example.com",
      subscribedAt: "2025-01-11 11:55:00",
      verified: true,
      active: true,
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Subscribers</h1>
        <p className="text-muted-foreground">Manage your newsletter subscribers</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Subscribers</CardTitle>
              <CardDescription>Total: {subscribers.length} subscribers</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Send Newsletter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search subscribers..." className="pl-10" />
            </div>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left text-sm font-medium">Email</th>
                  <th className="p-3 text-left text-sm font-medium">Subscribed</th>
                  <th className="p-3 text-left text-sm font-medium">Status</th>
                  <th className="p-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b last:border-0">
                    <td className="p-3 text-sm">{subscriber.email}</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {subscriber.verified ? (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Unverified
                          </Badge>
                        )}
                        {subscriber.active ? (
                          <Badge className="text-xs bg-green-600">Active</Badge>
                        ) : (
                          <Badge variant="destructive" className="text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
