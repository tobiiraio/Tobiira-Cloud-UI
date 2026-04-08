"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthShell } from "@/components/auth-shell"
import { OTPButton } from "@/components/otp-button"
import { notifications } from "@/lib/notifications"

export default function AcceptInvitePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState(searchParams.get("invite") ?? "")

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
        onSubmit={(event) => {
          event.preventDefault()
          if (!token.trim()) return
          setIsLoading(true)
          // Simulate API call
          setTimeout(() => {
            setIsLoading(false)
            router.push("/home?toast=auth.invite.accepted")
          }, 2000)
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
