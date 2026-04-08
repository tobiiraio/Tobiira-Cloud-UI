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
      <main className="relative flex-1 flex items-start sm:items-center justify-center px-6 pt-8 pb-12 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--primary)/0.18),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,hsl(var(--foreground)/0.12),transparent_65%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,hsl(var(--foreground)/0.12)_55%,transparent_100%)] opacity-90" />
          <div className="absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_70%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--foreground)/0.08)_1px,transparent_0)] [background-size:26px_26px]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,transparent_35%,hsl(var(--foreground)/0.12)_100%)]" />
        </div>
        <div className="w-full max-w-md">
          <div className="-mt-4 mb-6 sm:mt-0">
            <Logo />
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary)/0.18),transparent_70%)] blur-2xl" />
            <div className="rounded-2xl border border-border/60 bg-card/95 p-8 shadow-[0_30px_70px_-50px_hsl(var(--foreground)/0.7)] ring-1 ring-border/50 backdrop-blur animate-in fade-in slide-in-from-bottom-2 duration-500">
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
                <h1 className="mt-2 text-3xl font-medium tracking-tight">{title}</h1>
              </div>
              <div className="space-y-4">{children}</div>
              {footer && <div className="border-t border-border pt-4 text-sm text-muted-foreground">{footer}</div>}
            </div>
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
