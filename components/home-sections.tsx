import { SectionHeading, SectionWrapper } from "@/components/section-wrapper"
import { RegisterButton } from "@/components/register-button"
import { DecodeText } from "@/components/decode-text"
import { EDITION_YEAR, FIRST_EDITION_YEAR } from "@/lib/config"

export function WhatIsSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        title="Što je Micromouse?"
        subtitle="Mali autonomni robot samostalno istražuje nepoznati labirint i traži najbrži put od starta do cilja, koristeći vlastite senzore i algoritme, bez ikakve vanjske pomoći. Natjecatelji ga grade i programiraju iz nule."
      />
      <div className="mt-12 aspect-video overflow-hidden rounded-md border border-border bg-floor">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/ZMQbHMgK2rw"
          title="Što je Micromouse? - Veritasium"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </SectionWrapper>
  )
}

export function FirstEditionSection() {
  return (
    <SectionWrapper id="v1">
      <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-end md:gap-12">
        <h2 className="font-mono text-4xl font-medium tracking-tight text-accent-soft md:text-6xl">
          <DecodeText text={`v1.0 // ${FIRST_EDITION_YEAR}`} />
        </h2>
        <p className="max-w-xl text-lg text-muted leading-relaxed">
          Prvo izdanje, Micromouse Zagreb {FIRST_EDITION_YEAR}, bilo je naš prvi build: dokazali smo da se
          u Zagrebu mogu izgraditi miševi koji sami rješavaju labirint. Micromouse Zagreb {EDITION_YEAR} je{" "}
          <span className="text-foreground">v2.0</span>, nadograđen svime što smo naučili.
        </p>
      </div>
    </SectionWrapper>
  )
}

export function GoalSection() {
  return (
    <SectionWrapper id="prijava">
      <div className="relative mx-auto mt-10 aspect-square max-w-xl rounded-md border border-accent bg-floor bg-[linear-gradient(rgb(var(--accent)/0.35)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--accent)/0.35)_1px,transparent_1px)] bg-[size:6.25%_6.25%]">
        <div className="grid-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-[18.75%] flex sm:inset-[31.25%] flex-col items-center justify-center gap-4 rounded-sm border border-signal bg-background text-center shadow-[0_0_40px_rgb(var(--signal)/0.15)]">
          <p className="silkscreen text-signal">Goal (7,7)-(8,8)</p>
          <RegisterButton />
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-xl text-center text-muted">
        Cilj je u središtu labirinta. Put do njega počinje prijavom.
      </p>
    </SectionWrapper>
  )
}
