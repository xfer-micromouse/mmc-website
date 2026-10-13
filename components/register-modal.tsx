"use client"

import { ArrowUpRight } from "lucide-react"
import { Modal } from "@/components/modal"
import { cn } from "@/lib/utils"
import { EDITION_YEAR } from "@/lib/config"

const CONTACT_TEXT = "Za više informacija kontaktirajte nas na micromouse@xfer.hr"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Prijavi svoj tim">
      <ul className="mt-6 divide-y divide-border border-y border-border">
        <RegisterOption
          href="https://forms.gle/KdXHfawPbWAS6zpM7"
          disabled
          title="Prijave za studente"
          disabledTitle={`Prijave za ${EDITION_YEAR}. uskoro`}
          description="Prijavite svoj tim."
        />
        <RegisterOption
          href="https://docs.google.com/forms/d/e/1FAIpQLSciXOnW3BHTfIST0-UOfecWEY6mIaFp6DtJv2CTQ0HxYaLcCg/viewform?usp=dialog"
          disabled
          title="Predaj životopis"
          disabledTitle="Predaja CV-a uskoro"
          description="Svi natjecatelji predaju svoj životopis."
        />
      </ul>
    </Modal>
  )
}

function RegisterOption({
  href,
  disabled = false,
  title,
  disabledTitle,
  description,
}: {
  href: string
  disabled?: boolean
  title: string
  disabledTitle: string
  description: string
}) {
  const content = (
    <>
      <div>
        <span className="font-medium text-foreground">{disabled ? disabledTitle : title}</span>
        <p className="mt-1 text-sm text-muted">{disabled ? CONTACT_TEXT : description}</p>
      </div>
      {!disabled && (
        <ArrowUpRight
          size={18}
          className="shrink-0 text-accent-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      )}
    </>
  )

  const layout = "flex items-center justify-between gap-4 py-4"

  return (
    <li>
      {disabled ? (
        <div aria-disabled="true" className={cn(layout, "opacity-60")}>
          {content}
        </div>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cn(layout, "group")}>
          {content}
        </a>
      )}
    </li>
  )
}
