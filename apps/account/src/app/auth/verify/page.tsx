"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthShell } from "@/components/auth-shell"
import { OTPButton } from "@/components/otp-button"
import { OTPInput } from "@/components/otp-input"

export default function VerifyPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [verified, setVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleBack = () => {
    router.push("/auth/login")
  }

  return (
    <AuthShell
      title="Verify code"
      description="Enter the one-time code sent to your email."
      footer={
        <p>
          Didn’t receive a code? <Link href="/auth/login" className="text-primary underline">Send again</Link>
        </p>
      }
      showBack={true}
      onBack={handleBack}
    >
      {verified ? (
        <div className="rounded-lg border border-input bg-background/80 p-5 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Verification complete</p>
          <p className="mt-2">Your sign-in is confirmed. You can now continue to the account shell.</p>
          <div className="mt-4">
            <Link href="/">
              <OTPButton text="Go to account" />
            </Link>
          </div>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            if (code.length === 6) {
              setIsLoading(true)
              // Simulate API call
              setTimeout(() => {
                setIsLoading(false)
                setVerified(true)
              }, 2000)
            }
          }}
        >
          <label className="block text-sm font-medium text-foreground">
            One-time code
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
      )}
    </AuthShell>
  )
}
