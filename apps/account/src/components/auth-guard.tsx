"use client"

import { useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { sessionExpired } from "@/lib/slices/auth-slice"
import { useRefreshSessionMutation } from "@/lib/api"

const AUTH_PATHS = ["/auth/"]

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const [refreshSession] = useRefreshSessionMutation()
  const didAttemptRefresh = useRef(false)

  const isAuthPage = AUTH_PATHS.some((p) => pathname?.startsWith(p))

  useEffect(() => {
    // Already logged in — redirect away from auth pages
    if (accessToken && isAuthPage) {
      router.replace("/home")
      return
    }

    // No token on a protected page — try a silent refresh once
    if (!accessToken && !isAuthPage && !didAttemptRefresh.current) {
      didAttemptRefresh.current = true
      refreshSession()
        .unwrap()
        .catch(() => {
          dispatch(sessionExpired())
          router.replace("/auth/login")
        })
    }
  }, [accessToken, isAuthPage]) // eslint-disable-line react-hooks/exhaustive-deps

  // On session expiry anywhere, redirect to login
  useEffect(() => {
    if (!accessToken && !isAuthPage && didAttemptRefresh.current) {
      router.replace("/auth/login")
    }
  }, [accessToken, isAuthPage]) // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>
}
