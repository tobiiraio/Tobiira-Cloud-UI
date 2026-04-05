import { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"

interface AuthShellProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
  showBack?: boolean
  onBack?: () => void
}

export function AuthShell({ title, description, children, footer, showBack = false, onBack }: AuthShellProps) {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-lg border border-border bg-card/95 p-8 shadow-xl shadow-slate-800/5 backdrop-blur">
          <div className="space-y-4">
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
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Tobiira Account
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
            <div className="space-y-4">{children}</div>
            {footer && <div className="border-t border-border pt-4 text-sm text-muted-foreground">{footer}</div>}
          </div>
        </div>
      </main>
      <footer className="text-center text-xs text-muted-foreground py-4 px-6">
        © {year} Tobiira IO
      </footer>
    </div>
  )
}
