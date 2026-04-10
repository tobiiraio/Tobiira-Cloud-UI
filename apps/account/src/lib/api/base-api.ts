"use client"

import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react"
import { getApiBaseUrl } from "@/lib/api/config"
import { setAccessToken, sessionExpired } from "@/lib/slices/auth-slice"

type NestErrorData = {
  message?: string | string[]
  [key: string]: unknown
}

function normalizeNestErrorData(data: unknown): unknown {
  if (!data || typeof data !== "object") return data

  const maybeMessage = (data as NestErrorData).message
  if (!Array.isArray(maybeMessage)) return data

  return { ...(data as Record<string, unknown>), message: maybeMessage.join(", ") }
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: getApiBaseUrl(),
  credentials: "include",
  responseHandler: async (response) => {
    const text = await response.text()
    if (!text) return null
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  },
  prepareHeaders: (headers, { getState }) => {
    if (!headers.has("accept")) headers.set("accept", "application/json")
    const token = (getState() as { auth: { accessToken: string | null } }).auth.accessToken
    if (token) headers.set("authorization", `Bearer ${token}`)
    return headers
  },
})

type RawBaseQueryReturn = Awaited<ReturnType<typeof rawBaseQuery>>

function getUrlFromArgs(args: string | FetchArgs): string {
  if (typeof args === "string") return args
  return args.url
}

function normalizeErrorResult(result: RawBaseQueryReturn): RawBaseQueryReturn {
  if (!("error" in result) || !result.error) return result

  return {
    ...result,
    error: { ...result.error, data: normalizeNestErrorData((result.error as any).data) },
  } as RawBaseQueryReturn
}

const baseQueryWithoutReauth: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
  const result = (await rawBaseQuery(args, api, extraOptions)) as RawBaseQueryReturn
  return normalizeErrorResult(result) as any
}

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
  const result = (await baseQueryWithoutReauth(args, api, extraOptions)) as any

  const url = getUrlFromArgs(args)
  const shouldSkipReauth = url.startsWith("auth/")

  if (shouldSkipReauth) return result

  if (result?.error?.status !== 401) return result

  const refreshResult = (await baseQueryWithoutReauth({ url: "auth/refresh", method: "POST" }, api, extraOptions)) as any
  if (refreshResult?.error) {
    api.dispatch(sessionExpired())
    return result
  }

  const newToken = refreshResult?.data?.accessToken
  if (newToken) api.dispatch(setAccessToken(newToken))

  return baseQueryWithoutReauth(args, api, extraOptions)
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "Profile",
    "Organizations",
    "Organization",
    "OrganizationSettings",
    "OrganizationMembers",
    "OrganizationInvites",
    "OrganizationJoinRequests",
    "OrganizationPayments",
    "Payment",
  ],
  endpoints: () => ({}),
})
