"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthShell } from "@/components/auth-shell"
import { OTPButton } from "@/components/otp-button"
import { OTPInput } from "@/components/otp-input"
import { notifications } from "@/lib/notifications"

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const inviteToken = searchParams.get("invite") ?? ""
  const isNew = searchParams.get("new") === "1"
  const backParams = new URLSearchParams()
  if (inviteToken) backParams.set("invite", inviteToken)
  if (isNew) backParams.set("new", "1")
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
        onSubmit={(event) => {
          event.preventDefault()
          if (code.length === 6) {
            setIsLoading(true)
            // Simulate API call
            setTimeout(() => {
              setIsLoading(false)
              if (nextRoute === "/home") {
                router.push("/home?toast=auth.otp.verified")
              } else {
                notifications.authOtpVerified()
                router.push(nextRoute)
              }
            }, 2000)
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
