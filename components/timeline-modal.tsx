"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X, MapPin, Clock } from "lucide-react"

interface TimelineModalProps {
  isOpen: boolean
  onClose: () => void
}

const schedule = [
  { time: "14:00", label: "Otvorenje" },
  { time: "14:30", label: "Priprema i networking" },
  { time: "15:30", label: "Početak natjecanja" },
  { time: "17:15", label: "Prezentacije" },
  { time: "17:45", label: "Proglašenje" },
]

export function TimelineModal({ isOpen, onClose }: TimelineModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted) return null

  return createPortal(
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
          Raspored natjecanja
        </h3>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} className="text-neon-pink shrink-0" />
            <span>31. svibnja 2026.</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} className="text-neon-pink shrink-0" />
            <a
              href="https://maps.app.goo.gl/PrnWBgGW7KkRxycw7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-pink underline-offset-2 hover:underline"
            >
              Algebra sveučilište
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col">
        {schedule.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Vrijeme */}
            <span className="w-10 shrink-0 pt-0.5 text-right font-mono text-sm font-semibold text-neon-peach">
              {item.time}
            </span>

            {/* Crta + kružić */}
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 shrink-0 rounded-full border-2 border-neon-pink bg-card" />
              {index < schedule.length - 1 && (
                <div className="w-px flex-1 min-h-[2rem] bg-gradient-to-b from-neon-pink to-neon-purple" />
              )}
            </div>

            {/* Label */}
            <span className="pb-5 pt-0.5 text-sm text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
      </div>
    </div>,
    document.body
  )
}