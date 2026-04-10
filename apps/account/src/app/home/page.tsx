"use client"

import Link from "next/link"
import { Settings, ChevronRight } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { useGetOrganizationsQuery, useGetProfileQuery } from "@/lib/api"
import { EmptyState } from "@/components/empty-state"
import { ErrorState } from "@/components/error-state"

function ProfileCard() {
  const { data: user } = useGetProfileQuery()
  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((n) => n![0].toUpperCase())
    .join("") || user?.email?.[0]?.toUpperCase() || "?"

  return (
    <div className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="h-full w-full rounded-full bg-background grid place-items-center text-3xl font-semibold text-foreground">
                {initials}
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-medium">
            {user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email : "—"}
          </h2>
          <p className="text-sm text-muted-foreground">{user?.email ?? ""}</p>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { data: organizations = [], isLoading, isError } = useGetOrganizationsQuery()

  return (
    <AppLayout
      title="Home"
      actions={
        <Link href="/settings">
          <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      }
    >
      <div className="space-y-6">
        <ProfileCard />

        <div className="space-y-3">
          {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {isError && <ErrorState title="Organizations unavailable" description="Try again later." />}
          {!isLoading && !isError && organizations.length === 0 && (
            <EmptyState title="No organizations" description="Create one to continue." />
          )}
          {!isLoading && !isError && organizations.map((org) => (
            <Link key={org.id} href={`/organizations/${org.id}`}>
              <div className="rounded-xl border border-border/40 bg-background/80 p-4 shadow-sm transition hover:border-primary">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{org.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">{org.role}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
