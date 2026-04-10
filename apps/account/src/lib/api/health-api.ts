"use client"

import { baseApi } from "@/lib/api/base-api"

export const healthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHealth: builder.query<unknown, void>({
      query: () => ({ url: "health" }),
    }),
    getHello: builder.query<unknown, void>({
      query: () => ({ url: "" }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetHealthQuery, useGetHelloQuery } = healthApi

