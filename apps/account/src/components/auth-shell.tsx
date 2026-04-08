"use client"

import { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { Logo } from "./logo"

interface AuthShellProps {
  title: string
  children: ReactNode
  footer?: ReactNode
  showBack?: boolean
  onBack?: () => void
}

export function AuthShell({ title, children, footer, showBack = false, onBack }: AuthShellProps) {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="relative flex-1 flex items-center justify-center px-6 py-10">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--primary)/0.18),transparent_65%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,hsl(var(--foreground)/0.04)_50%,transparent_100%)] opacity-70" />
        </div>
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Logo />
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/90 p-8 shadow-[0_26px_60px_-48px_hsl(var(--foreground)/0.55)] ring-1 ring-border/40 backdrop-blur">
            <div className="space-y-5">
              <div>
                {showBack && onBack && (
                  <Button
                    variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="mb-4 -ml-2 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                )}
                <div className="mb-4 h-1.5 w-12 rounded-full bg-primary/80" />
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
              </div>
              <div className="space-y-4">{children}</div>
              {footer && <div className="border-t border-border pt-4 text-sm text-muted-foreground">{footer}</div>}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center text-xs text-muted-foreground py-4 px-6">
        © {year} Tobiira IO
      </footer>
    </div>
  )
}
