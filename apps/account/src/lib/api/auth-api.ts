"use client"

import { baseApi } from "@/lib/api/base-api"
import type { MessageResponse, RefreshSessionDto, RequestOtpDto, TokenPairResponse, VerifyOtpDto } from "@/lib/api/types"
import { setAccessToken } from "@/lib/slices/auth-slice"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestOtp: builder.mutation<MessageResponse, RequestOtpDto>({
      query: (body) => ({ url: "auth/request-otp", method: "POST", body }),
    }),
    verifyOtp: builder.mutation<TokenPairResponse, VerifyOtpDto>({
      query: (body) => ({ url: "auth/verify-otp", method: "POST", body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setAccessToken(data.accessToken))
        dispatch(baseApi.util.invalidateTags(["Profile", "Organizations"]))
      },
    }),
    refreshSession: builder.mutation<TokenPairResponse, RefreshSessionDto | void>({
      query: (body) => ({
        url: "auth/refresh",
        method: "POST",
        body: body ?? undefined,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setAccessToken(data.accessToken))
      },
    }),
    logout: builder.mutation<MessageResponse, RefreshSessionDto | void>({
      query: (body) => ({
        url: "auth/logout",
        method: "POST",
        body: body ?? undefined,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } finally {
          dispatch(setAccessToken(null))
          dispatch(baseApi.util.resetApiState())
        }
      },
    }),
  }),
})

export const {
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useRefreshSessionMutation,
  useLogoutMutation,
} = authApi

