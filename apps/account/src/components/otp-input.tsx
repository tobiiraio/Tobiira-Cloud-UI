"use client"

import { useState, useRef, useEffect } from "react"

interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
}

const getOTPLength = (): number => {
  // Read from NEXT_PUBLIC_ environment variable
  const envLength = process.env.NEXT_PUBLIC_OTP_LENGTH
  return envLength ? parseInt(envLength, 10) : 6
}

export function OTPInput({ value, onChange, length, disabled = false }: OTPInputProps) {
  const otpLength = length || getOTPLength()
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, otpLength)
  }, [otpLength])

  const setRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el
  }

  const handleInputChange = (index: number, inputValue: string) => {
    // Only allow numeric input
    const numericValue = inputValue.replace(/\D/g, "")

    if (numericValue.length > 1) {
      // If multiple digits pasted, distribute them across inputs
      const newValue = value.split("")
      for (let i = 0; i < numericValue.length && index + i < otpLength; i++) {
        newValue[index + i] = numericValue[i]
      }
      const finalValue = newValue.join("").slice(0, otpLength)
      onChange(finalValue)

      // Focus next empty input or last input
      const nextIndex = Math.min(index + numericValue.length, otpLength - 1)
      inputRefs.current[nextIndex]?.focus()
    } else if (numericValue.length === 1) {
      // Single digit input
      const newValue = value.split("")
      newValue[index] = numericValue
      const finalValue = newValue.join("")
      onChange(finalValue)

      // Auto-focus next input if not the last one
      if (index < otpLength - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    } else if (inputValue === "") {
      // Backspace - clear current and focus previous
      const newValue = value.split("")
      newValue[index] = ""
      onChange(newValue.join(""))

      if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      // If backspace on empty input, move to previous
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleFocus = (index: number) => {
    setFocusedIndex(index)
  }

  const handleBlur = () => {
    setFocusedIndex(null)
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: otpLength }, (_, index) => (
        <input
          key={index}
          ref={setRef(index)}
          type="text"
          inputMode="numeric"
          value={value[index] || ""}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          disabled={disabled}
          className={`
            w-12 h-12 text-center text-lg font-semibold
            rounded-xl border-2 bg-background shadow-[0_1px_2px_0_hsl(var(--foreground)/0.08)]
            transition-all duration-200
            ${focusedIndex === index
              ? "border-primary ring-2 ring-primary/20"
              : "border-input"
            }
            ${value[index] ? "text-foreground" : "text-muted-foreground"}
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          maxLength={1}
        />
      ))}
    </div>
  )
}
