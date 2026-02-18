"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { competitionStats } from "@/lib/config"

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Left Column - Text */}
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            O Natjecanju
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Micromouse Zagreb je studentsko robotičarsko natjecanje u kojem mali autonomni robot samostalno
            istražuje i rješava labirint. Natjecatelji grade i programiraju robota iz nule.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Robot mora pronaći najbrži put od starta do
            cilja koristeći vlastite senzore i algoritme - bez ikakve vanjske
            pomoći.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Micromouse Zagreb okuplja timove iz
            cijele Hvatske koji spajaju znanja iz elektronike, embeded sustava i algoritama navigacije. 
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {competitionStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <div
                  className="font-display text-2xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Maze Visual */}
        <div className="flex items-center justify-center">
          <MazeVisual />
        </div>
      </div>
    </SectionWrapper>
  )
}

function MazeVisual() {
  // grid math: offset=8, cell=36, centers = 26,62,98,134
  return (
    <div className="relative h-72 w-72 sm:h-80 sm:w-80">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-purple/20 via-neon-pink/10 to-neon-peach/20 blur-xl"
        aria-hidden="true"
      />

      {/* Maze grid */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-card/50 p-4">
        <svg viewBox="0 0 160 160" className="h-full w-full" aria-label="Maze pattern">
          {/* Outer wall */}
          <g stroke="hsl(260, 12%, 22%)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="152" height="152" rx="4" />
          </g>

          {/* Internal walls built as segments with gaps (so path can pass) */}
          <g stroke="hsl(260, 12%, 22%)" strokeWidth="3" fill="none" strokeLinecap="butt">
            {/* Vertical boundaries (x = 44, 80, 116) with gaps */}
            {/* x = 44 -> gap around center y = 62 (54 -> 70) */}
            <line x1="44" y1="8" x2="44" y2="54" />
            <line x1="44" y1="70" x2="44" y2="152" />

            {/* x = 80 -> gap around center y = 62 (54 -> 70) */}
            <line x1="80" y1="8" x2="80" y2="54" />
            <line x1="80" y1="70" x2="80" y2="152" />

            {/* x = 116 -> gap around center y = 98 (90 -> 106) */}
            <line x1="116" y1="8" x2="116" y2="90" />
            <line x1="116" y1="106" x2="116" y2="152" />

            {/* Horizontal boundaries (y = 44, 80, 116) with gaps */}
            {/* y = 44 -> gap around x = 26 (18 -> 34) */}
            <line x1="8" y1="44" x2="18" y2="44" />
            <line x1="34" y1="44" x2="152" y2="44" />

            {/* y = 80 -> gap around x = 98 (90 -> 106) */}
            <line x1="8" y1="80" x2="90" y2="80" />
            <line x1="106" y1="80" x2="152" y2="80" />

            {/* y = 116 -> gap around x = 134 (126 -> 142) */}
            <line x1="8" y1="116" x2="126" y2="116" />
            <line x1="142" y1="116" x2="152" y2="116" />
          </g>

          {/* Solution path (aligned to corridor centers: 26,62,98,134) */}
          <path
            d="M26 26 L26 62 L62 62 L98 62 L98 98 L134 98 L134 134"
            stroke="url(#path-grad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 4"
            opacity="0.95"
          />

          {/* Start marker */}
          <circle cx="26" cy="26" r="4" fill="#A64AF5" opacity="0.95" />

          {/* Mouse dot (end) */}
          <circle cx="134" cy="134" r="6" fill="#FF5E78">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="134" cy="134" r="10" fill="none" stroke="#FF5E78" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
          </circle>

          <defs>
            <linearGradient id="path-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#A64AF5" />
              <stop offset="0.5" stopColor="#FF5E78" />
              <stop offset="1" stopColor="#FF9F76" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

