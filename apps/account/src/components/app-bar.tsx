import { ReactNode } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppBarProps {
  title: string
  actions?: ReactNode
  backHref?: string
  backLabel?: string
  backToHome?: boolean
}

export function AppBar({ title, actions, backHref, backLabel = "Back", backToHome = false }: AppBarProps) {
  const resolvedBackHref = backToHome ? "/home" : backHref
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 pt-safe">
        <div className="flex items-center gap-2">
          {resolvedBackHref && (
            <Link href={resolvedBackHref} aria-label={backLabel}>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  )
}
