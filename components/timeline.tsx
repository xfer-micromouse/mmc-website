"use client"

import { useState } from "react"
import { Rocket, CheckCircle, Clock, Trophy, Award } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { timelineData } from "@/lib/config"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { TimelineModal } from "@/components/timeline-modal"

const iconMap = {
  rocket: Rocket,
  check: CheckCircle,
  clock: Clock,
  trophy: Trophy,
  award: Award,
} as const

export function Timeline() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <SectionWrapper id="timeline">
      <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        Raspored
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground leading-relaxed">
        Ključni datumi na putu do natjecanja.
      </p>

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
              onTimelineClick={() => setIsModalOpen(true)}
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
  onTimelineClick,
}: {
  item: (typeof timelineData)[number]
  index: number
  onTimelineClick?: () => void
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
      {/* Left card slot */}
      <div className="hidden md:flex md:w-[calc(50%-1.125rem)] justify-end pr-8">
        {isLeft && (
          <CardContent
            item={item}
            isLeft={true}
            isLast={isLast}
            onTimelineClick={onTimelineClick}
          />
        )}
      </div>

      {/* Center icon dot */}
      <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border bg-card
        md:mx-0
        /* mobile: sits naturally in flow */
      ">
        <Icon size={16} className="text-neon-pink" />
      </div>

      {/* Right card slot */}
      <div className="flex-1 pl-6 md:w-[calc(50%-1.125rem)] md:flex-none md:pl-8">
        {/* Mobile: always show card here */}
        <div className="md:hidden">
          <CardContent
            item={item}
            isLeft={false}
            isLast={isLast}
            onTimelineClick={onTimelineClick}
          />
        </div>
        {/* Desktop: only right-side items */}
        {!isLeft && (
          <div className="hidden md:block">
            <CardContent
              item={item}
              isLeft={false}
              isLast={isLast}
              onTimelineClick={onTimelineClick}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function CardContent({
  item,
  isLeft,
  isLast,
  onTimelineClick,
}: {
  item: (typeof timelineData)[number]
  isLeft: boolean
  isLast: boolean
  onTimelineClick?: () => void
}) {
  return (
    <div className="relative rounded-xl border border-border bg-card p-5 w-full">
      <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-neon-peach">
        {item.date}
      </span>
      {isLast && (
        <button
          onClick={onTimelineClick}
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