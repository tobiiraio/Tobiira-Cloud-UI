"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { OTPButton } from "@/components/otp-button"
import { notifications } from "@/lib/notifications"

export default function JoinOrganizationPage() {
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  return (
    <AppLayout title="Request access" backToHome>
      <div className="w-full max-w-md mx-auto space-y-4">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            setIsSending(true)
            setTimeout(() => {
              setIsSending(false)
              setMessage("")
              notifications.joinRequestSent()
            }, 1200)
          }}
        >
          <label className="block text-sm font-medium text-foreground">
            <span className="sr-only">Message</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell the team why you want to join (optional)"
              className="mt-2 min-h-[140px] w-full rounded-2xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <OTPButton isLoading={isSending} text="Send request" />
        </form>
      </div>
    </AppLayout>
  )
}
