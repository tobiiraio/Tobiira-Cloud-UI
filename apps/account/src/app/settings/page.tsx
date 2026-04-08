import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <AppLayout title="Settings" backHref="/home" backLabel="Home">
      <div className="rounded-xl border border-border/40 bg-card/95 p-6 shadow-sm">
        <p className="text-xs text-muted-foreground">
          <Link href="/home" className="hover:text-foreground transition-colors">Home</Link>
          <span className="px-2">/</span>
          <span className="text-foreground">Settings</span>
        </p>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Settings</h2>
            <p className="text-sm text-muted-foreground">Preferences</p>
          </div>
          <div className="space-y-3">
            <Link href="/theme">
              <Button variant="secondary" className="w-full justify-between" size="pill">
                <span>Theme</span>
                <span className="text-sm text-muted-foreground">Choose light/dark</span>
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-between" size="pill" disabled>
              <span>Notifications</span>
              <span className="text-sm text-muted-foreground">Coming soon</span>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
