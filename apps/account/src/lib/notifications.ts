"use client"

import { toast } from "sonner"

type ToastEvent =
  | "auth.otp.sent"
  | "auth.otp.verified"
  | "auth.invite.accepted"
  | "auth.logged.out"
  | "org.created"
  | "org.updated"
  | "org.settings.updated"
  | "member.invited"
  | "member.role.updated"
  | "member.removed"
  | "invite.revoked"
  | "join.request.sent"
  | "join.request.resolved"

const toastRegistry: Record<ToastEvent, { message: string }> = {
  "auth.otp.sent": { message: "Code sent to email" },
  "auth.otp.verified": { message: "Email verified" },
  "auth.invite.accepted": { message: "Invite accepted" },
  "auth.logged.out": { message: "Logged out" },
  "org.created": { message: "Organization created" },
  "org.updated": { message: "Organization updated" },
  "org.settings.updated": { message: "Settings updated" },
  "member.invited": { message: "Invite sent" },
  "member.role.updated": { message: "Role updated" },
  "member.removed": { message: "Member removed" },
  "invite.revoked": { message: "Invite revoked" },
  "join.request.sent": { message: "Join request sent" },
  "join.request.resolved": { message: "Join request updated" },
}

export function notify(event: ToastEvent) {
  const entry = toastRegistry[event]
  if (!entry) return
  toast.success(entry.message)
}

export function isToastEvent(event: string): event is ToastEvent {
  return event in toastRegistry
}

export const notifications = {
  authOtpSent: () => notify("auth.otp.sent"),
  authOtpVerified: () => notify("auth.otp.verified"),
  authInviteAccepted: () => notify("auth.invite.accepted"),
  authLoggedOut: () => notify("auth.logged.out"),
  orgCreated: () => notify("org.created"),
  orgUpdated: () => notify("org.updated"),
  orgSettingsUpdated: () => notify("org.settings.updated"),
  memberInvited: () => notify("member.invited"),
  memberRoleUpdated: () => notify("member.role.updated"),
  memberRemoved: () => notify("member.removed"),
  inviteRevoked: () => notify("invite.revoked"),
  joinRequestSent: () => notify("join.request.sent"),
  joinRequestResolved: () => notify("join.request.resolved"),
}
