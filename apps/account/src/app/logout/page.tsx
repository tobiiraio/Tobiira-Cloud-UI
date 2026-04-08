"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AppLayout } from "@/components/app-layout"
import { OTPButton } from "@/components/otp-button"

export default function LogoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppLayout title="Log out" backHref="/home" backLabel="Home">
      <div className="w-full max-w-md mx-auto space-y-4">
        <p className="text-xs text-muted-foreground">
          <Link href="/home" className="hover:text-foreground transition-colors">Home</Link>
          <span className="px-2">/</span>
          <span className="text-foreground">Log out</span>
        </p>
        <div className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">End session</p>
          <p className="mt-2 text-xl font-medium">Return to sign in</p>
        </div>
        {isLoading && (
          <p className="text-xs text-muted-foreground text-center">Logging out…</p>
        )}
        <OTPButton
          isLoading={isLoading}
          text="Log out"
          onClick={(event) => {
            event.preventDefault()
            setIsLoading(true)
            setTimeout(() => {
              setIsLoading(false)
              router.push("/auth/login?toast=auth.logged.out")
            }, 1200)
          }}
        />
      </div>
    </AppLayout>
  )
}
