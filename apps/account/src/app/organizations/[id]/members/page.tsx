"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { notifications } from "@/lib/notifications"
import { UserPlus } from "lucide-react"
import { EmptyState } from "@/components/empty-state"
import { ErrorState } from "@/components/error-state"
import { useGetMembersQuery, useGetOrganizationQuery, useRemoveMemberMutation, useUpdateMemberRoleMutation } from "@/lib/api"
import { getErrorMessage } from "@/lib/api/rtk-error"
import { toast } from "sonner"

export default function MembersPage() {
  const params = useParams()
  const orgId = typeof params.id === "string" ? params.id : params.id?.[0] ?? "org"
  const { data: members = [], isLoading, isError } = useGetMembersQuery(orgId)
  const { data: organization } = useGetOrganizationQuery(orgId)
  const [updateMemberRole] = useUpdateMemberRoleMutation()
  const [removeMember] = useRemoveMemberMutation()
  const isOwner = organization?.role === "owner"

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
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {isError && <ErrorState title="Members unavailable" description="Try again later." />}
        {!isLoading && !isError && members.length === 0 ? (
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
          members.map((member) => (
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
              {isOwner && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <select
                    defaultValue={member.role}
                    className="rounded-full border border-input bg-background px-3 py-1.5 text-sm text-foreground outline-none"
                    onChange={async (e) => {
                      const role = e.target.value as "owner" | "operator" | "occupant"
                      try {
                        await updateMemberRole({ orgId, userId: member.id, patch: { role } }).unwrap()
                        notifications.memberRoleUpdated()
                      } catch (error) {
                        toast.error(getErrorMessage(error) ?? "Failed to update role")
                      }
                    }}
                  >
                    <option value="owner">Owner</option>
                    <option value="operator">Operator</option>
                    <option value="occupant">Occupant</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="pill"
                    className="h-9 px-4 text-red-400 hover:text-red-500"
                    onClick={async () => {
                      try {
                        await removeMember({ orgId, userId: member.id }).unwrap()
                        notifications.memberRemoved()
                      } catch (error) {
                        toast.error(getErrorMessage(error) ?? "Failed to remove member")
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </AppLayout>
  )
}
