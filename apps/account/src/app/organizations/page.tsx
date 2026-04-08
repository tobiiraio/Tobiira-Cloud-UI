"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppLayout } from "@/components/app-layout"
import { EmptyState } from "@/components/empty-state"

const mockOrganizations = [
  { id: "org-1", name: "Acme Corporation", role: "owner" },
  { id: "org-2", name: "Tech Solutions Ltd", role: "operator" },
]

export default function OrganizationsPage() {
  return (
    <AppLayout title="Organizations">
      {mockOrganizations.length === 0 ? (
        <div className="space-y-4">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <EmptyState
            title="No organizations"
            description="Create one to continue."
            action={
              <Link href="/organizations/new">
                <Button size="pill">Create organization</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="space-y-3">
          {mockOrganizations.map((org) => (
            <Link key={org.id} href={`/organizations/${org.id}`}>
              <div className="rounded-xl border border-border/40 bg-card/95 p-4 flex items-center justify-between hover:bg-card transition-colors">
                <div>
                  <h3 className="font-medium text-foreground">{org.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">{org.role}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
          <Link href="/organizations/new" className="mt-6 block">
            <Button variant="secondary" className="w-full" size="pill">
              <Plus className="h-5 w-5 mr-2" />
              New organization
            </Button>
          </Link>
        </div>
      )}
    </AppLayout>
  )
}
