"use client"

import { ArrowRight } from "lucide-react"

interface HeroProps {
  onRegisterClick: () => void
}

export function Hero({ onRegisterClick }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
      {/* Background glow orbs */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-neon-purple/20 blur-[120px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-neon-peach/20 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center">
        <h1 className="font-display text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
          <span className="gradient-text">MicroMouse</span>
        </h1>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-widest text-foreground sm:text-3xl md:text-4xl">
          ZAGREB {" "}
          <span className="text-neon-purple">2026</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground leading-relaxed">
          {"Najbrži miš u labirintu pobjeđuje."}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={onRegisterClick}
            className="group relative rounded-xl border border-neon-pink/50 px-8 py-3 font-display text-sm font-semibold tracking-wider text-foreground transition-all hover:border-neon-pink hover:shadow-[0_0_30px_rgba(255,94,120,0.3)]"
          >
            Prijavi Tim
          </button>
          <a
            href="#about"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Saznaj više
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
