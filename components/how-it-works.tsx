"use client"

import { useEffect, useState } from "react"
import { SectionHeading, SectionWrapper } from "@/components/section-wrapper"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Izgradi",
    text: "Tim dizajnira i sastavlja autonomnog robota: PCB, MCU, motore, IR senzore i softver.",
  },
  {
    title: "Istraži",
    text: "Pet IR senzora mjeri zidove dok robot mapira nepoznati labirint, ćeliju po ćeliju, do cilja u središtu.",
  },
  {
    title: "Najbrža vožnja",
    text: "Poznatim najkraćim putem robot juri od starta do cilja. Pobjeđuje najbrže vrijeme.",
  },
]

const CYCLE_MS = 4500

/** "Kako radi": three steps that drive one top-down robot diagram. Auto-advances until the visitor picks a step. */
export function HowItWorks() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % steps.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [auto])

  const select = (index: number) => {
    setAuto(false)
    setActive(index)
  }

  return (
    <SectionWrapper id="kako-radi">
      <SectionHeading title="Kako radi" />

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div role="tablist" aria-label="Koraci" className="flex flex-col gap-3">
          {steps.map((step, index) => {
            const selected = index === active
            return (
              <button
                key={step.title}
                type="button"
                role="tab"
                id={`korak-${index}`}
                aria-selected={selected}
                aria-controls="korak-panel"
                onClick={() => select(index)}
                className={cn(
                  "spotlight group flex items-start gap-4 rounded-md border p-5 text-left transition-colors",
                  selected ? "border-accent bg-surface" : "border-border hover:bg-surface/60"
                )}
              >
                <span
                  className={cn(
                    "w-8 shrink-0 font-mono text-2xl tabular-nums transition-colors",
                    selected ? "text-signal" : "text-accent-soft"
                  )}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-xl font-semibold text-foreground">{step.title}</span>
                  <span
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none",
                      selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-2 text-muted leading-relaxed">{step.text}</span>
                    </span>
                  </span>
                </span>
                {selected && auto && (
                  <span
                    key={active}
                    className="ml-auto mt-1 h-1 w-10 shrink-0 origin-left animate-[progress_4.5s_linear] rounded-full bg-signal/70 motion-reduce:hidden"
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>

        <div id="korak-panel" role="tabpanel" aria-labelledby={`korak-${active}`}>
          <RobotDiagram step={active} />
        </div>
      </div>
    </SectionWrapper>
  )
}

/*
 * Top-down schematic after public/micromouse_preview.png (85 x 103 mm, wheels Ø20),
 * drawn facing up. Robot millimetres map to the 400 x 400 viewBox as
 * screenX = 200 - 2.4 * y and screenY = 262 - 2.4 * x (x forward, y left).
 */
const sensors = [
  { id: "L", x: 98, y: 178, beam: "M98 178H46", labelX: 60, labelY: 168 },
  { id: "LD", x: 128, y: 106, beam: "M128 106L58 36", labelX: 104, labelY: 70 },
  { id: "F", x: 200, y: 80, beam: "M200 80V36", labelX: 212, labelY: 58 },
  { id: "RD", x: 272, y: 106, beam: "M272 106L342 36", labelX: 296, labelY: 70 },
  { id: "R", x: 302, y: 178, beam: "M302 178H354", labelX: 340, labelY: 168 },
]

/** Top-down schematic of the micromouse; each step highlights a different part of it. */
function RobotDiagram({ step }: { step: number }) {
  const build = step === 0
  const explore = step === 1
  const run = step === 2

  const part = (on: boolean) => cn("transition-colors duration-500", on ? "stroke-signal" : "stroke-accent")
  const fade = (on: boolean) => cn("transition-opacity duration-500", on ? "opacity-100" : "opacity-0")
  const label = (on: boolean) => cn("font-mono text-[11px] uppercase tracking-wider fill-foreground", fade(on))

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full rounded-md border border-border bg-floor"
      role="img"
      aria-label={
        build
          ? "Shema micromouse robota odozgo, 85 x 103 mm: MCU, baterija, dva motora, kotači promjera 20 mm i pet IR senzora."
          : explore
            ? "Pet IR senzora (lijevo, lijevo-dijagonalno, naprijed, desno-dijagonalno, desno) mjeri udaljenost do zidova labirinta."
            : "Robot vozi najkraćim putem punom brzinom."
      }
    >
      {/* Maze walls around the robot, detected while exploring */}
      <g strokeWidth="6" strokeLinecap="square" className={cn("transition-opacity duration-500", explore ? "opacity-100" : "opacity-[0.15]")}>
        <path d="M40 30H360" className="stroke-signal" />
        <path d="M40 30V370" className="stroke-signal" />
        <path d="M360 30V370" className="stroke-signal" />
      </g>

      {/* IR beams: L, LD, F, RD, R */}
      <g strokeWidth="2" strokeDasharray="4 5" className={cn("stroke-signal", fade(explore))}>
        {sensors.map((s) => (
          <path key={s.id} d={s.beam} className="ir-beam" />
        ))}
      </g>
      {sensors.map((s) => (
        <text key={s.id} x={s.labelX} y={s.labelY} textAnchor="middle" className={cn(label(explore), "fill-signal")}>
          {s.id}
        </text>
      ))}

      {/* Speed trail behind the robot */}
      <g strokeWidth="3" strokeLinecap="round" className={cn("stroke-signal", fade(run))}>
        <path d="M150 334V380" className="opacity-60" />
        <path d="M200 334V392" />
        <path d="M250 334V380" className="opacity-60" />
      </g>

      {/* Board: rectangular rear, semicircular front */}
      <path
        d="M98 322V178A102 102 0 0 1 302 178V322Z"
        strokeWidth="2.5"
        className={cn("fill-background transition-colors duration-500", run ? "stroke-signal" : "stroke-accent-soft")}
      />
      <path d="M98 178H302" strokeWidth="1" className="stroke-accent/50" />

      {/* Wheels (Ø20 mm, 10 mm wide) */}
      <g strokeWidth="2.5" className={part(build || run)}>
        <rect x="92" y="238" width="24" height="48" rx="3" className="fill-floor" />
        <rect x="284" y="238" width="24" height="48" rx="3" className="fill-floor" />
      </g>

      {/* Motors */}
      <g strokeWidth="2" fill="none" className={part(build || run)}>
        <rect x="114" y="243" width="38" height="38" rx="2" />
        <rect x="248" y="243" width="38" height="38" rx="2" />
      </g>

      {/* MCU with pins, centre of mass marker */}
      <g strokeWidth="2" fill="none" className={part(build)}>
        <rect x="176" y="214" width="48" height="48" rx="2" />
        <path d="M184 210v-6M194 210v-6M204 210v-6M214 210v-6" />
      </g>
      <path d="M194 226h12M200 220v12" strokeWidth="1.5" className={cn("stroke-foreground", fade(build))} />

      {/* Battery */}
      <rect x="176" y="267" width="48" height="58" rx="3" strokeWidth="2" fill="none" className={part(build)} />

      {/* Front support */}
      <circle cx="200" cy="118" r="12" strokeWidth="2" fill="none" className="stroke-accent" />

      {/* IR sensors */}
      {sensors.map((s) => (
        <circle key={s.id} cx={s.x} cy={s.y} r="7" strokeWidth="2" className={cn("fill-floor", part(build || explore))} />
      ))}

      {/* Callouts (build step) */}
      <g className={cn("stroke-muted/60", fade(build))} strokeWidth="1" fill="none">
        <path d="M224 238H330V214" />
        <path d="M128 106H64V86" />
        <path d="M92 270H58V298" />
        <path d="M224 300H330V320" />
      </g>
      <text x="330" y="206" textAnchor="middle" className={label(build)}>MCU</text>
      <text x="64" y="78" textAnchor="middle" className={label(build)}>IR x5</text>
      <text x="58" y="314" textAnchor="middle" className={label(build)}>kotač</text>
      <text x="330" y="336" textAnchor="middle" className={label(build)}>baterija</text>
      <text x="200" y="252" textAnchor="middle" className={cn(label(build), "text-[9px]")}>CoM</text>
      <text x="200" y="392" textAnchor="middle" className={cn(label(build), "fill-muted")}>85 x 103 mm</text>

      <text x="200" y="20" textAnchor="middle" className={cn(label(run), "fill-signal")}>speed run</text>
    </svg>
  )
}
