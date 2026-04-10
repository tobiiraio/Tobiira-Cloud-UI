"use client"

export function getErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") return null

  // fetchBaseQuery error shape: { status, data } or { status: 'FETCH_ERROR', error }
  const maybeAny = error as Record<string, unknown>

  const data = maybeAny.data
  if (data && typeof data === "object") {
    const message = (data as Record<string, unknown>).message
    if (typeof message === "string" && message.trim()) return message
  }

  const fallback = maybeAny.error
  if (typeof fallback === "string" && fallback.trim()) return fallback

  return null
}

