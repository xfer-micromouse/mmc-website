import type { Metadata } from "next"
import { Gallery } from "@/components/gallery"
import { Sponsors2026 } from "@/components/sponsors-board"
import { FIRST_EDITION_YEAR } from "@/lib/config"

export const metadata: Metadata = {
  title: `Arhiva ${FIRST_EDITION_YEAR} - Micromouse Zagreb`,
  description: `Prvo izdanje natjecanja Micromouse Zagreb, ${FIRST_EDITION_YEAR}.: fotografije i sponzori.`,
}

export default function Archive2026Page() {
  return (
    <div className="pb-16 pt-32 md:pt-40">
      <header className="mx-auto max-w-6xl px-4 md:px-12">
        <p className="silkscreen text-muted">v1.0 // {FIRST_EDITION_YEAR}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Micromouse Zagreb {FIRST_EDITION_YEAR}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
          Prvo izdanje natjecanja i naš prvi build: dokazali smo da se u Zagrebu mogu izgraditi miševi koji sami
          rješavaju labirint.
        </p>
      </header>

      <Gallery />

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-12">
        <h2 className="text-3xl font-semibold tracking-tight text-accent-soft md:text-4xl">Sponzori {FIRST_EDITION_YEAR}</h2>
        <p className="mt-4 text-muted">Hvala partnerima koji su omogućili prvo izdanje.</p>
        <div className="mt-10">
          <Sponsors2026 />
        </div>
      </section>
    </div>
  )
}
