"use client"

import { baseApi } from "@/lib/api/base-api"
import type {
  AcceptInviteDto,
  CreateJoinRequestDto,
  InviteMemberDto,
  ResolveJoinRequestDto,
  UpdateMemberRoleDto,
} from "@/lib/api/types"
import type { Invite, JoinRequest, Member } from "@/lib/mock-data"

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object"
}

function coerceMembers(data: unknown): Member[] {
  if (!Array.isArray(data)) return []
  return data
    .map((item): Member | null => {
      if (!isRecord(item)) return null

      if (typeof item.id === "string" && typeof item.email === "string" && typeof item.role === "string") {
        const name = typeof item.name === "string" ? item.name : item.email.split("@")[0] ?? item.email
        return { id: item.id, email: item.email, name, role: item.role as Member["role"] }
      }

      const user = isRecord(item.user) ? item.user : null
      const membership = isRecord(item.membership) ? item.membership : null
      if (!user || !membership) return null
      if (typeof user.id !== "string" || typeof user.email !== "string" || typeof membership.role !== "string") return null

      const firstName = typeof user.firstName === "string" ? user.firstName : ""
      const lastName = typeof user.lastName === "string" ? user.lastName : ""
      const fullName = `${firstName} ${lastName}`.trim()
      const fallbackName = user.email.split("@")[0] ?? user.email

      return {
        id: user.id,
        email: user.email,
        name: fullName || fallbackName,
        role: membership.role as Member["role"],
      }
    })
    .filter((item): item is Member => Boolean(item))
}

function coerceInvites(data: unknown): Invite[] {
  if (!Array.isArray(data)) return []
  return data
    .map((item): Invite | null => {
      if (!isRecord(item)) return null
      if (typeof item.id !== "string" || typeof item.role !== "string") return null
      const email =
        typeof item.email === "string" ? item.email :
        typeof item.invitedEmail === "string" ? item.invitedEmail : null
      if (!email) return null
      return { id: item.id, email, role: item.role as Invite["role"] }
    })
    .filter((item): item is Invite => Boolean(item))
}

function coerceJoinRequests(data: unknown): JoinRequest[] {
  if (!Array.isArray(data)) return []
  return data
    .map((item): JoinRequest | null => {
      if (!isRecord(item)) return null
      if (
        typeof item.id === "string" &&
        typeof item.message === "string" &&
        typeof item.email === "string" &&
        typeof item.name === "string"
      ) {
        return { id: item.id, name: item.name, email: item.email, message: item.message }
      }

      const user = isRecord(item.user) ? item.user : null
      if (!user || typeof item.message !== "string") return null
      if (typeof item.id !== "string" || typeof user.email !== "string") return null

      const firstName = typeof user.firstName === "string" ? user.firstName : ""
      const lastName = typeof user.lastName === "string" ? user.lastName : ""
      const fullName = `${firstName} ${lastName}`.trim()
      const fallbackName = user.email.split("@")[0] ?? user.email

      return { id: item.id, email: user.email, name: fullName || fallbackName, message: item.message }
    })
    .filter((item): item is JoinRequest => Boolean(item))
}

export const membershipsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query<Member[], string>({
      query: (orgId) => ({ url: `organizations/${encodeURIComponent(orgId)}/members` }),
      transformResponse: (response: unknown) => coerceMembers(response),
      providesTags: (_result, _error, orgId) => [{ type: "OrganizationMembers", id: orgId }],
    }),
    updateMemberRole: builder.mutation<unknown, { orgId: string; userId: string; patch: UpdateMemberRoleDto }>({
      query: ({ orgId, userId, patch }) => ({
        url: `organizations/${encodeURIComponent(orgId)}/members/${encodeURIComponent(userId)}/role`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { orgId }) => [{ type: "OrganizationMembers", id: orgId }],
    }),
    removeMember: builder.mutation<unknown, { orgId: string; userId: string }>({
      query: ({ orgId, userId }) => ({
        url: `organizations/${encodeURIComponent(orgId)}/members/${encodeURIComponent(userId)}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { orgId }) => [{ type: "OrganizationMembers", id: orgId }],
    }),
    getInvites: builder.query<Invite[], string>({
      query: (orgId) => ({ url: `organizations/${encodeURIComponent(orgId)}/invites` }),
      transformResponse: (response: unknown) => coerceInvites(response),
      providesTags: (_result, _error, orgId) => [{ type: "OrganizationInvites", id: orgId }],
    }),
    inviteMember: builder.mutation<unknown, { orgId: string; body: InviteMemberDto }>({
      query: ({ orgId, body }) => ({
        url: `organizations/${encodeURIComponent(orgId)}/invites`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { orgId }) => [
        { type: "OrganizationInvites", id: orgId },
        { type: "OrganizationMembers", id: orgId },
      ],
    }),
    revokeInvite: builder.mutation<unknown, { orgId: string; inviteId: string }>({
      query: ({ orgId, inviteId }) => ({
        url: `organizations/${encodeURIComponent(orgId)}/invites/${encodeURIComponent(inviteId)}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { orgId }) => [{ type: "OrganizationInvites", id: orgId }],
    }),
    getJoinRequests: builder.query<JoinRequest[], string>({
      query: (orgId) => ({ url: `organizations/${encodeURIComponent(orgId)}/join-requests` }),
      transformResponse: (response: unknown) => coerceJoinRequests(response),
      providesTags: (_result, _error, orgId) => [{ type: "OrganizationJoinRequests", id: orgId }],
    }),
    createJoinRequest: builder.mutation<unknown, { orgId: string; body: CreateJoinRequestDto }>({
      query: ({ orgId, body }) => ({
        url: `organizations/${encodeURIComponent(orgId)}/join-requests`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { orgId }) => [{ type: "OrganizationJoinRequests", id: orgId }],
    }),
    resolveJoinRequest: builder.mutation<unknown, { orgId: string; requestId: string; body: ResolveJoinRequestDto }>({
      query: ({ orgId, requestId, body }) => ({
        url: `organizations/${encodeURIComponent(orgId)}/join-requests/${encodeURIComponent(requestId)}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { orgId }) => [
        { type: "OrganizationJoinRequests", id: orgId },
        { type: "OrganizationMembers", id: orgId },
      ],
    }),
    acceptInvite: builder.mutation<unknown, AcceptInviteDto>({
      query: (body) => ({
        url: "memberships/accept-invite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Organizations"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetMembersQuery,
  useGetInvitesQuery,
  useGetJoinRequestsQuery,
  useInviteMemberMutation,
  useRevokeInviteMutation,
  useUpdateMemberRoleMutation,
  useRemoveMemberMutation,
  useCreateJoinRequestMutation,
  useResolveJoinRequestMutation,
  useAcceptInviteMutation,
} = membershipsApi

