"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Camera, CheckCircle, XCircle, Loader2, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OTPButton } from "@/components/otp-button"
import { AppLayout } from "@/components/app-layout"
import { ErrorState } from "@/components/error-state"

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
        <div className="py-12">
          <ErrorState title="Profile unavailable" description="Try again later." />
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
    <AppLayout title="Edit your profile" backHref="/home" backLabel="Home">
      <div className="space-y-6">
        <div className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm">
          <p className="text-xs text-muted-foreground">
            <Link href="/home" className="hover:text-foreground transition-colors">Home</Link>
            <span className="px-2">/</span>
            <span className="text-foreground">Profile</span>
          </p>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Profile</p>
              <h1 className="text-2xl font-medium">Edit profile</h1>
            </div>
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
                  <span className="text-sm text-muted-foreground">Name</span>
                  <input
                    type="text"
                    value={`${formData.firstName} ${formData.lastName}`.trim()}
                    onChange={(e) => {
                      const [firstName, ...rest] = e.target.value.split(" ")
                      handleInputChange("firstName", firstName)
                      handleInputChange("lastName", rest.join(" "))
                    }}
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Diana Larussa"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-muted-foreground">Username</span>
                  <div className="mt-2 flex items-center rounded-xl border border-input bg-background px-4 py-3">
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
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-input bg-background px-4 py-3">
                    <span className="text-sm text-foreground">{formData.phone || "+256700000000"}</span>
                    <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-input bg-background px-4 py-3">
                    <span className="text-sm text-foreground">{user.email}</span>
                    <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
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
              <div className="mt-4 rounded-xl border border-dashed border-border/60 bg-card/95 p-4 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-foreground">
                  {formData.avatarUrl ? (
                    <img src={formData.avatarUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <User className="h-8 w-8" />
                  )}
                </div>
                <Button
                  variant="secondary"
                  size="pill"
                  className="mx-auto mb-3"
                  onClick={() => alert("Add a new photo")}
                >
                  Add photo
                </Button>
                <Button
                  variant="ghost"
                  size="pill"
                  className="mx-auto text-red-400"
                  onClick={() => setFormData(prev => ({ ...prev, avatarUrl: "" }))}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
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
