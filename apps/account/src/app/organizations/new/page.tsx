"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { OTPButton } from "@/components/otp-button"
import { useCreateOrganizationMutation } from "@/lib/api"
import { getErrorMessage } from "@/lib/api/rtk-error"
import { toast } from "sonner"

export default function NewOrganizationPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [showAddress, setShowAddress] = useState(false)
  const [createOrganization, { isLoading }] = useCreateOrganizationMutation()

  return (
    <AppLayout title="Create organization" backToHome>
      <div className="w-full max-w-md mx-auto space-y-4">
        <form
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault()
            if (!name.trim()) return
            try {
              await createOrganization({ name, address: address.trim() || undefined }).unwrap()
              router.push("/organizations?toast=org.created")
            } catch (error) {
              toast.error(getErrorMessage(error) ?? "Failed to create organization")
            }
          }}
        >
          <label className="block text-sm font-medium text-foreground">
            <span className="sr-only">Organization name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Organization name"
              className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition shadow-[0_1px_2px_0_hsl(var(--foreground)/0.08)] focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_10px_24px_-18px_hsl(var(--primary)/0.6)]"
              required
            />
          </label>

          {showAddress ? (
            <label className="block text-sm font-medium text-foreground">
              <span className="sr-only">Address</span>
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Address (optional)"
                className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition shadow-[0_1px_2px_0_hsl(var(--foreground)/0.08)] focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_10px_24px_-18px_hsl(var(--primary)/0.6)]"
              />
            </label>
          ) : (
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowAddress(true)}
            >
              Add address (optional)
            </button>
          )}

          <OTPButton isLoading={isLoading} text="Continue" />
        </form>
      </div>
    </AppLayout>
  )
}
