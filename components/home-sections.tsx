import { SectionHeading, SectionWrapper } from "@/components/section-wrapper"
import { faq } from "@/lib/config"
import { YouTubeFacade } from "@/components/youtube-facade"

export function WhatIsSection() {
  return (
    <SectionWrapper id="about">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <SectionHeading
          title="Što je Micromouse?"
          subtitle="Mali autonomni robot samostalno istražuje nepoznati labirint i traži najbrži put od starta do cilja, koristeći vlastite senzore i algoritme, bez ikakve vanjske pomoći. Natjecatelji ga grade i programiraju iz nule."
        />
        <div className="aspect-video overflow-hidden rounded-md border border-border bg-floor">
          <YouTubeFacade id="ZMQbHMgK2rw" title="Što je Micromouse? - Veritasium" />
        </div>
      </div>
    </SectionWrapper>
  )
}

export function FaqSection() {
  return (
    <SectionWrapper id="faq">
      <SectionHeading title="Česta pitanja" />
      <div className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
        {faq.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="font-mono text-accent-soft transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-muted leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </SectionWrapper>
  )
}
