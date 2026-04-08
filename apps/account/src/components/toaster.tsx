"use client"

import { useTheme } from "next-themes"
import { Toaster } from "sonner"

export function AppToaster() {
  const { theme, resolvedTheme } = useTheme()
  const activeTheme = theme === "system" ? resolvedTheme : theme
  const toastTheme = activeTheme === "dark" ? "dark" : "light"

  return (
    <Toaster position="bottom-right" richColors closeButton theme={toastTheme} />
  )
}
