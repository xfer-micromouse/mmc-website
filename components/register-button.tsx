"use client"

import { useOpenRegister } from "@/components/site-shell"
import { buttonStyles } from "@/lib/ui"
import { cn } from "@/lib/utils"

export function RegisterButton({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  const openRegister = useOpenRegister()

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.()
        openRegister()
      }}
      className={cn(buttonStyles.primary, className)}
    >
      Prijavi tim
    </button>
  )
}
