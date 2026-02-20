"use client"

import {
  FileText,
  CircuitBoard,
  ListChecks,
  ShoppingCart,
  CalendarClock,
  Megaphone,
} from "lucide-react"

export function ZaStudenteContent() {
  return (
    <div className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Financiranje i Podrška za Studente
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {"Želite sudjelovati na Micromouse natjecanju, ali brinete o troškovima izrade robota? Organizacijski tim osigurao je financijsku podršku za studentske timove koji pokažu ozbiljnost i tehničku spremnost."}
          </p>
        </div>

        {/* Kako do financiranja */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Kako do financiranja?
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {"Svim timovima koji do određenog roka predaju potpunu tehničku dokumentaciju, nudimo pokrivanje troškova izrade hardvera (komponente i PCB) u iznosu do 50 € * ili mogu odabrati starter kit sa svim potrebnim komponentama za oznovnu verziju robota."}
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {"Ovdije ćete moći pristupiti formi gdje ćete odabrati želite li koristiti starter kit, prijaviti se za financijsku podršku s naše strane ili ništa od navedenog."}
          </p>
        </section>

        {/* Uvjeti i Rokovi */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Uvjeti i Rokovi
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {"Da biste ostvarili pravo na financiranje, vaš tim mora predati Tehničku Dokumentaciju najkasnije do:"}
          </p>
          <div className="mt-6 flex items-center gap-4 rounded-xl border border-neon-pink/30 bg-neon-pink/5 p-6">
            <CalendarClock className="h-8 w-8 shrink-0 text-neon-pink" />
            <div>
              <p className="font-display text-xl font-bold text-foreground">
                10. travnja 2026.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {"Dokumentacija predana nakon ovog roka neće biti razmatrana za financiranje, iako tim i dalje može sudjelovati u natjecanju o vlastitom trošku."}
              </p>
            </div>
          </div>
        </section>

        {/* Tehnička dokumentacija */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {"Što čini \"Tehničku Dokumentaciju\"?"}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {"Vaša prijava mora sadržavati sljedeće tri stavke, izrađene u nekom od standardnih EDA alata (npr. KiCad, Altium Designer, Eagle):"}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <FileText className="h-8 w-8 text-neon-peach" />
              <h3 className="mt-4 font-display text-sm font-bold tracking-wide text-foreground">
                {"Električna shema"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {"Jasan prikaz svih spojeva, mikrokontrolera, senzora i napajanja."}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <CircuitBoard className="h-8 w-8 text-neon-pink" />
              <h3 className="mt-4 font-display text-sm font-bold tracking-wide text-foreground">
                {"Dizajn PCB-a"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {"Završen dizajn spreman za proizvodnju (Gerber datoteke)."}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <ListChecks className="h-8 w-8 text-neon-purple" />
              <h3 className="mt-4 font-display text-sm font-bold tracking-wide text-foreground">
                {"Popis komponenti (BOM)"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {"Tablica sa svim potrebnim dijelovima (Bill of Materials)."}
              </p>
            </div>
          </div>
        </section>

        {/* Dobavljači */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Gdje birati komponente?
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {"Kako bismo olakšali proces nabave, molimo vas da komponente i izradu pločica planirate prema sljedećim dobavljačima:"}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
              <ShoppingCart className="h-6 w-6 shrink-0 text-neon-peach" />
              <div>
                <h3 className="font-display text-sm font-bold tracking-wide text-foreground">
                  {"Elektroničke komponente"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {"Mouser Electronics (ili DigiKey/TME po dogovoru)."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
              <CircuitBoard className="h-6 w-6 shrink-0 text-neon-pink" />
              <div>
                <h3 className="font-display text-sm font-bold tracking-wide text-foreground">
                  {"Izrada PCB-a"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {"JLCPCB ili PCBWay."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Što slijedi */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {"Što slijedi?"}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {"Nakon predaje dokumentacije, organizacijski tim pregledat će vaše dizajne kako bismo osigurali da su funkcionalni prije narudžbe."}
          </p>

          <div className="mt-6 flex items-start gap-4 rounded-xl border border-neon-purple/30 bg-neon-purple/5 p-6">
            <Megaphone className="h-6 w-6 shrink-0 text-neon-purple" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Stay Tuned:</span>{" "}
              {"Detaljne upute o načinu predaje dokumentacije i točnim iznosima budžeta objavit ćemo uskoro na ovoj stranici i putem naših društvenih mreža. Krenite s dizajniranjem odmah!"}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
