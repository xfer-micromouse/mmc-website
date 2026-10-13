"use client"

import { MapPin, CalendarDays } from "lucide-react"
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
      <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted">
        <p className="flex items-center gap-2">
          <CalendarDays size={14} className="shrink-0" />
          {date}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={14} className="shrink-0" />
          <a
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent-soft"
          >
            {location.name}
          </a>
        </p>
      </div>

      <ol className="mt-6 border-l border-border">
        {schedule.map((item) => (
          <li key={item.time} className="relative grid grid-cols-[3.5rem_1fr] gap-3 py-2.5 pl-5">
            <span
              className="absolute -left-[3px] top-[1.05rem] h-[5px] w-[5px] bg-accent"
              aria-hidden="true"
            />
            <span className="font-mono text-sm tabular-nums text-muted">{item.time}</span>
            <span className="text-sm text-foreground">{item.label}</span>
          </li>
        ))}
      </ol>
    </Modal>
  )
}
