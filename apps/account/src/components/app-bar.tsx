import { ReactNode } from "react"

interface AppBarProps {
  title: string
  actions?: ReactNode
}

export function AppBar({ title, actions }: AppBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 pt-safe">
        <h1 className="text-lg font-semibold">{title}</h1>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  )
}