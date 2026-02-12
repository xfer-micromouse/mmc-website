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
            Micromouse je natjecanje u kojem autonomni roboti samostalno
            rješavaju labirint. Robot mora pronaći najbrži put od starta do
            cilja koristeći vlastite senzore i algoritme - bez ikakve vanjske
            pomoći.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Natjecanje spaja znanja iz elektrotehnike, mehatronike, programiranja
            i umjetne inteligencije. Micromouse Croatia 2026 okuplja timove iz
            cijele regije u uzbudljivom danu brzine i preciznosti.
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
  return (
    <div className="relative h-72 w-72 sm:h-80 sm:w-80">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-purple/20 via-neon-pink/10 to-neon-peach/20 blur-xl"
        aria-hidden="true"
      />

      {/* Maze grid */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-card/50 p-4">
        <svg
          viewBox="0 0 160 160"
          className="h-full w-full"
          aria-label="Maze pattern"
        >
          {/* Maze walls */}
          <g stroke="hsl(260, 12%, 22%)" strokeWidth="2" fill="none">
            {/* Outer walls */}
            <rect x="4" y="4" width="152" height="152" rx="4" />
            {/* Inner maze */}
            <path d="M4 40h40v-36" />
            <path d="M40 40v40h40" />
            <path d="M80 40V4" />
            <path d="M80 80h40V40h36" />
            <path d="M120 80v40" />
            <path d="M80 80v36h-40" />
            <path d="M40 120v36" />
            <path d="M80 120h-4v36" />
            <path d="M120 120h36" />
            <path d="M4 80h36" />
            <path d="M120 120v36" />
          </g>

          {/* Solution path */}
          <path
            d="M20 20 L20 50 L60 50 L60 90 L100 90 L100 50 L140 50 L140 90 L140 130"
            stroke="url(#path-grad)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="6 4"
            opacity="0.5"
          />

          {/* Mouse dot */}
          <circle cx="140" cy="140" r="6" fill="#FF5E78">
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="140" cy="140" r="10" fill="none" stroke="#FF5E78" strokeWidth="1" opacity="0.3">
            <animate
              attributeName="r"
              values="8;14;8"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Start marker */}
          <circle cx="20" cy="20" r="4" fill="#A64AF5" opacity="0.8" />

          <defs>
            <linearGradient id="path-grad" x1="20" y1="20" x2="140" y2="130">
              <stop stopColor="#A64AF5" />
              <stop offset="0.5" stopColor="#FF5E78" />
              <stop offset="1" stopColor="#FF9F76" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
