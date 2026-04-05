"use client"

import { useEffect, useMemo, useState } from "react"
import { Laptop2, Moon, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const themeOptions = [
  {
    value: "light",
    label: "Light",
    icon: SunMedium,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Laptop2,
  },
]

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = useMemo(() => {
    if (!mounted) return "system"
    return theme === "system" ? systemTheme || "light" : theme
  }, [mounted, systemTheme, theme])

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-full border border-input bg-background/80 p-1 shadow-sm">
      {themeOptions.map((option) => {
        const Icon = option.icon
        const isActive = theme === option.value

        return (
          <Button
            key={option.value}
            type="button"
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "min-w-[6rem] rounded-full px-3",
              isActive && "bg-secondary/80 text-secondary-foreground"
            )}
            onClick={() => setTheme(option.value)}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{option.label}</span>
          </Button>
        )
      })}
      {mounted && (
        <span className="ml-2 text-xs text-muted-foreground">
          Active: {activeTheme}
        </span>
      )}
    </div>
  )
}
