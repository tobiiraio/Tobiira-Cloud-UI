import { ReactNode } from "react"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { AppBar } from "./app-bar"
import { PageShell } from "./page-shell"
import { BottomNav } from "./bottom-nav"
import { Button } from "@/components/ui/button"

interface AppLayoutProps {
  title: string
  actions?: ReactNode
  children: ReactNode
}

export function AppLayout({ title, actions, children }: AppLayoutProps) {
  const appActions = (
    <>
      {actions}
      <Link href="/auth/login">
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
      <AppBar title={title} actions={appActions} />
      <PageShell>{children}</PageShell>
      <BottomNav />
    </div>
  )
}
