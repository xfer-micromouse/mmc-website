"use client"

import { MapPin, Clock } from "lucide-react"
import { Modal } from "@/components/modal"
import { competitionDay } from "@/lib/config"

interface TimelineModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TimelineModal({ isOpen, onClose }: TimelineModalProps) {
  const { date, location, schedule } = competitionDay

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Raspored natjecanja">
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={14} className="text-neon-pink shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={14} className="text-neon-pink shrink-0" />
          <a
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-pink underline-offset-2 hover:underline"
          >
            {location.name}
          </a>
        </div>
      </div>

      <div className="mt-6 flex flex-col">
        {schedule.map((item, index) => (
          <div key={item.time} className="flex items-start gap-4">
            <span className="w-10 shrink-0 pt-0.5 text-right font-mono text-sm font-semibold text-neon-peach">
              {item.time}
            </span>

            <div className="flex flex-col items-center">
              <div className="h-3 w-3 shrink-0 rounded-full border-2 border-neon-pink bg-card" />
              {index < schedule.length - 1 && (
                <div className="w-px flex-1 min-h-[2rem] bg-gradient-to-b from-neon-pink to-neon-purple" />
              )}
            </div>

            <span className="pb-5 pt-0.5 text-sm text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </Modal>
  )
}
