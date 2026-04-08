"use client"

import { ReactNode } from "react"

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/95 p-6 text-center shadow-sm">
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  )
}
