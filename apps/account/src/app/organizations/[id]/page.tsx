"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { ChevronRight, Settings, Users, Mail, ClipboardList } from "lucide-react"
import { useGetOrganizationQuery } from "@/lib/api"
import { ErrorState } from "@/components/error-state"
import type { Organization } from "@/lib/mock-data"

function NavItem({ href, icon: Icon, label, description }: {
  href: string
  icon: React.ElementType
  label: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-border/40 bg-background/80 p-4 transition hover:border-primary"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Link>
  )
}

function OrgNav({ orgId, role }: { orgId: string; role: Organization["role"] }) {
  const isOwner = role === "owner"
  const canManage = role === "owner" || role === "operator"

  return (
    <div className="space-y-3">
      <NavItem href={`/organizations/${orgId}/members`} icon={Users} label="Members" description="View roles" />
      {canManage && (
        <NavItem href={`/organizations/${orgId}/join-requests`} icon={ClipboardList} label="Join requests" description="Inbox" />
      )}
      {isOwner && (
        <NavItem href={`/organizations/${orgId}/invites`} icon={Mail} label="Invites" description="Email" />
      )}
      {isOwner && (
        <NavItem href={`/organizations/${orgId}/settings`} icon={Settings} label="Settings" description="Preferences" />
      )}
    </div>
  )
}

export default function OrganizationDetailPage() {
  const params = useParams()
  const orgId = typeof params.id === "string" ? params.id : params.id?.[0] ?? "org"
  const { data: organization, isLoading, isError } = useGetOrganizationQuery(orgId)

  return (
    <AppLayout
      title="Organization"
      backHref="/organizations"
      backLabel="Organizations"
    >
      <div className="space-y-6">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {isError && <ErrorState title="Organization unavailable" description="Try again later." />}
        {!isLoading && !isError && !organization && (
          <ErrorState title="Organization not found" description="Check the link and try again." />
        )}
        {!isLoading && !isError && organization && (
          <>
            <div className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm">
              <p className="text-xs text-muted-foreground">
                <Link href="/organizations" className="hover:text-foreground transition-colors">Organizations</Link>
                <span className="px-2">/</span>
                <span className="text-foreground">{organization.name}</span>
              </p>
              <h2 className="mt-4 text-2xl font-medium">{organization.name}</h2>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{organization.role}</p>
            </div>
            <OrgNav orgId={orgId} role={organization.role} />
          </>
        )}
      </div>
    </AppLayout>
  )
}
