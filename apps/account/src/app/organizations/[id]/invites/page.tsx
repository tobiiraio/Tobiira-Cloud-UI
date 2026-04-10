"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { OTPButton } from "@/components/otp-button"
import { Button } from "@/components/ui/button"
import { notifications } from "@/lib/notifications"
import { EmptyState } from "@/components/empty-state"
import { ErrorState } from "@/components/error-state"
import { useGetInvitesQuery, useGetOrganizationQuery, useInviteMemberMutation, useRevokeInviteMutation } from "@/lib/api"
import { getErrorMessage } from "@/lib/api/rtk-error"
import { toast } from "sonner"

export default function InvitesPage() {
  const params = useParams()
  const orgId = typeof params.id === "string" ? params.id : params.id?.[0] ?? "org"
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"owner" | "operator" | "occupant">("operator")
  const { data: invites = [], isLoading, isError } = useGetInvitesQuery(orgId)
  const { data: organization } = useGetOrganizationQuery(orgId)
  const [inviteMember, { isLoading: isSending }] = useInviteMemberMutation()
  const [revokeInvite] = useRevokeInviteMutation()
  const isOwner = organization?.role === "owner"

  return (
    <AppLayout title="Invites" backToHome>
      <div className="space-y-6">
        <form
          className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm space-y-4"
          onSubmit={async (event) => {
            event.preventDefault()
            if (!email.trim()) return
            try {
              await inviteMember({ orgId, body: { email, role } }).unwrap()
              setEmail("")
              notifications.memberInvited()
            } catch (error) {
              toast.error(getErrorMessage(error) ?? "Failed to send invite")
            }
          }}
        >
          <label className="block text-sm font-medium text-foreground">
            <span className="sr-only">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </label>
          <label className="block text-sm font-medium text-foreground">
            <span className="sr-only">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as typeof role)}
              className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="operator">Operator</option>
              <option value="occupant">Occupant</option>
              <option value="owner">Owner</option>
            </select>
          </label>
          <OTPButton isLoading={isSending} text="Send invite" />
        </form>

        <div className="space-y-3">
          {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {isError && <ErrorState title="Invites unavailable" description="Try again later." />}
          {!isLoading && !isError && invites.length === 0 ? (
            <EmptyState title="No invites" description="Send the first invite." />
          ) : (
            invites.map((invite) => (
              <div
                key={invite.id}
                className="rounded-xl border border-border/40 bg-card/95 p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{invite.email}</p>
                    <p className="text-sm text-muted-foreground capitalize">{invite.role}</p>
                  </div>
                  {isOwner && (
                    <Button
                      variant="ghost"
                      size="pill"
                      className="h-9 px-4 text-red-400 hover:text-red-500"
                      onClick={async () => {
                        try {
                          await revokeInvite({ orgId, inviteId: invite.id }).unwrap()
                          notifications.inviteRevoked()
                        } catch (error) {
                          toast.error(getErrorMessage(error) ?? "Failed to revoke invite")
                        }
                      }}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  )
}
