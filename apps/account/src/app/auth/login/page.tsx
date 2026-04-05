"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OTPButton } from "@/components/otp-button"
import { AuthShell } from "@/components/auth-shell"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  return (
    <AuthShell
      title="Sign in"
      description="Enter your email and we’ll send a one-time code to continue."
      footer={
        <p>
          Have an invite token? <Link href="/auth/accept-invite" className="text-primary underline">Accept invite</Link>
        </p>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          setIsLoading(true)
          // Simulate API call
          setTimeout(() => {
            setIsLoading(false)
            router.push("/auth/verify")
          }, 2000)
        }}
      >
        <label className="block text-sm font-medium text-foreground">
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
        </label>
        <OTPButton isLoading={isLoading} text="Send code" />
      </form>
    </AuthShell>
  )
}
