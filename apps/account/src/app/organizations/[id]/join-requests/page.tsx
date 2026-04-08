"use client"

import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { notifications } from "@/lib/notifications"

const mockRequests = [
  { id: "jr-1", name: "Maya Clarke", email: "maya@work.com", message: "I would like to join." },
  { id: "jr-2", name: "Owen Grant", email: "owen@work.com", message: "Please approve access." },
]

export default function JoinRequestsPage() {
  const params = useParams()
  const orgId = typeof params.id === "string" ? params.id : params.id?.[0] ?? "org"

  return (
    <AppLayout
      title="Join requests"
      backToHome
    >
      <div className="space-y-4">
        {mockRequests.length === 0 ? (
          <div className="rounded-xl border border-border/40 bg-card/95 p-6 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">No requests.</p>
          </div>
        ) : (
          mockRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-xl border border-border/40 bg-card/95 p-4 shadow-sm"
            >
              <div className="space-y-2">
                <div>
                  <p className="font-medium">{request.name}</p>
                  <p className="text-sm text-muted-foreground">{request.email}</p>
                </div>
                <p className="text-xs text-muted-foreground">{request.message}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="pill"
                  className="h-9 px-4"
                  onClick={() => notifications.joinRequestResolved()}
                >
                  Approve
                </Button>
                <Button
                  variant="ghost"
                  size="pill"
                  className="h-9 px-4 text-red-400 hover:text-red-500"
                  onClick={() => notifications.joinRequestResolved()}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  )
}
