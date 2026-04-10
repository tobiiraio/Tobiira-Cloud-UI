"use client"

import { Provider } from "react-redux"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AppToaster } from "@/components/toaster"
import { RouteToasts } from "@/components/route-toasts"
import { AuthGuard } from "@/components/auth-guard"
import { store } from "@/lib/store"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="tobiira-theme"
      >
        <AuthGuard>
          {children}
        </AuthGuard>
        <Suspense fallback={null}>
          <RouteToasts />
        </Suspense>
        <AppToaster />
      </ThemeProvider>
    </Provider>
  )
}
