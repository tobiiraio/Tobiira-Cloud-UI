"use client"

interface ErrorStateProps {
  title: string
  description?: string
}

export function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/95 p-6 text-center shadow-sm">
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
