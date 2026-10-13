import { ArrowDown } from "lucide-react"
import { Countdown } from "@/components/countdown"
import { MazeSim } from "@/components/maze-sim"
import { RegisterButton } from "@/components/register-button"
import { competitionDay } from "@/lib/config"
import { buttonStyles } from "@/lib/ui"

export function Hero() {
  return (
    <section
      id="start"
      className="pb-16 pl-10 pr-4 pt-24 md:px-12 lg:flex lg:min-h-[100dvh] lg:items-center lg:pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div>
          <p className="silkscreen text-muted">
            {competitionDay.date} // {competitionDay.location.name}
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
            Micromouse
            <br />
            Zagreb <span className="text-accent-soft">2026</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted leading-relaxed">
            Najbrži miš u labirintu pobjeđuje.
          </p>
          <div className="mt-8">
            <Countdown />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <RegisterButton />
            <a href="#about" className={buttonStyles.secondary}>
              Saznaj više
              <ArrowDown size={16} />
            </a>
          </div>
        </div>

        <MazeSim />
      </div>
    </section>
  )
}
