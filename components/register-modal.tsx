"use client"

import { GraduationCap, FileText, type LucideIcon } from "lucide-react"
import { Modal } from "@/components/modal"
import { cn } from "@/lib/utils"

const CONTACT_TEXT = "Za više informacija kontaktirajte nas na micromouse@xfer.hr"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Prijavi svoj tim">
      <div className="mt-6 flex flex-col gap-4">
        <RegisterOption
          href="https://forms.gle/KdXHfawPbWAS6zpM7"
          disabled
          icon={GraduationCap}
          accent="pink"
          title="Prijave za studente"
          disabledTitle="Prijave su završene"
          description="Prijave završavaju 15. ožujka 2026."
        />
        <RegisterOption
          href="https://docs.google.com/forms/d/e/1FAIpQLSciXOnW3BHTfIST0-UOfecWEY6mIaFp6DtJv2CTQ0HxYaLcCg/viewform?usp=dialog"
          icon={FileText}
          accent="peach"
          title="Predaj životopis"
          disabledTitle="Predaja CV-a zatvorena"
          description="Svi natjecatelji moraju predati svoj životopis do 1. travnja 2026."
        />
      </div>
    </Modal>
  )
}

const accentStyles = {
  pink: {
    hover: "hover:border-neon-pink",
    iconBg: "bg-neon-pink/10",
    icon: "text-neon-pink",
  },
  peach: {
    hover: "hover:border-neon-peach",
    iconBg: "bg-neon-peach/10",
    icon: "text-neon-peach",
  },
} as const

function RegisterOption({
  href,
  disabled = false,
  icon: Icon,
  accent,
  title,
  disabledTitle,
  description,
}: {
  href: string
  disabled?: boolean
  icon: LucideIcon
  accent: keyof typeof accentStyles
  title: string
  disabledTitle: string
  description: string
}) {
  const styles = accentStyles[accent]

  return (
    <a
      href={disabled ? undefined : href}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={disabled}
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-border p-4 transition-all",
        disabled
          ? "pointer-events-none cursor-not-allowed opacity-50 grayscale"
          : cn(styles.hover, "hover:shadow-[0_0_20px_rgba(255,94,120,0.15)]")
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
          styles.iconBg
        )}
      >
        <Icon size={24} className={styles.icon} />
      </div>
      <div>
        <span className="font-display text-base font-semibold text-foreground">
          {disabled ? disabledTitle : title}
        </span>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {disabled ? CONTACT_TEXT : description}
        </p>
      </div>
    </a>
  )
}
