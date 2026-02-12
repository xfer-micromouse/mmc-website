"use client"

import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface SectionWrapperProps {
  id?: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative px-4 py-20 md:py-28 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
