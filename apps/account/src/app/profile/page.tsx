"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OTPButton } from "@/components/otp-button"
import { AppLayout } from "@/components/app-layout"
import { ErrorState } from "@/components/error-state"
import { useGetProfileQuery, useUpdateProfileMutation } from "@/lib/api"
import { getErrorMessage } from "@/lib/api/rtk-error"
import { toast } from "sonner"

type FormData = {
  firstName: string
  lastName: string
  avatarUrl: string
  dateOfBirth: string
  phone: string
}

function toForm(user: { firstName: string | null; lastName: string | null; avatarUrl: string | null; dateOfBirth: string; phone: string }): FormData {
  return {
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    avatarUrl: user.avatarUrl ?? "",
    dateOfBirth: user.dateOfBirth ?? "",
    phone: user.phone ?? "",
  }
}

function toPatch(form: FormData) {
  return {
    firstName: form.firstName || undefined,
    lastName: form.lastName || undefined,
    avatarUrl: form.avatarUrl || undefined,
    dateOfBirth: form.dateOfBirth || undefined,
    phone: form.phone || undefined,
  }
}

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useGetProfileQuery()
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation()
  const [formData, setFormData] = useState<FormData>({ firstName: "", lastName: "", avatarUrl: "", dateOfBirth: "", phone: "" })

  useEffect(() => {
    if (user) setFormData(toForm(user))
  }, [user])

  const handleSave = async () => {
    if (!user) return
    try {
      await updateProfile(toPatch(formData)).unwrap()
      toast.success("Profile updated")
    } catch (error) {
      toast.error(getErrorMessage(error) ?? "Failed to update profile")
    }
  }

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }))

  if (isLoading) {
    return (
      <AppLayout title="Profile">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AppLayout>
    )
  }

  if (isError || !user) {
    return (
      <AppLayout title="Profile">
        <div className="py-12">
          <ErrorState title="Profile unavailable" description="Try again later." />
        </div>
      </AppLayout>
    )
  }

  const hasChanges = JSON.stringify(toForm(user)) !== JSON.stringify(formData)

  const inputClass = "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"

  return (
    <AppLayout title="Edit your profile" backHref="/home" backLabel="Home">
      <div className="space-y-6">
        <div className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm">
          <p className="text-xs text-muted-foreground">
            <Link href="/home" className="hover:text-foreground transition-colors">Home</Link>
            <span className="px-2">/</span>
            <span className="text-foreground">Profile</span>
          </p>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">Profile</p>
            <h1 className="text-2xl font-medium">Edit profile</h1>
          </div>

          <div className="space-y-4">
            <details className="rounded-xl border border-border/40 bg-card/95 p-5 shadow-sm" open>
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between text-sm font-medium text-foreground">
                  <span>Basics</span>
                  <span className="text-xs text-muted-foreground">View</span>
                </div>
              </summary>
              <div className="mt-4 grid gap-4">
                <label className="block">
                  <span className="text-sm text-muted-foreground">First name</span>
                  <input type="text" value={formData.firstName} onChange={set("firstName")} placeholder="First name" className={inputClass} />
                </label>
                <label className="block">
                  <span className="text-sm text-muted-foreground">Last name</span>
                  <input type="text" value={formData.lastName} onChange={set("lastName")} placeholder="Last name" className={inputClass} />
                </label>
                <label className="block">
                  <span className="text-sm text-muted-foreground">Date of birth</span>
                  <input type="date" value={formData.dateOfBirth} onChange={set("dateOfBirth")} className={inputClass} />
                </label>
              </div>
            </details>

            <details className="rounded-xl border border-border/40 bg-card/95 p-5 shadow-sm">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between text-sm font-medium text-foreground">
                  <span>Contact</span>
                  <span className="text-xs text-muted-foreground">View</span>
                </div>
              </summary>
              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <input type="tel" value={formData.phone} onChange={set("phone")} placeholder="+256700000000" className={inputClass} />
                </label>
                <label className="block">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <div className="mt-2 rounded-xl border border-input bg-background px-4 py-3 text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </label>
              </div>
            </details>

            <details className="rounded-xl border border-border/40 bg-card/95 p-5 shadow-sm">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between text-sm font-medium text-foreground">
                  <span>Avatar</span>
                  <span className="text-xs text-muted-foreground">View</span>
                </div>
              </summary>
              <div className="mt-4 space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted text-foreground">
                  {formData.avatarUrl ? (
                    <img src={formData.avatarUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <User className="h-8 w-8" />
                  )}
                </div>
                <label className="block">
                  <span className="text-sm text-muted-foreground">Avatar URL</span>
                  <input type="url" value={formData.avatarUrl} onChange={set("avatarUrl")} placeholder="https://example.com/avatar.jpg" className={inputClass} />
                </label>
                {formData.avatarUrl && (
                  <Button
                    variant="ghost"
                    size="pill"
                    className="text-red-400"
                    onClick={() => setFormData(prev => ({ ...prev, avatarUrl: "" }))}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
            </details>
          </div>

          <div className="mt-6">
            <OTPButton isLoading={isSaving} disabled={!hasChanges} text="Save" onClick={handleSave} />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
