"use client"

import { baseApi } from "@/lib/api/base-api"
import type {
  ApiPayment,
  ListPaymentsParams,
  RecordPaymentDto,
  VoidPaymentDto,
} from "@/lib/api/types"

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listPayments: builder.query<ApiPayment[], ListPaymentsParams>({
      query: ({ orgId, ...params }) => ({
        url: `organizations/${encodeURIComponent(orgId)}/payments`,
        params,
      }),
      providesTags: (_result, _error, { orgId }) => [{ type: "OrganizationPayments", id: orgId }],
    }),
    getPayment: builder.query<ApiPayment, { orgId: string; paymentId: string }>({
      query: ({ orgId, paymentId }) => ({
        url: `organizations/${encodeURIComponent(orgId)}/payments/${encodeURIComponent(paymentId)}`,
      }),
      providesTags: (_result, _error, { paymentId }) => [{ type: "Payment", id: paymentId }],
    }),
    recordPayment: builder.mutation<ApiPayment, { orgId: string; body: RecordPaymentDto }>({
      query: ({ orgId, body }) => ({
        url: `organizations/${encodeURIComponent(orgId)}/payments`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { orgId }) => [{ type: "OrganizationPayments", id: orgId }],
    }),
    voidPayment: builder.mutation<ApiPayment, { orgId: string; paymentId: string; body: VoidPaymentDto }>({
      query: ({ orgId, paymentId, body }) => ({
        url: `organizations/${encodeURIComponent(orgId)}/payments/${encodeURIComponent(paymentId)}/void`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { orgId, paymentId }) => [
        { type: "OrganizationPayments", id: orgId },
        { type: "Payment", id: paymentId },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useListPaymentsQuery,
  useGetPaymentQuery,
  useRecordPaymentMutation,
  useVoidPaymentMutation,
} = paymentsApi
