"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonLoader } from "./button-loader"

interface OTPButtonProps {
  isLoading?: boolean
  disabled?: boolean
  onClick?: (event: React.FormEvent) => void
  children?: React.ReactNode
  text?: string
}

export function OTPButton({ isLoading = false, disabled = false, onClick, children, text = "Get OTP" }: OTPButtonProps) {
  return (
    <Button
      type="submit"
      size="pill"
      disabled={disabled || isLoading}
      className="w-full flex justify-between pr-0"
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {isLoading && <ButtonLoader size="sm" />}
        {isLoading ? "Sending..." : (children || text)}
      </span>
      <span className="bg-white/40 dark:bg-black/15 backdrop-blur-md rounded-full h-12 w-12 flex items-center justify-center border border-white/30 dark:border-white/10">
        <ChevronRight className="h-6 w-6" />
      </span>
    </Button>
  )
}
