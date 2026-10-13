"use client"

import { useState } from "react"
import { Rocket, CheckCircle, Clock, Award } from "lucide-react"
import { SectionHeading, SectionWrapper } from "@/components/section-wrapper"
import { timelineData } from "@/lib/config"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { TimelineModal } from "@/components/timeline-modal"

type TimelineEntry = (typeof timelineData)[number]

const iconMap = {
  rocket: Rocket,
  check: CheckCircle,
  clock: Clock,
  award: Award,
} as const

export function Timeline() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <SectionWrapper id="timeline">
      <SectionHeading
        title="Raspored"
        subtitle="Ključni datumi na putu do natjecanja."
      />

      <div className="relative mt-16">
        <div
          className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple via-neon-pink to-neon-peach md:left-1/2 md:-translate-x-px"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-12">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.title}
              item={item}
              index={index}
              onScheduleClick={() => setIsModalOpen(true)}
            />
          ))}
        </div>
      </div>

      <TimelineModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SectionWrapper>
  )
}

function TimelineItem({
  item,
  index,
  onScheduleClick,
}: {
  item: TimelineEntry
  index: number
  onScheduleClick: () => void
}) {
  const { ref, isVisible } = useScrollReveal(0.2)
  const Icon = iconMap[item.iconType]
  const isLeft = index % 2 === 0
  const isLast = index === timelineData.length - 1

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-start transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Desktop spacer for the opposite half; card sits left or right of the dot */}
      <div
        className={cn(
          "hidden md:block md:w-[calc(50%-1.125rem)]",
          isLeft && "md:order-last"
        )}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border bg-card">
        <Icon size={16} className="text-neon-pink" />
      </div>

      <div
        className={cn(
          "flex-1 pl-6 md:w-[calc(50%-1.125rem)] md:flex-none",
          isLeft ? "md:order-first md:pl-0 md:pr-8" : "md:pl-8"
        )}
      >
        <CardContent
          item={item}
          isLast={isLast}
          onScheduleClick={onScheduleClick}
        />
      </div>
    </div>
  )
}

function CardContent({
  item,
  isLast,
  onScheduleClick,
}: {
  item: TimelineEntry
  isLast: boolean
  onScheduleClick: () => void
}) {
  return (
    <div className="relative rounded-xl border border-border bg-card p-5 w-full">
      <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-neon-peach">
        {item.date}
      </span>
      {isLast && (
        <button
          onClick={onScheduleClick}
          className="absolute top-4 right-4 inline-flex rounded-full bg-neon-pink px-4 py-2 text-sm font-medium text-card transition hover:bg-neon-peach"
        >
          Timeline
        </button>
      )}
      <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
        {item.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {item.description}
      </p>
    </div>
  )
}
