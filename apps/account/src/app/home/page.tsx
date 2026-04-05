"use client"

import Link from "next/link"
import { Settings, User, ChevronRight } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"

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
        <div className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-xl shadow-slate-900/5">
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
              <h2 className="text-2xl font-semibold">James Cooper</h2>
              <p className="text-sm text-muted-foreground">jamescooper@work.com</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/organizations" className="block rounded-[1.75rem] border border-border bg-background/80 p-4 shadow-sm transition hover:border-primary">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">Organisations</p>
                <p className="text-sm text-muted-foreground">View your organization dashboard</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}
