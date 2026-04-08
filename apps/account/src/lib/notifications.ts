"use client"

import { toast } from "sonner"

type ToastEvent =
  | "auth.otp.sent"
  | "auth.otp.verified"
  | "auth.invite.accepted"
  | "org.created"

const toastRegistry: Record<ToastEvent, { message: string }> = {
  "auth.otp.sent": { message: "Code sent to email" },
  "auth.otp.verified": { message: "Email verified" },
  "auth.invite.accepted": { message: "Invite accepted" },
  "org.created": { message: "Organization created" },
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
  orgCreated: () => notify("org.created"),
}
