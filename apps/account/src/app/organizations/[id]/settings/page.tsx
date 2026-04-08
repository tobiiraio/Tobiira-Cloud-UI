"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { OTPButton } from "@/components/otp-button"
import { notifications } from "@/lib/notifications"

export default function OrganizationSettingsPage() {
  const [name, setName] = useState("Acme Corporation")
  const [address, setAddress] = useState("")
  const [timezone, setTimezone] = useState("Africa/Kampala")
  const [currency, setCurrency] = useState("UGX")
  const [locale, setLocale] = useState("en")
  const [propertyTypes, setPropertyTypes] = useState("residential")
  const [rentDay, setRentDay] = useState("1")
  const [verticalConfig, setVerticalConfig] = useState("{\n  \"persta\": {\n    \"propertyTypes\": [\"residential\"],\n    \"rentCollectionDay\": 1\n  }\n}")
  const [isSaving, setIsSaving] = useState(false)

  return (
    <AppLayout
      title="Organization settings"
      backToHome
    >
      <div className="space-y-4">
        <details className="rounded-xl border border-border/40 bg-card/95 p-5 shadow-sm" open>
          <summary className="cursor-pointer list-none">
            <div className="flex items-center justify-between text-sm font-medium text-foreground">
              <span>Details</span>
              <span className="text-xs text-muted-foreground">View</span>
            </div>
          </summary>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-foreground">
              <span className="sr-only">Organization name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Organization name"
                className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block text-sm font-medium text-foreground">
              <span className="sr-only">Address</span>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Address (optional)"
                className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>
        </details>

        <details className="rounded-xl border border-border/40 bg-card/95 p-5 shadow-sm">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center justify-between text-sm font-medium text-foreground">
              <span>Regional</span>
              <span className="text-xs text-muted-foreground">View</span>
            </div>
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium text-foreground">
              <span className="sr-only">Timezone</span>
              <input
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                placeholder="Timezone"
                className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block text-sm font-medium text-foreground">
              <span className="sr-only">Currency</span>
              <input
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                placeholder="Currency"
                className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block text-sm font-medium text-foreground">
              <span className="sr-only">Locale</span>
              <input
                value={locale}
                onChange={(event) => setLocale(event.target.value)}
                placeholder="Locale"
                className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>
        </details>

        <details className="rounded-xl border border-border/40 bg-card/95 p-5 shadow-sm">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center justify-between text-sm font-medium text-foreground">
              <span>Vertical</span>
              <span className="text-xs text-muted-foreground">View</span>
            </div>
          </summary>
          <div className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-foreground">
                <span className="text-xs text-muted-foreground">Property types</span>
                <input
                  value={propertyTypes}
                  onChange={(event) => {
                    const nextValue = event.target.value
                    setPropertyTypes(nextValue)
                    const values = nextValue.split(",").map((item) => item.trim()).filter(Boolean)
                    const rentValue = Number.parseInt(rentDay, 10) || 1
                    setVerticalConfig(
                      JSON.stringify({ persta: { propertyTypes: values, rentCollectionDay: rentValue } }, null, 2)
                    )
                  }}
                  placeholder="residential, commercial"
                  className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block text-sm font-medium text-foreground">
                <span className="text-xs text-muted-foreground">Rent day</span>
                <input
                  value={rentDay}
                  onChange={(event) => {
                    const nextValue = event.target.value
                    setRentDay(nextValue)
                    const values = propertyTypes.split(",").map((item) => item.trim()).filter(Boolean)
                    const rentValue = Number.parseInt(nextValue, 10) || 1
                    setVerticalConfig(
                      JSON.stringify({ persta: { propertyTypes: values, rentCollectionDay: rentValue } }, null, 2)
                    )
                  }}
                  placeholder="1"
                  className="mt-2 w-full rounded-xl border border-input/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>
            <details className="mt-4 rounded-xl border border-border/40 bg-background/80 p-4">
              <summary className="cursor-pointer list-none text-sm text-muted-foreground">
                Advanced JSON
              </summary>
              <textarea
                value={verticalConfig}
                onChange={(event) => setVerticalConfig(event.target.value)}
                className="mt-3 min-h-[180px] w-full rounded-2xl border border-input/70 bg-background px-4 py-3 text-sm font-mono text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </details>
          </div>
        </details>

        <OTPButton
          isLoading={isSaving}
          text="Save changes"
          onClick={(event) => {
            event.preventDefault()
            setIsSaving(true)
            setTimeout(() => {
              setIsSaving(false)
              notifications.orgSettingsUpdated()
            }, 1200)
          }}
        />
      </div>
    </AppLayout>
  )
}
