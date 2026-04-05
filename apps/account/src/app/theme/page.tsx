"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { AppLayout } from "@/components/app-layout"

export default function ThemePage() {
  return (
    <AppLayout title="Theme">
      <div className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-xl shadow-slate-900/10">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Choose your preferred theme mode for the app.</p>
          <ThemeToggle />
        </div>
      </div>
    </AppLayout>
  )
}
