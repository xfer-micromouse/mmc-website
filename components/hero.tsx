import { MazeSim } from "@/components/maze-sim"
import { RegisterButton } from "@/components/register-button"
import { EDITION_YEAR, SPONSOR_CONTACT } from "@/lib/config"
import { buttonStyles } from "@/lib/ui"

export function Hero() {
  return (
    <section
      id="start"
      className="pb-16 pl-10 pr-4 pt-24 md:px-12 lg:flex lg:min-h-[100dvh] lg:items-center lg:pb-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
        <div className="min-w-0">
          <p className="silkscreen text-muted">2. izdanje</p>
          <h1 className="mt-5 text-5xl font-bold leading-[0.95] tracking-tight text-foreground min-[420px]:text-6xl sm:text-7xl xl:text-8xl">
            Micromouse
            <br />
            Zagreb <span className="text-accent-soft">{EDITION_YEAR}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted leading-relaxed">Najbrži miš u labirintu pobjeđuje.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <RegisterButton />
            <a href={SPONSOR_CONTACT} className={buttonStyles.secondary}>
              Postani sponzor
            </a>
          </div>
          <p className="mt-6 flex items-center gap-2 font-mono text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_rgb(var(--signal))]" aria-hidden="true" />
            Tražimo sponzore za {EDITION_YEAR}
          </p>
        </div>

        <div>
          <MazeSim controls={false} />
          <p className="cursor-blink mt-3 font-mono text-xs text-muted">&gt; mouse.init() ... waiting for scroll</p>
        </div>
      </div>
    </section>
  )
}
