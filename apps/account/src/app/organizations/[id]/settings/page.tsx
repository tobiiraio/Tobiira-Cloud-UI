"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { OTPButton } from "@/components/otp-button"
import { ErrorState } from "@/components/error-state"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation,
  useGetOrganizationSettingsQuery,
  useUpdateOrganizationSettingsMutation,
} from "@/lib/api"
import { getErrorMessage } from "@/lib/api/rtk-error"

export default function OrganizationSettingsPage() {
  const params = useParams()
  const orgId = typeof params.id === "string" ? params.id : params.id?.[0] ?? ""

  const { data: org, isLoading: orgLoading, isError: orgError } = useGetOrganizationByIdQuery(orgId)
  const { data: settings, isLoading: settingsLoading, isError: settingsError } = useGetOrganizationSettingsQuery(orgId)

  const [updateOrganization, { isLoading: savingOrg }] = useUpdateOrganizationMutation()
  const [updateSettings, { isLoading: savingSettings }] = useUpdateOrganizationSettingsMutation()

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [timezone, setTimezone] = useState("")
  const [currency, setCurrency] = useState("")
  const [locale, setLocale] = useState("")
  const [verticalConfig, setVerticalConfig] = useState("")

  useEffect(() => {
    if (org) {
      setName(org.name)
      setAddress(org.address ?? "")
    }
  }, [org])

  useEffect(() => {
    if (settings) {
      setTimezone(settings.timezone)
      setCurrency(settings.currency)
      setLocale(settings.locale)
      setVerticalConfig(JSON.stringify(settings.vertical, null, 2))
    }
  }, [settings])

  const isLoading = orgLoading || settingsLoading
  const isError = orgError || settingsError
  const isSaving = savingOrg || savingSettings

  if (isLoading) {
    return (
      <AppLayout title="Organization settings" backToHome>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AppLayout>
    )
  }

  if (isError) {
    return (
      <AppLayout title="Organization settings" backToHome>
        <div className="py-12">
          <ErrorState title="Settings unavailable" description="Try again later." />
        </div>
      </AppLayout>
    )
  }

  const handleSave = async (event: React.FormEvent | React.MouseEvent) => {
    event.preventDefault()
    let vertical: Record<string, unknown> | undefined
    try {
      vertical = JSON.parse(verticalConfig)
    } catch {
      toast.error("Vertical config is not valid JSON")
      return
    }

    try {
      await Promise.all([
        updateOrganization({ id: orgId, patch: { name, address: address || undefined } }).unwrap(),
        updateSettings({ id: orgId, patch: { timezone, currency, locale, vertical } }).unwrap(),
      ])
      toast.success("Settings saved")
    } catch (error) {
      toast.error(getErrorMessage(error) ?? "Failed to save settings")
    }
  }

  return (
    <AppLayout title="Organization settings" backToHome>
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
            <textarea
              value={verticalConfig}
              onChange={(event) => setVerticalConfig(event.target.value)}
              className="min-h-[180px] w-full rounded-2xl border border-input/70 bg-background px-4 py-3 text-sm font-mono text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </details>

        <OTPButton isLoading={isSaving} text="Save changes" onClick={handleSave} />
      </div>
    </AppLayout>
  )
}
