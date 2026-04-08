"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { isToastEvent, notify } from "@/lib/notifications"

export function RouteToasts() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const lastToastRef = useRef<string | null>(null)

  useEffect(() => {
    const toastParam = searchParams.get("toast")
    if (!toastParam || toastParam === lastToastRef.current) return
    if (!isToastEvent(toastParam)) return

    lastToastRef.current = toastParam
    notify(toastParam)

    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.delete("toast")
    const nextQuery = nextParams.toString()
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname)
  }, [pathname, searchParams, router])

  return null
}
