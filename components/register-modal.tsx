"use client"

import { X, GraduationCap, Users } from "lucide-react"

const STUDENT_FORM_URL = "#" // TODO: Replace with actual Google Forms link
const OSTALI_FORM_URL = "#" // TODO: Replace with actual Google Forms link

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}
const IS_DISABLED = true;

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Zatvori"
        >
          <X size={20} />
        </button>

        <h3 className="font-display text-2xl font-bold text-foreground">
          Prijave Kreću uskoro
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Stay tuned...
        </p> 

        <div className="mt-6 flex flex-col gap-4">
    {/* Student Link */}
    <a 
      href={IS_DISABLED ? undefined : STUDENT_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={IS_DISABLED}
      className={`
        group flex items-center gap-4 rounded-xl border border-border p-4 transition-all
        ${IS_DISABLED 
          ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" 
          : "hover:border-neon-pink hover:shadow-[0_0_20px_rgba(255,94,120,0.15)]"
        }
      `}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neon-pink/10">
        <GraduationCap size={24} className="text-neon-pink" />
      </div>
      <div>
        <span className="font-display text-base font-semibold text-foreground">
          {IS_DISABLED ? "Prijave nisu počele" : "Student prijave"}
        </span>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {IS_DISABLED ? "" : "Za studente"}
        </p>
      </div>
    </a>

    {/* Ostali Link */}
    <a
      href={IS_DISABLED ? undefined : OSTALI_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={IS_DISABLED}
      className={`
        group flex items-center gap-4 rounded-xl border border-border p-4 transition-all
        ${IS_DISABLED 
          ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" 
          : "hover:border-neon-purple hover:shadow-[0_0_20px_rgba(166,74,245,0.15)]"
        }
      `}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neon-purple/10">
        <Users size={24} className="text-neon-purple" />
      </div>
      <div>
        <span className="font-display text-base font-semibold text-foreground">
          {IS_DISABLED ? "Prijave nisu počele" : "Prijave za ostale"}
        </span>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {IS_DISABLED ? "" : "Za sve ostale zainteresirane"}
        </p>
      </div>
    </a>
  </div>
      </div>
    </div>
  )
}
