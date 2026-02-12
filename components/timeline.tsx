"use client"

import { Rocket, CheckCircle, Clock, Trophy, Award } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { timelineData } from "@/lib/config"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const iconMap = {
  rocket: Rocket,
  check: CheckCircle,
  clock: Clock,
  trophy: Trophy,
  award: Award,
} as const

export function Timeline() {
  return (
    <SectionWrapper id="timeline">
      <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        Raspored
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground leading-relaxed">
        Ključni datumi na putu do natjecanja.
      </p>

      <div className="relative mt-16">
        {/* Vertical line */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple via-neon-pink to-neon-peach md:left-1/2 md:-translate-x-px"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-12">
          {timelineData.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timelineData)[number]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.2)
  const Icon = iconMap[item.iconType]
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-start gap-6 transition-all duration-700 md:gap-0",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon dot */}
      <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border bg-card md:absolute md:left-1/2 md:-translate-x-1/2">
        <Icon size={16} className="text-neon-pink" />
      </div>

      {/* Card */}
      <div
        className={cn(
          "flex-1 rounded-xl border border-border bg-card p-5 md:max-w-[calc(50%-2.5rem)]",
          isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
        )}
      >
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-neon-peach">
          {item.date}
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  )
}
