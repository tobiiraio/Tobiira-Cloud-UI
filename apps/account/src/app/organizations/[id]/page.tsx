"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { ChevronRight, Settings, Users, Mail, ClipboardList } from "lucide-react"

export default function OrganizationDetailPage() {
  const params = useParams()
  const orgId = typeof params.id === "string" ? params.id : params.id?.[0] ?? "org"

  return (
    <AppLayout
      title="Organization"
      backHref="/organizations"
      backLabel="Organizations"
    >
      <div className="space-y-6">
        <div className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm">
          <p className="text-xs text-muted-foreground">
            <Link href="/organizations" className="hover:text-foreground transition-colors">Organizations</Link>
            <span className="px-2">/</span>
            <span className="text-foreground">Acme Corporation</span>
          </p>
          <h2 className="mt-4 text-2xl font-medium">Acme Corporation</h2>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Owner</p>
        </div>

        <div className="space-y-3">
          <Link
            href={`/organizations/${orgId}/members`}
            className="block rounded-xl border border-border/40 bg-background/80 p-4 transition hover:border-primary"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Members</p>
                  <p className="text-xs text-muted-foreground">Roles</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>

          <Link
            href={`/organizations/${orgId}/settings`}
            className="block rounded-xl border border-border/40 bg-background/80 p-4 transition hover:border-primary"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Settings</p>
                  <p className="text-xs text-muted-foreground">Preferences</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>

          <Link
            href={`/organizations/${orgId}/invites`}
            className="block rounded-xl border border-border/40 bg-background/80 p-4 transition hover:border-primary"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Invites</p>
                  <p className="text-xs text-muted-foreground">Email</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>

          <Link
            href={`/organizations/${orgId}/join-requests`}
            className="block rounded-xl border border-border/40 bg-background/80 p-4 transition hover:border-primary"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Join requests</p>
                  <p className="text-xs text-muted-foreground">Inbox</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>

          <Link
            href={`/organizations/${orgId}/join`}
            className="block rounded-xl border border-border/40 bg-background/80 p-4 transition hover:border-primary"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Request access</p>
                  <p className="text-xs text-muted-foreground">Ask to join</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}
