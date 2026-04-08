"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { AppLayout } from "@/components/app-layout"

export default function ThemePage() {
  return (
    <AppLayout title="Theme" backHref="/settings" backLabel="Settings">
      <div className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm">
        <p className="text-xs text-muted-foreground">
          <Link href="/settings" className="hover:text-foreground transition-colors">Settings</Link>
          <span className="px-2">/</span>
          <span className="text-foreground">Theme</span>
        </p>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Choose a theme.</p>
          <ThemeToggle />
        </div>
      </div>
    </AppLayout>
  )
}
