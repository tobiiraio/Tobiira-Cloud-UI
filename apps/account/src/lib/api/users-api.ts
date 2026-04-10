"use client"

import { baseApi } from "@/lib/api/base-api"
import type { ApiUser, MyOrganizationsItem } from "@/lib/api/types"
import type { Organization, UserProfile } from "@/lib/mock-data"

function toUserProfile(user: ApiUser): UserProfile {
  const username = user.email.includes("@") ? user.email.split("@")[0] : user.email
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username,
    avatarUrl: user.avatarUrl,
    dateOfBirth: user.dateOfBirth ?? "",
    phone: user.phone ?? "",
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified ?? false,
    systemRole: user.systemRole,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => ({ url: "users/me" }),
      transformResponse: (response: ApiUser) => toUserProfile(response),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<UserProfile, Partial<Pick<UserProfile, "firstName" | "lastName" | "avatarUrl" | "dateOfBirth" | "phone">>>({
      query: (body) => ({ url: "users/me", method: "PATCH", body }),
      transformResponse: (response: ApiUser) => toUserProfile(response),
      invalidatesTags: ["Profile"],
    }),
    getOrganizations: builder.query<Organization[], void>({
      query: () => ({ url: "users/me/organizations" }),
      transformResponse: (response: MyOrganizationsItem[]) =>
        response.map((item) => ({
          id: item.organization.id,
          name: item.organization.name,
          role: item.membership.role,
        })),
      providesTags: (result) => {
        if (!result) return ["Organizations"]
        return [
          "Organizations",
          ...result.map((org) => ({ type: "Organization" as const, id: org.id })),
        ]
      },
    }),
    getOrganization: builder.query<Organization | null, string>({
      query: () => ({ url: "users/me/organizations" }),
      transformResponse: (response: MyOrganizationsItem[], _meta, orgId) => {
        const match = response.find((item) => item.organization.id === orgId)
        if (!match) return null
        return {
          id: match.organization.id,
          name: match.organization.name,
          role: match.membership.role,
        }
      },
      providesTags: (_result, _error, orgId) => [{ type: "Organization", id: orgId }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
} = usersApi

