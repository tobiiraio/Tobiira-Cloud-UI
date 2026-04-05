"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppLayout } from "@/components/app-layout"

export default function NewOrganizationPage() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <AppLayout title="Set up your organization">
      <div className="w-full max-w-md mx-auto space-y-4">
        {!submitted ? (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <p className="text-sm text-muted-foreground">
              Create a new organization to manage teams and members.
            </p>
            <label className="block text-sm font-medium text-foreground">
              Organization name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Acme Corporation"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </label>
            <label className="block text-sm font-medium text-foreground">
              Address <span className="text-muted-foreground">(optional)</span>
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="123 Main St, Kampala"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <Button type="submit" className="w-full" size="lg">
              Continue
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-input bg-background/80 p-5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Organization created</p>
              <p className="mt-2">
                {name} is ready. You can now manage teams and members.
              </p>
            </div>
            <Link href="/organizations">
              <Button className="w-full" size="lg">
                Go to organizations
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
