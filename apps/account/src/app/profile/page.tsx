"use client"

import { useState, useEffect } from "react"
import { User, Camera, CheckCircle, XCircle, Loader2, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OTPButton } from "@/components/otp-button"
import { AppLayout } from "@/components/app-layout"

// Mock user data - replace with API call
const mockUser = {
  id: "user-123",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  username: "john.doe",
  avatarUrl: null as string | null,
  dateOfBirth: "1990-01-01",
  phone: "+256700000000",
  isEmailVerified: true,
  isPhoneVerified: false,
  systemRole: "user" as const,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}

type UserProfile = typeof mockUser

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    avatarUrl: "",
    dateOfBirth: "",
    phone: ""
  })

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setUser(mockUser)
      setFormData({
        firstName: mockUser.firstName || "",
        lastName: mockUser.lastName || "",
        username: mockUser.username || "",
        avatarUrl: mockUser.avatarUrl || "",
        dateOfBirth: mockUser.dateOfBirth || "",
        phone: mockUser.phone || ""
      })
      setIsLoading(false)
    }

    loadProfile()
  }, [])

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Update local state
      setUser({
        ...user,
        ...formData,
        updatedAt: new Date().toISOString()
      })
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <AppLayout title="Profile">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AppLayout>
    )
  }

  if (!user) {
    return (
      <AppLayout title="Profile">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load profile</p>
        </div>
      </AppLayout>
    )
  }

  const hasChanges = JSON.stringify({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    avatarUrl: user.avatarUrl,
    dateOfBirth: user.dateOfBirth,
    phone: user.phone
  }) !== JSON.stringify(formData)

  return (
    <AppLayout title="Edit your profile">
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Profile</p>
              <h1 className="text-2xl font-semibold">Edit your profile</h1>
            </div>
          </div>

          <div className="grid gap-4">
            <label className="block">
              <span className="text-sm text-muted-foreground">Name and surname</span>
              <input
                type="text"
                value={`${formData.firstName} ${formData.lastName}`.trim()}
                onChange={(e) => {
                  const [firstName, ...rest] = e.target.value.split(" ")
                  handleInputChange("firstName", firstName)
                  handleInputChange("lastName", rest.join(" "))
                }}
                className="mt-2 w-full rounded-3xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Diana Larussa"
              />
            </label>

            <label className="block">
              <span className="text-sm text-muted-foreground">Username</span>
              <div className="mt-2 flex items-center rounded-3xl border border-input bg-background px-4 py-3">
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  placeholder="DianaLarussa"
                />
                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-dashed border-border bg-card p-4 text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted text-foreground">
                  {formData.avatarUrl ? (
                    <img src={formData.avatarUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <User className="h-10 w-10" />
                  )}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mx-auto mb-3 rounded-full px-4 py-2"
                  onClick={() => alert("Add a new photo")}
                >
                  Add a new photo
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mx-auto rounded-full px-4 py-2 text-red-400"
                  onClick={() => setFormData(prev => ({ ...prev, avatarUrl: "" }))}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>

              <div className="space-y-3 rounded-3xl border border-border bg-card p-4">
                <label className="block">
                  <span className="text-sm text-muted-foreground">Phone number</span>
                  <div className="mt-2 flex items-center justify-between rounded-3xl border border-input bg-background px-4 py-3">
                    <span className="text-sm text-foreground">{formData.phone || "+256700000000"}</span>
                    <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm text-muted-foreground">E-mail</span>
                  <div className="mt-2 flex items-center justify-between rounded-3xl border border-input bg-background px-4 py-3">
                    <span className="text-sm text-foreground">{user.email}</span>
                    <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </label>

              </div>
            </div>
          </div>

          <div className="mt-6">
            <OTPButton isLoading={isSaving} disabled={!hasChanges} text="Save" onClick={handleSave} />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}