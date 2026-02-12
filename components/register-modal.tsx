"use client"

import { useState } from "react"
import { X, Send } from "lucide-react"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  const handleClose = () => {
    setEmail("")
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Zatvori"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <h3 className="font-display text-2xl font-bold text-foreground">
              Prijavi se
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Prijave su uskoro otvorene. Ostavi svoj email i obavijestit ćemo
              te čim se registracija otvori.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <label htmlFor="email" className="sr-only">
                Email adresa
              </label>
              <div className="flex gap-3">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="tvoj@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink/50"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-neon-peach via-neon-pink to-neon-purple px-5 py-3 text-sm font-semibold text-dark-bg transition-opacity hover:opacity-90"
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">Pošalji</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon-pink/10">
              <Send size={24} className="text-neon-pink" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              Hvala!
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Obavijestit ćemo te na <strong className="text-foreground">{email}</strong> čim se
              prijave otvore.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-lg border border-border px-6 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
            >
              Zatvori
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
