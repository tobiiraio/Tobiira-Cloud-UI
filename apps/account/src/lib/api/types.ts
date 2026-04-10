"use client"

export type AuthBearerOrCookie = {
  cookie?: never
  bearer?: never
}

export type ApiUser = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  avatarUrl: string | null
  dateOfBirth: string | null
  phone: string | null
  isEmailVerified: boolean
  isPhoneVerified: boolean | null
  systemRole: "superadmin" | "support" | "user"
  createdAt: string
  updatedAt: string
}

export type ApiOrganization = {
  id: string
  name: string
  address: string | null
  latitude: number | null
  longitude: number | null
  createdByUserId: string
  plan: unknown
  createdAt: string
  updatedAt: string
}

export type ApiOrganizationSettings = {
  id: string
  organizationId: string
  timezone: string
  currency: string
  locale: string
  vertical: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export type MembershipRole = "owner" | "operator" | "occupant"

export type MyOrganizationsItem = {
  membership: {
    id: string
    role: MembershipRole
    staffRole: string | null
    isManagingAgent: boolean
    joinedAt: string
  }
  organization: ApiOrganization
}

export type RequestOtpDto = { email: string }
export type VerifyOtpDto = { email: string; code: string }
export type RefreshSessionDto = { refreshToken?: string }

export type CreateOrganizationDto = {
  name: string
  address?: string
  latitude?: number
  longitude?: number
}

export type UpdateOrganizationDto = Partial<CreateOrganizationDto>

export type UpdateOrganizationSettingsDto = {
  timezone?: string
  currency?: string
  locale?: string
  vertical?: Record<string, unknown>
}

export type UpdateMemberRoleDto = {
  role: MembershipRole
  staffRole?: "supervisor" | "maintenance" | "finance" | "general"
  isManagingAgent?: boolean
}

export type InviteMemberDto = {
  email: string
  role: MembershipRole
  staffRole?: "supervisor" | "maintenance" | "finance" | "general"
  isManagingAgent?: boolean
}

export type CreateJoinRequestDto = { message?: string }
export type ResolveJoinRequestDto = { status: "approved" | "rejected" }
export type AcceptInviteDto = { token: string }

export type MessageResponse = { message: string }

export type TokenPairResponse = { accessToken: string; refreshToken: string | null }

// Payments

export type PaymentMethod = "cash" | "bank_transfer" | "mobile_money"
export type PaymentStatus = "recorded" | "voided"
export type PaymentSource = "manual" | "platform"

export type PeriodCoveredDto = { from: string; to: string }

export type RecordPaymentDto = {
  resourceType: string
  resourceId: string
  payerId: string
  payerEmail: string
  payerName?: string
  amount: number
  currency: string
  method: PaymentMethod
  reference?: string
  periodCovered?: PeriodCoveredDto
  paidAt: string
  notes?: string
}

export type VoidPaymentDto = { reason?: string }

export type ListPaymentsParams = {
  orgId: string
  limit?: number
  offset?: number
  status?: PaymentStatus
  payerId?: string
  resourceType?: string
  resourceId?: string
}

export type ApiPayment = {
  id: string
  organizationId: string
  resourceType: string
  resourceId: string
  payerId: string
  payerEmail: string
  payerName: string | null
  amount: number
  currency: string
  method: PaymentMethod
  reference: string | null
  periodCovered: PeriodCoveredDto | null
  paidAt: string
  notes: string | null
  recordedByUserId: string
  source: PaymentSource
  status: PaymentStatus
  voidedAt: string | null
  voidedByUserId: string | null
  voidReason: string | null
  createdAt: string
  updatedAt: string
}

// Documents

export type GenerateReceiptDto = {
  paymentId: string
  organizationName: string
  payerName?: string
  payerEmail: string
  amount: number
  currency: string
  method: string
  reference?: string
  periodFrom?: string
  periodTo?: string
  paidAt: string
}

export type GenerateLeaseDto = {
  leaseId: string
  organizationName: string
  tenantName?: string
  tenantEmail: string
  unitName: string
  propertyName: string
  startDate: string
  endDate: string
  rentAmount: number
  currency: string
  paymentFrequency: string
  depositAmount?: number
}

