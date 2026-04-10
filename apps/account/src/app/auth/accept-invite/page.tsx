"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthShell } from "@/components/auth-shell"
import { OTPButton } from "@/components/otp-button"
import { useAcceptInviteMutation } from "@/lib/api"
import { getErrorMessage } from "@/lib/api/rtk-error"
import { toast } from "sonner"

function AcceptInviteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState(searchParams.get("invite") ?? "")
  const [acceptInvite, { isLoading }] = useAcceptInviteMutation()

  const backRoute = token
    ? `/auth/login?invite=${encodeURIComponent(token)}`
    : "/auth/login"

  return (
    <AuthShell
      title="Accept invite"
      showBack={true}
      onBack={() => router.push(backRoute)}
    >
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault()
          if (!token.trim()) return
          try {
            await acceptInvite({ token }).unwrap()
            router.push("/home?toast=auth.invite.accepted")
          } catch (error) {
            const message = getErrorMessage(error) ?? "Failed to accept invite"
            toast.error(message)
          }
        }}
      >
        <label className="block text-sm font-medium text-foreground">
          <span className="sr-only">Invite token</span>
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Invite token"
            className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition shadow-[0_1px_2px_0_hsl(var(--foreground)/0.08)] focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_10px_24px_-18px_hsl(var(--primary)/0.6)]"
            required
          />
        </label>
        <OTPButton isLoading={isLoading} text="Accept invite" />
      </form>
    </AuthShell>
  )
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={null}>
      <AcceptInviteContent />
    </Suspense>
  )
}
