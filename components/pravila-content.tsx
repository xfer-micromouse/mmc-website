"use client"

import { Grid3X3, Bot, Timer, Trophy } from "lucide-react"

export function PravilaContent() {
  return (
    <div className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            {"Službena Pravila Micromouse Natjecanja"}
          </h1>
        </div>

        {/* 1. Labirint */}
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-peach/10">
              <Grid3X3 className="h-5 w-5 text-neon-peach" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              1. Labirint
            </h2>
          </div>

          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <ul className="space-y-3 pl-5">
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-peach/60">
                <span className="font-semibold text-foreground">Dimenzije:</span>{" "}
                {"Labirint se sastoji od mreže 16 x 16 kvadratnih polja."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-peach/60">
                <span className="font-semibold text-foreground">{"Veličina polja:"}</span>{" "}
                {"Svako polje je kvadrat dimenzija 180 mm x 180 mm."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-peach/60">
                <span className="font-semibold text-foreground">Zidovi:</span>{" "}
                {"Zidovi labirinta visoki su 50 mm i debeli 12 mm."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-peach/60">
                <span className="font-semibold text-foreground">Boje:</span>{" "}
                {"Stranice zidova su bijele, vrh zidova je crven (radi lakšeg vizualnog prepoznavanja), a pod labirinta je crn."}
              </li>
              <li className="ml-4 rounded-lg border border-border bg-card/50 p-3 text-sm">
                <span className="font-semibold text-foreground">{"Napomena za natjecatelje:"}</span>{" "}
                {"Iako su boje standardizirane, uvjeti osvjetljenja u prostoriji mogu varirati. Roboti moraju biti otporni na promjene ambijentalnog svjetla."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-peach/60">
                <span className="font-semibold text-foreground">Startno polje:</span>{" "}
                {"Nalazi se u jednom od kutova labirinta (uobičajeno dolje-lijevo, koordinate 0,0). Tri zida okružuju startno polje, a jedini izlaz vodi u labirint."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-peach/60">
                <span className="font-semibold text-foreground">Cilj:</span>{" "}
                {"Cilj je kvadratna površina od 2 x 2 polja koja se nalazi u središtu labirinta. Ulazak u bilo koje od ta 4 polja smatra se završetkom vožnje."}
              </li>
            </ul>
          </div>
        </section>

        {/* 2. Specifikacije Robota */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-pink/10">
              <Bot className="h-5 w-5 text-neon-pink" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              2. Specifikacije Robota
            </h2>
          </div>

          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <ul className="space-y-3 pl-5">
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-pink/60">
                <span className="font-semibold text-foreground">Autonomija:</span>{" "}
                {"Robot mora biti potpuno autonoman. Nije dozvoljena upotreba daljinskih upravljača, vanjskih računala ili bilo kakve komunikacije s robotom tijekom vožnje u labirintu."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-pink/60">
                <span className="font-semibold text-foreground">{"Veličina:"}</span>{" "}
                {"Robot mora u potpunosti stati unutar startnog polja (180x180 mm)."}
              </li>
              <li className="ml-4 rounded-lg border border-border bg-card/50 p-3 text-sm">
                <span className="font-semibold text-foreground">Napomena:</span>{" "}
                {"Nakon izlaska iz starta, robot se smije geometrijski proširiti (npr. mehanizmi za stabilizaciju), ali ne smije preskakati zidove."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-pink/60">
                <span className="font-semibold text-foreground">Kretanje:</span>{" "}
                {"Robot se mora kretati isključivo po podu labirinta koristeći kotače ili sličan pogon."}
              </li>
              <li className="ml-4 rounded-lg border border-border bg-card/50 p-3 text-sm">
                <span className="font-semibold text-foreground">Zabranjeno je:</span>{" "}
                {"Preskakanje zidova, penjanje po zidovima, letenje ili oštećivanje labirinta."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-pink/60">
                <span className="font-semibold text-foreground">Izvor energije:</span>{" "}
                {"Robot mora imati vlastiti izvor napajanja (baterije). Motori s unutarnjim izgaranjem nisu dozvoljeni."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-pink/60">
                <span className="font-semibold text-foreground">Sigurnost:</span>{" "}
                {"Robot ne smije ispuštati tekućine, plinove, niti koristiti ljepljive tvari na kotačima koje ostavljaju tragove u labirintu. Vakuumski ventilatori (suction fans) za povećanje trakcije su dozvoljeni."}
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Tijek Natjecanja */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-purple/10">
              <Timer className="h-5 w-5 text-neon-purple" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              3. Tijek Natjecanja
            </h2>
          </div>

          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <ul className="space-y-3 pl-5">
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-purple/60">
                <span className="font-semibold text-foreground">{"Vremensko ograničenje:"}</span>{" "}
                {"Svaki tim ima na raspolaganju ukupno 7 do 10 minuta (ovisno o broju prijavljenih timova) za boravak u labirintu. Ovo se naziva \"vrijeme u areni\"."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-purple/60">
                <span className="font-semibold text-foreground">{"Broj vožnji:"}</span>{" "}
                {"Unutar tog vremena, robot može odraditi neograničen broj vožnji (Run)."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-purple/60">
                <span className="font-semibold text-foreground">{"Vrste vožnji:"}</span>
                <ul className="mt-2 space-y-2 pl-4">
                  <li>
                    <span className="font-medium text-foreground">{"Istraživanje (Exploration Run):"}</span>{" "}
                    {"Robot mapira labirint kako bi pronašao cilj i izračunao najkraću putanju."}
                  </li>
                  <li>
                    <span className="font-medium text-foreground">{"Brza vožnja (Speed Run):"}</span>{" "}
                    {"Nakon što pronađe cilj, robot se može vratiti na start i izvesti najbržu moguću vožnju poznatom putanjom."}
                  </li>
                </ul>
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-purple/60">
                <span className="font-semibold text-foreground">Interakcija s robotom:</span>
                <ul className="mt-2 space-y-2 pl-4">
                  <li>
                    {"Jednom kada labirint bude otkriven (neposredno prije starta), zabranjeno je spajanje robota na računalo radi izmjene koda."}
                  </li>
                  <li>
                    {"Dozvoljeno je mijenjanje parametara (npr. odabir algoritma, kalibracija senzora) isključivo putem fizičkih sučelja na samom robotu (tipke, prekidači, potenciometri, display)."}
                  </li>
                  <li>
                    {"Natjecatelj smije dodirnuti robota samo kako bi ga stavio na start ili ga uklonio iz labirinta ako zapne."}
                  </li>
                </ul>
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-purple/60">
                <span className="font-semibold text-foreground">Startna procedura:</span>{" "}
                {"Prije svake vožnje, robot mora mirovati na startnom polju. Vožnja počinje aktivacijom tipke/senzora na robotu."}
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Bodovanje i Penali */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-peach/10">
              <Trophy className="h-5 w-5 text-neon-peach" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              4. Bodovanje i Penali
            </h2>
          </div>

          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <ul className="space-y-3 pl-5">
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-peach/60">
                <span className="font-semibold text-foreground">Cilj natjecanja:</span>{" "}
                {"Pobjednik je robot koji ostvari najbrže vrijeme vožnje od starta do cilja."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-peach/60">
                <span className="font-semibold text-foreground">Mjerenje vremena:</span>{" "}
                {"Vrijeme se mjeri od trenutka kada robot napusti startno polje do trenutka kada cijelim gabaritom uđe u ciljno područje."}
              </li>
              <li className="relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-peach/60">
                <span className="font-semibold text-foreground">Dodirivanje robota:</span>
                <ul className="mt-2 space-y-2 pl-4">
                  <li>
                    {"Ako se robot zaglavi ili \"izgubi\", natjecatelj ga može podići i vratiti na start."}
                  </li>
                  <li>
                    {"Vrijeme u areni (ukupnih 7-10 min) se ne zaustavlja dok natjecatelj resetira robota."}
                  </li>
                  <li>
                    {"Prekinuta vožnja se ne boduje."}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
