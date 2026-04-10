"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthShell } from "@/components/auth-shell"
import { OTPButton } from "@/components/otp-button"
import { OTPInput } from "@/components/otp-input"
import { notifications } from "@/lib/notifications"
import { useVerifyOtpMutation } from "@/lib/api"
import { getErrorMessage } from "@/lib/api/rtk-error"
import { toast } from "sonner"

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [code, setCode] = useState("")
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation()

  const inviteToken = searchParams.get("invite") ?? ""
  const isNew = searchParams.get("new") === "1"
  const email = searchParams.get("email") ?? ""
  const backParams = new URLSearchParams()
  if (inviteToken) backParams.set("invite", inviteToken)
  if (isNew) backParams.set("new", "1")
  if (email) backParams.set("email", email)
  const backRoute = backParams.toString()
    ? `/auth/login?${backParams.toString()}`
    : "/auth/login"
  const nextRoute = inviteToken
    ? `/auth/accept-invite?invite=${encodeURIComponent(inviteToken)}`
    : isNew
      ? "/auth/create-organization"
      : "/home"

  const title = isNew ? "Verify email" : "Verify code"

  return (
    <AuthShell
      title={title}
      showBack={true}
      onBack={() => router.push(backRoute)}
    >
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault()
          if (code.length !== 6) return
          if (!email) {
            toast.error("Missing email address")
            return
          }
          try {
            await verifyOtp({ email, code }).unwrap()
            if (nextRoute === "/home") {
              router.push("/home?toast=auth.otp.verified")
            } else {
              notifications.authOtpVerified()
              router.push(nextRoute)
            }
          } catch (error) {
            const message = getErrorMessage(error) ?? "Failed to verify code"
            toast.error(message)
          }
        }}
      >
        <label className="block text-sm font-medium text-foreground">
          <span className="sr-only">One-time code</span>
          <div className="mt-4">
            <OTPInput
              value={code}
              onChange={setCode}
              length={6}
            />
          </div>
        </label>
        <OTPButton isLoading={isLoading} text="Verify" />
      </form>
    </AuthShell>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyContent />
    </Suspense>
  )
}
