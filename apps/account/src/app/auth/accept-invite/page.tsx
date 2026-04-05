"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthShell } from "@/components/auth-shell"
import { OTPButton } from "@/components/otp-button"

export default function AcceptInvitePage() {
  const router = useRouter()
  const [accepted, setAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const orgName = "Acme Corporation" // Mock org name from invite token
  const role = "operator" // Mock role from invite token

  const handleBack = () => {
    router.push("/auth/login")
  }

  return (
    <AuthShell
      title="Accept invite"
      description="You've been invited to join an organization."
      showBack={true}
      onBack={handleBack}
    >
      {!accepted ? (
        <div className="space-y-4">
          <div className="rounded-lg border border-input bg-background/80 p-5 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Organization</p>
              <p className="font-medium text-foreground">{orgName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your role</p>
              <p className="font-medium text-foreground capitalize">{role}</p>
            </div>
          </div>
          <OTPButton 
            isLoading={isLoading} 
            text="Accept invite" 
            onClick={() => {
              setIsLoading(true)
              // Simulate API call
              setTimeout(() => {
                setIsLoading(false)
                setAccepted(true)
              }, 2000)
            }}
          />
          <div className="flex gap-2">
            <Link href="/auth/login" className="flex-1">
              <Button variant="secondary" className="w-full" size="lg">
                Back
              </Button>
            </Link>
            <Button variant="ghost" className="flex-1" size="lg">
              Not now
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-input bg-background/80 p-5 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Invite accepted</p>
            <p className="mt-2">You're now a member of {orgName}. Let's continue to your account.</p>
          </div>
          <Link href="/organizations">
            <OTPButton text="Go to account" />
          </Link>
        </div>
      )}
    </AuthShell>
  )
}
