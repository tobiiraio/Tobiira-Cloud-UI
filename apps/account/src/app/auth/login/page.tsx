"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { OTPButton } from "@/components/otp-button"
import { AuthShell } from "@/components/auth-shell"
import { notifications } from "@/lib/notifications"
import { useRequestOtpMutation } from "@/lib/api"
import { getErrorMessage } from "@/lib/api/rtk-error"
import { toast } from "sonner"

function LoginContent() {
  const [email, setEmail] = useState("")
  const [requestOtp, { isLoading }] = useRequestOtpMutation()
  const router = useRouter()
  const searchParams = useSearchParams()

  const inviteToken = searchParams.get("invite") ?? ""
  const isNew = searchParams.get("new") === "1"
  const nextParams = new URLSearchParams()
  if (inviteToken) nextParams.set("invite", inviteToken)
  if (isNew) nextParams.set("new", "1")

  const title = isNew ? "Get started" : "Sign in"
  const submitLabel = isNew ? "Continue" : "Send code"

  return (
    <AuthShell
      title={title}
    >
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault()
          try {
            await requestOtp({ email }).unwrap()
            notifications.authOtpSent()
            const nextQuery = new URLSearchParams(nextParams)
            nextQuery.set("email", email)
            router.push(`/auth/verify?${nextQuery.toString()}`)
          } catch (error) {
            const message = getErrorMessage(error) ?? "Failed to send code"
            toast.error(message)
          }
        }}
      >
        <label className="block text-sm font-medium text-foreground">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition shadow-[0_1px_2px_0_hsl(var(--foreground)/0.08)] focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_10px_24px_-18px_hsl(var(--primary)/0.6)]"
            required
          />
        </label>
        <OTPButton isLoading={isLoading} text={submitLabel} />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {isNew ? (
            <Link href="/auth/login" className="hover:text-foreground transition-colors">
              Have an account? Sign in
            </Link>
          ) : (
            <Link href="/auth/login?new=1" className="hover:text-foreground transition-colors">
              New here? Start now
            </Link>
          )}
          <Link href="/auth/accept-invite" className="hover:text-foreground transition-colors">
            Have an invite?
          </Link>
        </div>
      </form>
    </AuthShell>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  )
}
