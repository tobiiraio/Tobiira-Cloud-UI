import { ReactNode } from "react"
import { AppBar } from "./app-bar"
import { PageShell } from "./page-shell"
import { BottomNav } from "./bottom-nav"

interface AppLayoutProps {
  title: string
  actions?: ReactNode
  children: ReactNode
}

export function AppLayout({ title, actions, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppBar title={title} actions={actions} />
      <PageShell>{children}</PageShell>
      <BottomNav />
    </div>
  )
}