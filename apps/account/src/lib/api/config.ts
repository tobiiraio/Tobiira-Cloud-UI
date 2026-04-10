"use client"

function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value
}

export function getApiBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_API_BASE_URL
  if (explicit && explicit.trim()) return stripTrailingSlash(explicit.trim())

  const origin = process.env.NEXT_PUBLIC_API_ORIGIN
  if (origin && origin.trim()) return `${stripTrailingSlash(origin.trim())}/api`

  return "http://localhost:7143/api"
}

