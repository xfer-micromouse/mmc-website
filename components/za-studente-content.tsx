import { CalendarClock, Megaphone } from "lucide-react"

const documentationItems = [
  {
    title: "Električna shema",
    description: "Jasan prikaz svih spojeva, mikrokontrolera, senzora i napajanja.",
  },
  {
    title: "Dizajn PCB-a",
    description: "Završen dizajn spreman za proizvodnju (Gerber datoteke).",
  },
  {
    title: "Popis komponenti (BOM)",
    description: "Tablica sa svim potrebnim dijelovima (Bill of Materials).",
  },
]

const suppliers = [
  {
    title: "Elektroničke komponente",
    description: "Mouser Electronics (ili DigiKey/TME po dogovoru).",
  },
  {
    title: "Izrada PCB-a",
    description: "JLCPCB ili PCBWay.",
  },
]

export function ZaStudenteContent() {
  return (
    <div className="px-4 pb-24 pt-32 md:px-6 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tighter text-foreground text-balance md:text-5xl">
          Financiranje i Podrška za Studente
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed">
          Želite sudjelovati na Micromouse natjecanju, ali brinete o troškovima izrade robota? Organizacijski tim osigurao je financijsku podršku za studentske timove koji pokažu ozbiljnost i tehničku spremnost.
        </p>

        <Section title="Kako do financiranja?" className="mt-16">
          <p className="mt-4 text-muted leading-relaxed">
            Svim timovima koji do određenog roka predaju potpunu tehničku dokumentaciju, nudimo pokrivanje troškova izrade hardvera (komponente i PCB) u iznosu do 50 € * ili mogu odabrati starter kit sa svim potrebnim komponentama za osnovnu verziju robota.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            Ovdje ćete moći pristupiti formi gdje ćete odabrati želite li koristiti starter kit, prijaviti se za financijsku podršku s naše strane ili ništa od navedenog.
          </p>
        </Section>

        <Section title="Uvjeti i Rokovi">
          <p className="mt-4 text-muted leading-relaxed">
            Da biste ostvarili pravo na financiranje, vaš tim mora predati Tehničku Dokumentaciju najkasnije do:
          </p>
          <div className="mt-6 flex items-start gap-4 rounded-lg border border-accent/40 p-6">
            <CalendarClock className="mt-1 h-6 w-6 shrink-0 text-accent-soft" aria-hidden="true" />
            <div>
              <p className="font-mono text-2xl font-medium tracking-tight text-foreground">
                10. travnja 2026.
              </p>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Dokumentacija predana nakon ovog roka neće biti razmatrana za financiranje, iako tim i dalje može sudjelovati u natjecanju o vlastitom trošku.
              </p>
            </div>
          </div>
        </Section>

        <Section title='Što čini "Tehničku Dokumentaciju"?'>
          <p className="mt-4 text-muted leading-relaxed">
            Vaša prijava mora sadržavati sljedeće tri stavke, izrađene u nekom od standardnih EDA alata (npr. KiCad, Altium Designer, Eagle):
          </p>
          <ol className="mt-6 divide-y divide-border border-y border-border">
            {documentationItems.map((item, index) => (
              <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-2 py-5">
                <span className="font-mono text-sm text-accent-soft tabular-nums">{index + 1}.</span>
                <div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Gdje birati komponente?">
          <p className="mt-4 text-muted leading-relaxed">
            Kako bismo olakšali proces nabave, molimo vas da komponente i izradu pločica planirate prema sljedećim dobavljačima:
          </p>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            {suppliers.map((supplier) => (
              <div key={supplier.title} className="rounded-lg bg-surface p-5">
                <dt className="text-sm text-muted">{supplier.title}</dt>
                <dd className="mt-1 font-medium text-foreground">{supplier.description}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Što slijedi?">
          <p className="mt-4 text-muted leading-relaxed">
            Nakon predaje dokumentacije, organizacijski tim pregledat će vaše dizajne kako bismo osigurali da su funkcionalni prije narudžbe.
          </p>
          <div className="mt-6 flex items-start gap-4 rounded-lg bg-surface p-5">
            <Megaphone className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" aria-hidden="true" />
            <p className="text-sm text-muted leading-relaxed">
              <span className="font-medium text-foreground">Stay Tuned:</span>{" "}
              Detaljne upute o načinu predaje dokumentacije i točnim iznosima budžeta objavit ćemo uskoro na ovoj stranici i putem naših društvenih mreža. Krenite s dizajniranjem odmah!
            </p>
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({
  title,
  className = "mt-14",
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`border-t border-border pt-10 ${className}`}>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      {children}
    </section>
  )
}
