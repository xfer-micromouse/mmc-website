import { Grid3X3, Bot, Timer, Trophy, FileText, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const accentStyles = {
  peach: {
    iconBg: "bg-neon-peach/10",
    icon: "text-neon-peach",
    dot: "before:bg-neon-peach/60",
  },
  pink: {
    iconBg: "bg-neon-pink/10",
    icon: "text-neon-pink",
    dot: "before:bg-neon-pink/60",
  },
  purple: {
    iconBg: "bg-neon-purple/10",
    icon: "text-neon-purple",
    dot: "before:bg-neon-purple/60",
  },
} as const

type Accent = keyof typeof accentStyles

export function PravilaContent() {
  return (
    <div className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Službena Pravila Micromouse Natjecanja
          </h1>
        </div>

        <RuleSection icon={Grid3X3} accent="peach" title="1. Labirint" className="mt-16">
          <RuleList>
            <Rule accent="peach" label="Dimenzije:">
              Labirint se sastoji od mreže 16 x 16 kvadratnih polja.
            </Rule>
            <Rule accent="peach" label="Veličina polja:">
              Svako polje je kvadrat dimenzija 180 mm x 180 mm.
            </Rule>
            <Rule accent="peach" label="Zidovi:">
              Zidovi labirinta visoki su 50 mm i debeli 12 mm.
            </Rule>
            <Rule accent="peach" label="Boje:">
              Stranice zidova su bijele, vrh zidova je crven (radi lakšeg vizualnog prepoznavanja), a pod labirinta je crn.
            </Rule>
            <Note label="Napomena za natjecatelje:">
              Iako su boje standardizirane, uvjeti osvjetljenja u prostoriji mogu varirati. Roboti moraju biti otporni na promjene ambijentalnog svjetla.
            </Note>
            <Rule accent="peach" label="Startno polje:">
              Nalazi se u jednom od kutova labirinta. Tri zida okružuju startno polje (lijeva i stražnja strana su rubovi labirinta), a jedini izlaz vodi u labirint.
            </Rule>
            <Rule accent="peach" label="Cilj:">
              Cilj je kvadratna površina od 2 x 2 polja koja se nalazi u središtu labirinta.
            </Rule>
          </RuleList>
        </RuleSection>

        <RuleSection icon={Bot} accent="pink" title="2. Specifikacije Robota">
          <RuleList>
            <Rule accent="pink" label="Autonomija:">
              Robot mora biti potpuno autonoman. Nije dozvoljena upotreba daljinskih upravljača, vanjskih računala ili bilo kakve komunikacije s robotom tijekom vožnje u labirintu.
            </Rule>
            <Rule accent="pink" label="Veličina:">
              Robot mora maksimalno biti dimenzija 25 x 25 cm.
            </Rule>
            <Note label="Napomena:">
              Robot se ne smije odvajati ni od jednog dijela sebe tijekom kretanja kroz labirint.
            </Note>
            <Rule accent="pink" label="Kretanje:">
              Robot se mora kretati isključivo po podu labirinta.
            </Rule>
            <Note label="Zabranjeno je:">
              Preskakanje zidova, penjanje po zidovima, letenje ili oštećivanje labirinta.
            </Note>
            <Rule accent="pink" label="Izvor energije:">
              Robot mora imati vlastiti izvor napajanja (baterije). Motori s unutarnjim izgaranjem nisu dozvoljeni.
            </Rule>
            <Rule accent="pink" label="Sigurnost:">
              Robot ne smije ispuštati tekućine, plinove, niti koristiti ljepljive tvari na kotačima koje ostavljaju tragove u labirintu. Vakuumski ventilatori (suction fans) za povećanje trakcije su dozvoljeni.
            </Rule>
          </RuleList>
        </RuleSection>

        <RuleSection icon={Timer} accent="purple" title="3. Tijek Natjecanja">
          <RuleList>
            <Rule accent="purple" label="Vremensko ograničenje:">
              Svaki tim ima na raspolaganju ukupno 13 minuta za boravak u labirintu. Ovo se naziva &quot;vrijeme u areni&quot;.
            </Rule>
            <Rule accent="purple" label="Broj vožnji:">
              Unutar tog vremena, robot može odraditi neograničen broj vožnji (Runs).
            </Rule>
            <Rule accent="purple" label="Vrste vožnji:" nested>
              <li>
                <span className="font-medium text-foreground">Istraživanje (Exploration Run):</span>{" "}
                Robot mapira labirint kako bi pronašao cilj i izračunao najkraću putanju.
              </li>
              <li>
                <span className="font-medium text-foreground">Brza vožnja (Speed Run):</span>{" "}
                Nakon što pronađe cilj, robot se može vratiti na start i izvesti najbržu moguću vožnju poznatom putanjom.
              </li>
            </Rule>
            <Rule accent="purple" label="Interakcija s robotom:" nested>
              <li>
                Jednom kada labirint bude otkriven (neposredno prije starta), zabranjeno je spajanje robota na računalo radi izmjene koda.
              </li>
              <li>
                Dozvoljeno je mijenjanje parametara (npr. odabir algoritma, kalibracija senzora) isključivo putem fizičkih sučelja na samom robotu (npr. tipke, prekidači).
              </li>
              <li>
                Svako diranje robota izvan startnog polja je zabranjeno. U slučaju da robot zapne, natjecatelj ga smije ukloniti iz labirinta uz penaliziranje iduće vožnje.
              </li>
              <li>
                Robot ne smije mijenjati težinu (npr. korištenje lakših baterija, micanje i mijenjanje senzora).
              </li>
            </Rule>
            <Rule accent="purple" label="Startna procedura:">
              Prije svake vožnje, robot mora mirovati na startnom polju, a vožnja počinje izlaskom iz njega.
            </Rule>
          </RuleList>
        </RuleSection>

        <RuleSection icon={Trophy} accent="peach" title="4. Bodovanje i Penali">
          <RuleList>
            <Rule accent="peach" label="Komponente ocjenjivanja:" nested>
              <li>
                <span className="font-semibold text-foreground">Vrijeme prolaska - 85%</span>
                <p>
                  Najbrže zabilježeno vrijeme. Bodovi se dodjeljuju proporcionalno na temelju brzine (npr. najbrži = 100%, ostali = postotak najbržeg vremena)*
                </p>
              </li>
              <li>
                <span className="font-semibold text-foreground">Prezentacija - 15%</span>
                <p>
                  Jasnoća i organizacija prezentacije, kreativnost i inovativna rješenja. Dubina razumijevanja i kvaliteta rada demonstrirani na zadanim temama.
                </p>
              </li>
            </Rule>
            <Rule accent="peach" label="Mjerenje vremena:">
              Vrijeme se mjeri od trenutka kada robot napusti startno polje do trenutka kada cijelim gabaritom uđe u ciljno područje.
            </Rule>
            <Rule accent="peach" label="Dodirivanje robota:" nested>
              <li>
                Ako se robot zaglavi ili &quot;izgubi&quot;, natjecatelj ga može podići i vratiti na start.
              </li>
              <li>Vrijeme u areni se ne zaustavlja dok natjecatelj resetira robota.</li>
              <li>Prekinuta vožnja se ne boduje.</li>
            </Rule>
          </RuleList>
        </RuleSection>

        <RuleSection icon={FileText} accent="purple" title="Preuzmi Pravilnik Natjecanja">
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Za detaljnije informacije i sve specifične uvjete natjecanja, preuzmite službeni PDF dokument s pravilima.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="https://docs.google.com/document/d/1-4x1sYGxnSvp-mOz02x_tmDTpkiNM__WcsjG2Sw7UHU/export?format=pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-neon-purple/10 px-6 py-3 text-base font-medium text-neon-purple hover:bg-neon-purple/20 transition-colors"
              download="Pravilnik_MicroMouse_Zagreb.pdf"
            >
              Preuzmi Pravilnik Natjecanja (PDF)
            </a>
            <a
              href="https://docs.google.com/document/d/1_9D4XSdUI6c_gq3w7-RXWeAWdlFrlY8CkNVzqWzwu18/export?format=pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-neon-peach/10 px-6 py-3 text-base font-medium text-neon-peach hover:bg-neon-peach/20 transition-colors"
              download="Specifikacije_MicroMouse_Zagreb.pdf"
            >
              Preuzmi Specifikacije Natjecanja (PDF)
            </a>
          </div>
        </RuleSection>
      </div>
    </div>
  )
}

function RuleSection({
  icon: Icon,
  accent,
  title,
  className = "mt-12",
  children,
}: {
  icon: LucideIcon
  accent: Accent
  title: string
  className?: string
  children: React.ReactNode
}) {
  const styles = accentStyles[accent]

  return (
    <section className={className}>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            styles.iconBg
          )}
        >
          <Icon className={cn("h-5 w-5", styles.icon)} />
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

function RuleList({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
      <ul className="space-y-3 pl-5">{children}</ul>
    </div>
  )
}

/** A bulleted rule. With `nested`, children are `<li>` items rendered as a sub-list. */
function Rule({
  accent,
  label,
  nested = false,
  children,
}: {
  accent: Accent
  label: string
  nested?: boolean
  children: React.ReactNode
}) {
  return (
    <li
      className={cn(
        "relative before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full",
        accentStyles[accent].dot
      )}
    >
      <span className="font-semibold text-foreground">{label}</span>
      {nested ? (
        <ul className="mt-2 space-y-2 pl-4">{children}</ul>
      ) : (
        <>
          {" "}
          {children}
        </>
      )}
    </li>
  )
}

function Note({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="ml-4 rounded-lg border border-border bg-card/50 p-3 text-sm">
      <span className="font-semibold text-foreground">{label}</span> {children}
    </li>
  )
}
