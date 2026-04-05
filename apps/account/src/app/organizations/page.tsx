"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Building2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppLayout } from "@/components/app-layout"

const mockOrganizations = [
  { id: "org-1", name: "Acme Corporation", role: "owner" },
  { id: "org-2", name: "Tech Solutions Ltd", role: "operator" },
]

export default function OrganizationsPage() {
  return (
    <AppLayout title="Organizations">
      {mockOrganizations.length === 0 ? (
        <div className="rounded-lg border border-border bg-card/95 p-8 text-center">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-lg font-semibold">No organizations yet</h2>
          <p className="text-sm text-muted-foreground mt-2 mb-6">
            Create your first organization to get started.
          </p>
          <Link href="/organizations/new">
            <Button size="lg">Create organization</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {mockOrganizations.map((org) => (
            <Link key={org.id} href={`/organizations/${org.id}`}>
              <div className="rounded-lg border border-border bg-card/95 p-4 flex items-center justify-between hover:bg-card transition-colors">
                <div>
                  <h3 className="font-medium text-foreground">{org.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{org.role}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
          <Link href="/organizations/new" className="mt-6 block">
            <Button variant="secondary" className="w-full" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              New organization
            </Button>
          </Link>
        </div>
      )}
    </AppLayout>
  )
}
