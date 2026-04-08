"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthShell } from "@/components/auth-shell"
import { OTPButton } from "@/components/otp-button"
import { notifications } from "@/lib/notifications"

export default function CreateOrganizationPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleBack = () => {
    router.push("/auth/login?new=1")
  }

  return (
    <AuthShell
      title="Create organization"
      showBack={true}
      onBack={handleBack}
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (!name.trim()) return
          setIsLoading(true)
          // Simulate API call
          setTimeout(() => {
            setIsLoading(false)
            router.push("/home?toast=org.created")
          }, 2000)
        }}
      >
        <label className="block text-sm font-medium text-foreground">
          <span className="sr-only">Organization name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Organization name"
            className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition shadow-[0_1px_2px_0_hsl(var(--foreground)/0.08)] focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_10px_24px_-18px_hsl(var(--primary)/0.6)]"
            required
          />
        </label>
        <OTPButton isLoading={isLoading} text="Continue" />
      </form>
    </AuthShell>
  )
}
