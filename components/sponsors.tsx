"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { sponsorsData } from "@/lib/config"
import { cn } from "@/lib/utils"

const tierStyles = {
  gold: "border-neon-peach/40 hover:border-neon-peach/70",
  silver: "border-border hover:border-neon-pink/40",
  bronze: "border-border hover:border-neon-purple/40",
} as const

const tierLabels = {
  gold: "Zlatni sponzor",
  silver: "Srebrni sponzor",
  bronze: "Brončani sponzor",
} as const

export function Sponsors() {
  return (
    <SectionWrapper id="sponsors">
      <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        Sponzori i Partneri
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground leading-relaxed">
        Zahvaljujemo se svim partnerima koji podržavaju razvoj robotike u
        Hrvatskoj.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sponsorsData.map((sponsor) => (
          <div
            key={sponsor.name}
            className={cn(
              "glass flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center transition-all duration-300",
              tierStyles[sponsor.tier]
            )}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {tierLabels[sponsor.tier]}
            </span>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {sponsor.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {sponsor.placeholderText}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
