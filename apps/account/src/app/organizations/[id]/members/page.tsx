"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { notifications } from "@/lib/notifications"
import { UserPlus } from "lucide-react"
import { EmptyState } from "@/components/empty-state"

const mockMembers = [
  { id: "m-1", name: "James Cooper", email: "jamescooper@work.com", role: "owner" },
  { id: "m-2", name: "Leah Morgan", email: "leah@work.com", role: "operator" },
  { id: "m-3", name: "Daniel Reed", email: "daniel@work.com", role: "occupant" },
]

export default function MembersPage() {
  const params = useParams()
  const orgId = typeof params.id === "string" ? params.id : params.id?.[0] ?? "org"

  return (
    <AppLayout
      title="Members"
      backToHome
    >
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground">
          <Link href="/organizations" className="hover:text-foreground transition-colors">Organizations</Link>
          <span className="px-2">/</span>
          <Link href={`/organizations/${orgId}`} className="hover:text-foreground transition-colors">Organization</Link>
          <span className="px-2">/</span>
          <span className="text-foreground">Members</span>
        </p>
        {mockMembers.length === 0 ? (
          <EmptyState
            title="No members"
            description="Invite someone to get started."
            action={
              <Link href={`/organizations/${orgId}/invites`}>
                <Button size="pill">Invite member</Button>
              </Link>
            }
          />
        ) : (
          mockMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-xl border border-border/40 bg-card/95 p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
                <span className="rounded-full bg-muted/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {member.role}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="pill"
                  className="h-9 px-4"
                  onClick={() => notifications.memberRoleUpdated()}
                >
                  Change role
                </Button>
                <Button
                  variant="ghost"
                  size="pill"
                  className="h-9 px-4 text-red-400 hover:text-red-500"
                  onClick={() => notifications.memberRemoved()}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  )
}
