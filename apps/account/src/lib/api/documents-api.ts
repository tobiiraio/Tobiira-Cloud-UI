"use client"

import { baseApi } from "@/lib/api/base-api"
import type { GenerateLeaseDto, GenerateReceiptDto } from "@/lib/api/types"

export const documentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateReceipt: builder.mutation<Blob, GenerateReceiptDto>({
      query: (body) => ({
        url: "documents/receipts/generate",
        method: "POST",
        body,
        responseHandler: (response) => response.blob(),
      }),
    }),
    generateLease: builder.mutation<Blob, GenerateLeaseDto>({
      query: (body) => ({
        url: "documents/leases/generate",
        method: "POST",
        body,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGenerateReceiptMutation, useGenerateLeaseMutation } = documentsApi
