"use client"

import { useEffect, useState } from "react"
import { SectionHeading, SectionWrapper } from "@/components/section-wrapper"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { competitionStats } from "@/lib/config"
import { cn } from "@/lib/utils"

const DURATION_MS = 1400

/** Counts every number inside `value` up from zero, like an instrument settling on a reading. */
function useCountUp(value: string, active: boolean) {
  // null until hydrated, so the server HTML (and no-JS visitors) show the real reading.
  const [progress, setProgress] = useState<number | null>(null)

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!active || reduced) {
      setProgress(reduced ? 1 : 0)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1)
      setProgress(1 - Math.pow(1 - t, 3))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active])

  if (progress === null) return value
  return value.replace(/\d+/g, (digits) => String(Math.round(Number(digits) * progress)))
}

export function Readouts() {
  const { ref, isVisible } = useScrollReveal<HTMLDListElement>(0.4)

  return (
    <SectionWrapper id="brojke">
      <SectionHeading title="Ključne brojke" />
      <dl ref={ref} className="mt-12 grid gap-4 sm:grid-cols-3">
        {competitionStats.map((stat) => (
          <Readout key={stat.channel} stat={stat} active={isVisible} />
        ))}
      </dl>
    </SectionWrapper>
  )
}

function Readout({ stat, active }: { stat: (typeof competitionStats)[number]; active: boolean }) {
  const value = useCountUp(stat.value, active)
  const settled = value === stat.value

  return (
    <div className="spotlight rounded-md border border-border bg-floor p-5">
      <dt className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted">
        <span>{stat.channel}</span>
        <span className={settled ? "text-signal" : "text-accent-soft"}>{settled ? "OK" : "READ"}</span>
      </dt>
      <dd className="mt-4">
        <span className="sr-only">
          {stat.value} {stat.unit}
        </span>
        <span aria-hidden="true">
          <span className="font-mono text-5xl tracking-tight text-foreground tabular-nums">{value}</span>
          <span className="ml-2 font-mono text-lg text-accent-soft">{stat.unit}</span>
        </span>
        <span className="relative mt-4 block h-2" aria-hidden="true">
          <span className="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgb(var(--accent)/0.5)_0_1px,transparent_1px_8px)]" />
          <span
            className={cn(
              "absolute inset-0 origin-left bg-[repeating-linear-gradient(to_right,rgb(var(--signal))_0_1px,transparent_1px_8px)] transition-transform duration-[1400ms] ease-out motion-reduce:transition-none",
              active ? "scale-x-100" : "scale-x-0"
            )}
          />
        </span>
        <span className="mt-3 block text-sm text-muted">{stat.label}</span>
      </dd>
    </div>
  )
}
