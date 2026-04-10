"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { OTPButton } from "@/components/otp-button"
import { notifications } from "@/lib/notifications"
import { useCreateJoinRequestMutation } from "@/lib/api"
import { getErrorMessage } from "@/lib/api/rtk-error"
import { toast } from "sonner"

export default function JoinOrganizationPage() {
  const params = useParams()
  const orgId = typeof params.id === "string" ? params.id : params.id?.[0] ?? ""
  const [message, setMessage] = useState("")
  const [createJoinRequest, { isLoading: isSending }] = useCreateJoinRequestMutation()

  return (
    <AppLayout title="Request access" backToHome>
      <div className="w-full max-w-md mx-auto space-y-4">
        <form
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault()
            try {
              await createJoinRequest({ orgId, body: { message: message.trim() || undefined } }).unwrap()
              setMessage("")
              notifications.joinRequestSent()
            } catch (error) {
              toast.error(getErrorMessage(error) ?? "Failed to send request")
            }
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
