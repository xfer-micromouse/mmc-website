import { Cpu, Radar, Zap } from "lucide-react"
import { SectionHeading, SectionWrapper } from "@/components/section-wrapper"
import { RegisterButton } from "@/components/register-button"
import { competitionStats, sponsorsData, type SponsorTier } from "@/lib/config"
import { cn } from "@/lib/utils"

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
          v1.0 // 2025
        </h2>
        <p className="max-w-xl text-lg text-muted leading-relaxed">
          Prvo izdanje natjecanja bilo je naš prvi build: dokazali smo da se u Zagrebu mogu
          izgraditi miševi koji sami rješavaju labirint. Micromouse Zagreb 2026 je{" "}
          <span className="text-foreground">v2.0</span>, nadograđen svime što smo naučili.
        </p>
      </div>
    </SectionWrapper>
  )
}

const steps = [
  {
    icon: Cpu,
    title: "Izgradi",
    text: "Tim dizajnira i sastavlja autonomnog robota: elektroniku, PCB, senzore i softver.",
  },
  {
    icon: Radar,
    title: "Istraži",
    text: "Robot mapira nepoznati labirint, ćeliju po ćeliju, dok ne pronađe cilj u središtu.",
  },
  {
    icon: Zap,
    title: "Najbrža vožnja",
    text: "Poznatim najkraćim putem robot juri od starta do cilja. Pobjeđuje najbrže vrijeme.",
  },
]

export function HowItWorksSection() {
  return (
    <SectionWrapper id="kako-radi">
      <SectionHeading title="Kako radi" />
      <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        <span
          className="absolute left-5 top-5 hidden h-px bg-accent md:right-[16%] md:block"
          aria-hidden="true"
        />
        {steps.map((step, index) => (
          <li key={step.title} className="relative">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-md border border-accent bg-background text-accent-soft">
              <step.icon size={18} aria-hidden="true" />
            </div>
            <p className="silkscreen mt-5 text-muted">Korak {index + 1}</p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">
              {step.title}
              {index < steps.length - 1 && (
                <span className="ml-2 font-mono text-accent-soft" aria-hidden="true">
                  →
                </span>
              )}
            </h3>
            <p className="mt-2 max-w-xs text-muted leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  )
}

export function ReadoutsSection() {
  return (
    <SectionWrapper id="brojke">
      <SectionHeading title="Ključne brojke" />
      <dl className="mt-12 grid gap-4 sm:grid-cols-3">
        {competitionStats.map((stat) => (
          <div key={stat.channel} className="rounded-md border border-border bg-floor p-5">
            <dt className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted">
              <span>{stat.channel}</span>
              <span className="text-signal">OK</span>
            </dt>
            <dd className="mt-4">
              <span className="font-mono text-5xl tracking-tight text-foreground tabular-nums">
                {stat.value}
              </span>
              <span className="ml-2 font-mono text-lg text-accent-soft">{stat.unit}</span>
              <span
                className="mt-4 block h-2 bg-[repeating-linear-gradient(to_right,rgb(var(--accent))_0_1px,transparent_1px_8px)]"
                aria-hidden="true"
              />
              <span className="mt-3 block text-sm text-muted">{stat.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  )
}

const tierStyles: Record<SponsorTier, { label: string; chip: string; name: string }> = {
  gold: { label: "Zlatni sponzor", chip: "py-10", name: "text-3xl md:text-4xl" },
  silver: { label: "Srebrni sponzor", chip: "py-7", name: "text-2xl" },
  bronze: { label: "Brončani sponzor", chip: "py-5", name: "text-xl" },
  community: { label: "Akademski sponzor", chip: "py-5", name: "text-xl" },
}

export function SponsorsSection() {
  return (
    <SectionWrapper id="sponsors">
      <SectionHeading
        title="Sponzori i Partneri"
        subtitle="Zahvaljujemo se svim partnerima koji podržavaju razvoj robotike u Hrvatskoj."
      />
      <div className="mt-12 rounded-md border border-border bg-[radial-gradient(rgb(var(--border))_1px,transparent_1px)] bg-[length:16px_16px] p-6 md:p-10">
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {sponsorsData.map((sponsor, index) => {
            const style = tierStyles[sponsor.tier]
            return (
              <li key={sponsor.name} className={cn(sponsor.tier === "gold" && "sm:col-span-2")}>
                <p className="silkscreen mb-2 text-muted">
                  IC{index + 1} // {style.label}
                </p>
                <a
                  href={sponsor.websiteLink}
                  className="chip-pins group/chip block px-3 py-[5px]"
                >
                  <span
                    className={cn(
                      "relative flex items-center rounded-sm border border-accent/60 bg-floor px-6 transition-colors group-hover/chip:border-accent-soft",
                      style.chip
                    )}
                  >
                    <span className="absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-muted/60" aria-hidden="true" />
                    <span className={cn("pl-4 font-semibold tracking-tight text-foreground", style.name)}>
                      {sponsor.name}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </SectionWrapper>
  )
}

export function GoalSection() {
  return (
    <SectionWrapper id="prijava">
      <div className="relative mx-auto mt-10 aspect-square max-w-xl rounded-md border border-accent bg-floor bg-[linear-gradient(rgb(var(--accent)/0.35)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--accent)/0.35)_1px,transparent_1px)] bg-[size:6.25%_6.25%]">
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
