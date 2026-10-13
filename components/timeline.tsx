"use client"

import { useEffect, useState } from "react"
import { SectionHeading, SectionWrapper } from "@/components/section-wrapper"
import { TimelineModal } from "@/components/timeline-modal"
import { timelineData } from "@/lib/config"
import { cn } from "@/lib/utils"

type PhaseState = "done" | "current" | "upcoming"

const dayEnd = (isoDate: string) => new Date(`${isoDate}T23:59:59+02:00`).getTime()
const dayStart = (isoDate: string) => new Date(`${isoDate}T00:00:00+02:00`).getTime()

/** The latest phase that has started is current until the competition day ends. */
function phaseStates(now: number): PhaseState[] {
  const last = timelineData[timelineData.length - 1]
  const started = timelineData.filter((item) => dayStart(item.startsOn) <= now).length
  const finished = now > dayEnd(last.startsOn)
  return timelineData.map((_, i) =>
    finished || i < started - 1 ? "done" : i === started - 1 ? "current" : "upcoming"
  )
}

export function Timeline() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [states, setStates] = useState<PhaseState[] | null>(null)

  // Computed on the client so the static page always reflects today's date.
  useEffect(() => {
    setStates(phaseStates(Date.now()))
  }, [])

  return (
    <SectionWrapper id="timeline">
      <SectionHeading title="Raspored 2026" subtitle="Ključni datumi na putu do natjecanja." />

      <ol className="mt-14 border-l-2 border-accent/70">
        {timelineData.map((item, index) => {
          const state = states?.[index] ?? "upcoming"
          const isLast = index === timelineData.length - 1
          return (
            <li
              key={item.title}
              className="relative pb-12 pl-8 last:pb-0 md:grid md:grid-cols-[11rem_1fr] md:gap-10"
            >
              {/* Solder pad with a drilled hole */}
              <span
                className={cn(
                  "absolute -left-[9px] top-0.5 flex h-4 w-4 items-center justify-center rounded-sm border-2",
                  state === "current" && "border-signal bg-signal/20 shadow-[0_0_14px_rgb(var(--signal)/0.6)]",
                  state === "done" && "border-accent bg-accent",
                  state === "upcoming" && "border-accent bg-background"
                )}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-background" />
              </span>
              <p
                className={cn(
                  "font-mono text-sm tabular-nums",
                  state === "current" ? "text-signal" : "text-muted"
                )}
              >
                {item.date}
                {state === "current" && <span className="ml-2">[ SADA ]</span>}
                {state === "done" && <span className="sr-only"> (završeno)</span>}
              </p>
              <div className="mt-2 max-w-2xl md:mt-0">
                <h3 className="text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-muted leading-relaxed">{item.description}</p>
                {isLast && (
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 font-mono text-sm text-accent-soft underline decoration-accent underline-offset-4 transition-colors hover:text-foreground"
                  >
                    &gt; satnica dana natjecanja
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      <TimelineModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SectionWrapper>
  )
}
