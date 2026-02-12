"use client"

import { SectionWrapper } from "@/components/section-wrapper"

export function VideoSection() {
  return (
    <SectionWrapper id="what-is">
      <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        {"Što je Micromouse?"}
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground leading-relaxed">
        Pogledajte video i saznajte više o jednom od najstarijih robotičkih
        natjecanja na svijetu.
      </p>

      <div className="relative mx-auto mt-12 max-w-3xl">
        {/* Glow effect */}
        <div
          className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-neon-peach/20 via-neon-pink/20 to-neon-purple/20 blur-xl"
          aria-hidden="true"
        />

        {/* Video container */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/ZMQbHMgK2rw"
              title="Što je Micromouse? - Veritasium"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
