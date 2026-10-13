"use client"

import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { homeSections, type HomeSectionId } from "@/lib/config"

interface SectionWrapperProps {
  id: HomeSectionId
  children: React.ReactNode
  className?: string
}

/**
 * A home page section on the PCB trace. Carries its silkscreen designator
 * ("U1 // O NATJECANJU"); the trace marks it `data-lit` once visited.
 */
export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  const { ref, isVisible } = useScrollReveal()
  const section = homeSections.find((s) => s.id === id)!

  return (
    <section
      id={id}
      ref={ref}
      data-section
      className={cn(
        "group py-20 pl-10 pr-4 transition duration-700 ease-out md:px-12 md:py-28",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <p className="silkscreen text-muted transition-colors duration-500 group-data-[lit=true]:text-signal">
          {section.designator} // {section.label}
        </p>
        {children}
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mt-4 max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-tight text-accent-soft text-balance md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-muted leading-relaxed">{subtitle}</p>}
    </div>
  )
}
