import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageShellProps {
  children: ReactNode
  className?: string
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <main className={cn("flex-1 pb-16", className)}>
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {children}
      </div>
    </main>
  )
}