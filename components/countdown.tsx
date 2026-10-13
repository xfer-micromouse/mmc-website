"use client"

import { useEffect, useState } from "react"
import { competitionDay } from "@/lib/config"

const target = new Date(competitionDay.startsAt).getTime()
const units = [
  ["dana", 86_400_000],
  ["sati", 3_600_000],
  ["min", 60_000],
  ["sek", 1000],
] as const

/** Countdown to the competition start; rendered empty on the server to avoid a hydration mismatch. */
export function Countdown() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (now !== null && now >= target) {
    return (
      <p className="font-mono text-sm text-muted">
        <span className="text-signal">&gt;</span> Natjecanje je održano {competitionDay.date}
      </p>
    )
  }

  let rest = now === null ? null : target - now
  return (
    <dl className="flex gap-3 font-mono" aria-label={`Odbrojavanje do natjecanja, ${competitionDay.date}`}>
      {units.map(([name, ms]) => {
        const value = rest === null ? null : Math.floor(rest / ms)
        if (rest !== null && value !== null) rest -= value * ms
        return (
          <div key={name} className="min-w-[3.75rem] rounded-md border border-border bg-floor px-3 py-2">
            <dd className="text-2xl tabular-nums text-foreground">
              {value === null ? "--" : String(value).padStart(2, "0")}
            </dd>
            <dt className="text-[11px] uppercase tracking-wider text-muted">{name}</dt>
          </div>
        )
      })}
    </dl>
  )
}
