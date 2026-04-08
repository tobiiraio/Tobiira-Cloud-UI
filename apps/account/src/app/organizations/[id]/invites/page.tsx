"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { OTPButton } from "@/components/otp-button"
import { Button } from "@/components/ui/button"
import { notifications } from "@/lib/notifications"

const mockInvites = [
  { id: "inv-1", email: "sam@work.com", role: "operator" },
  { id: "inv-2", email: "zoe@work.com", role: "occupant" },
]

export default function InvitesPage() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("operator")
  const [isSending, setIsSending] = useState(false)

  return (
    <AppLayout title="Invites" backToHome>
      <div className="space-y-6">
        <form
          className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            if (!email.trim()) return
            setIsSending(true)
            setTimeout(() => {
              setIsSending(false)
              setEmail("")
              notifications.memberInvited()
            }, 1200)
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
            <input
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="Role"
              className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <OTPButton isLoading={isSending} text="Send invite" />
        </form>

        <div className="space-y-3">
          {mockInvites.length === 0 ? (
            <div className="rounded-xl border border-border/40 bg-card/95 p-6 text-center shadow-sm">
              <p className="text-sm text-muted-foreground">No invites yet.</p>
            </div>
          ) : (
            mockInvites.map((invite) => (
              <div
                key={invite.id}
                className="rounded-xl border border-border/40 bg-card/95 p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{invite.email}</p>
                    <p className="text-sm text-muted-foreground capitalize">{invite.role}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="pill"
                    className="h-9 px-4 text-red-400 hover:text-red-500"
                    onClick={() => notifications.inviteRevoked()}
                  >
                    Revoke
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  )
}
