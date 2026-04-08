import { ReactNode } from "react"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { AppBar } from "./app-bar"
import { PageShell } from "./page-shell"
import { BottomNav } from "./bottom-nav"
import { Button } from "@/components/ui/button"
import { GlobalFab } from "@/components/global-fab"

interface AppLayoutProps {
  title: string
  actions?: ReactNode
  children: ReactNode
  backHref?: string
  backLabel?: string
  backToHome?: boolean
}

export function AppLayout({ title, actions, children, backHref, backLabel, backToHome }: AppLayoutProps) {
  const appActions = (
    <>
      {actions}
      <Link href="/logout">
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0"
          aria-label="Log out"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </Link>
    </>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <AppBar title={title} actions={appActions} backHref={backHref} backLabel={backLabel} backToHome={backToHome} />
      <PageShell>{children}</PageShell>
      <GlobalFab />
      <BottomNav />
    </div>
  )
}
