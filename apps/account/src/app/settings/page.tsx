import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <AppLayout title="Settings">
      <div className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-xl shadow-slate-900/10">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Settings</h2>
            <p className="text-sm text-muted-foreground">Manage app preferences and account options.</p>
          </div>
          <div className="space-y-3">
            <Link href="/theme">
              <Button variant="secondary" className="w-full justify-between" size="lg">
                <span>Theme</span>
                <span className="text-sm text-muted-foreground">Choose light/dark</span>
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-between" size="lg" disabled>
              <span>Notifications</span>
              <span className="text-sm text-muted-foreground">Coming soon</span>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
