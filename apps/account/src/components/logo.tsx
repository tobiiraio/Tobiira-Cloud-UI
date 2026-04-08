"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Logo() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <div className="inline-block">
      <span className="text-2xl font-medium tracking-wide">
        <span className={currentTheme === "dark" ? "text-white" : "text-slate-900"}>
          Tobiira
        </span>
      </span>
    </div>
  )
}
