"use client"

import { baseApi } from "@/lib/api/base-api"
import { usersApi } from "@/lib/api/users-api"
import { membershipsApi } from "@/lib/api/memberships-api"
import { authApi } from "@/lib/api/auth-api"
import { organizationsApi } from "@/lib/api/organizations-api"
import { healthApi } from "@/lib/api/health-api"
import { paymentsApi } from "@/lib/api/payments-api"
import { documentsApi } from "@/lib/api/documents-api"

export const api = baseApi

export const {
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = usersApi

export const {
  useGetMembersQuery,
  useGetInvitesQuery,
  useGetJoinRequestsQuery,
  useAcceptInviteMutation,
  useInviteMemberMutation,
  useRevokeInviteMutation,
  useUpdateMemberRoleMutation,
  useRemoveMemberMutation,
  useCreateJoinRequestMutation,
  useResolveJoinRequestMutation,
} = membershipsApi

export const { useRequestOtpMutation, useVerifyOtpMutation, useRefreshSessionMutation, useLogoutMutation } = authApi

export const {
  useCreateOrganizationMutation,
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation,
  useGetOrganizationSettingsQuery,
  useUpdateOrganizationSettingsMutation,
} = organizationsApi

export const { useGetHealthQuery, useGetHelloQuery } = healthApi

export const {
  useListPaymentsQuery,
  useGetPaymentQuery,
  useRecordPaymentMutation,
  useVoidPaymentMutation,
} = paymentsApi

export const { useGenerateReceiptMutation, useGenerateLeaseMutation } = documentsApi
