"use client"

import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { notifications } from "@/lib/notifications"
import { EmptyState } from "@/components/empty-state"
import { ErrorState } from "@/components/error-state"
import { useGetJoinRequestsQuery, useResolveJoinRequestMutation } from "@/lib/api"
import { getErrorMessage } from "@/lib/api/rtk-error"
import { toast } from "sonner"

export default function JoinRequestsPage() {
  const params = useParams()
  const orgId = typeof params.id === "string" ? params.id : params.id?.[0] ?? "org"
  const { data: requests = [], isLoading, isError } = useGetJoinRequestsQuery(orgId)
  const [resolveJoinRequest] = useResolveJoinRequestMutation()

  return (
    <AppLayout
      title="Join requests"
      backToHome
    >
      <div className="space-y-4">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {isError && <ErrorState title="Requests unavailable" description="Try again later." />}
        {!isLoading && !isError && requests.length === 0 ? (
          <EmptyState title="No requests" description="Nothing to review." />
        ) : (
          requests.map((request) => (
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
                  onClick={async () => {
                    try {
                      await resolveJoinRequest({ orgId, requestId: request.id, body: { status: "approved" } }).unwrap()
                      notifications.joinRequestResolved()
                    } catch (error) {
                      toast.error(getErrorMessage(error) ?? "Failed to approve request")
                    }
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="ghost"
                  size="pill"
                  className="h-9 px-4 text-red-400 hover:text-red-500"
                  onClick={async () => {
                    try {
                      await resolveJoinRequest({ orgId, requestId: request.id, body: { status: "rejected" } }).unwrap()
                      notifications.joinRequestResolved()
                    } catch (error) {
                      toast.error(getErrorMessage(error) ?? "Failed to reject request")
                    }
                  }}
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
