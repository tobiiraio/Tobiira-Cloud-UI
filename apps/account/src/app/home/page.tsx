"use client"

import Link from "next/link"
import { Settings, ChevronRight } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"

const mockOrganizations = [
  { id: "org-1", name: "Acme Corporation", role: "owner" },
  { id: "org-2", name: "Tech Solutions Ltd", role: "operator" },
]

export default function HomePage() {
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
        <div className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                <div className="h-full w-full rounded-full bg-background grid place-items-center text-3xl font-semibold text-foreground">
                  JC
                </div>
              </div>
              <span className="absolute -bottom-2 right-0 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                4th Story
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-medium">James Cooper</h2>
              <p className="text-sm text-muted-foreground">jamescooper@work.com</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {mockOrganizations.map((org) => (
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
