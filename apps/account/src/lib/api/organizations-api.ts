"use client"

import { baseApi } from "@/lib/api/base-api"
import type {
  ApiOrganization,
  ApiOrganizationSettings,
  CreateOrganizationDto,
  UpdateOrganizationDto,
  UpdateOrganizationSettingsDto,
} from "@/lib/api/types"

export const organizationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrganization: builder.mutation<ApiOrganization, CreateOrganizationDto>({
      query: (body) => ({ url: "organizations", method: "POST", body }),
      invalidatesTags: ["Organizations"],
    }),
    getOrganizationById: builder.query<ApiOrganization, string>({
      query: (id) => ({ url: `organizations/${encodeURIComponent(id)}` }),
      providesTags: (_result, _error, id) => [{ type: "Organization", id }],
    }),
    updateOrganization: builder.mutation<ApiOrganization, { id: string; patch: UpdateOrganizationDto }>({
      query: ({ id, patch }) => ({
        url: `organizations/${encodeURIComponent(id)}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => ["Organizations", { type: "Organization", id }],
    }),
    getOrganizationSettings: builder.query<ApiOrganizationSettings, string>({
      query: (id) => ({ url: `organizations/${encodeURIComponent(id)}/settings` }),
      providesTags: (_result, _error, id) => [{ type: "OrganizationSettings", id }],
    }),
    updateOrganizationSettings: builder.mutation<
      ApiOrganizationSettings,
      { id: string; patch: UpdateOrganizationSettingsDto }
    >({
      query: ({ id, patch }) => ({
        url: `organizations/${encodeURIComponent(id)}/settings`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "OrganizationSettings", id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateOrganizationMutation,
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation,
  useGetOrganizationSettingsQuery,
  useUpdateOrganizationSettingsMutation,
} = organizationsApi

