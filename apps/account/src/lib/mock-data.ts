"use client"

export type Organization = {
  id: string
  name: string
  role: "owner" | "operator" | "occupant"
}

export type Member = {
  id: string
  name: string
  email: string
  role: "owner" | "operator" | "occupant"
}

export type Invite = {
  id: string
  email: string
  role: "owner" | "operator" | "occupant"
}

export type JoinRequest = {
  id: string
  name: string
  email: string
  message: string
}

export type UserProfile = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  username: string
  avatarUrl: string | null
  dateOfBirth: string
  phone: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  systemRole: "superadmin" | "support" | "user"
  createdAt: string
  updatedAt: string
}

export const mockOrganizations: Organization[] = [
  { id: "org-1", name: "Acme Corporation", role: "owner" },
  { id: "org-2", name: "Tech Solutions Ltd", role: "operator" },
]

export const mockMembers: Member[] = [
  { id: "m-1", name: "James Cooper", email: "jamescooper@work.com", role: "owner" },
  { id: "m-2", name: "Leah Morgan", email: "leah@work.com", role: "operator" },
  { id: "m-3", name: "Daniel Reed", email: "daniel@work.com", role: "occupant" },
]

export const mockInvites: Invite[] = [
  { id: "inv-1", email: "sam@work.com", role: "operator" },
  { id: "inv-2", email: "zoe@work.com", role: "occupant" },
]

export const mockJoinRequests: JoinRequest[] = [
  { id: "jr-1", name: "Maya Clarke", email: "maya@work.com", message: "I would like to join." },
  { id: "jr-2", name: "Owen Grant", email: "owen@work.com", message: "Please approve access." },
]

export const mockUser: UserProfile = {
  id: "user-123",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  username: "john.doe",
  avatarUrl: null,
  dateOfBirth: "1990-01-01",
  phone: "+256700000000",
  isEmailVerified: true,
  isPhoneVerified: false,
  systemRole: "user",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
}
