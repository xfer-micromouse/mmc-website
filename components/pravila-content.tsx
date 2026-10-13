import { Grid3X3, Bot, Timer, Trophy, FileText, Download, type LucideIcon } from "lucide-react"
import { buttonStyles } from "@/lib/ui"
import { cn } from "@/lib/utils"

export function PravilaContent() {
  return (
    <div className="px-4 pb-24 pt-32 md:px-6 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tighter text-foreground text-balance md:text-5xl">
          Službena Pravila Micromouse Natjecanja
        </h1>

        <RuleSection icon={Grid3X3} title="1. Labirint" className="mt-16">
          <RuleList>
            <Rule label="Dimenzije:">
              Labirint se sastoji od mreže 16 x 16 kvadratnih polja.
            </Rule>
            <Rule label="Veličina polja:">
              Svako polje je kvadrat dimenzija 180 mm x 180 mm.
            </Rule>
            <Rule label="Zidovi:">
              Zidovi labirinta visoki su 50 mm i debeli 12 mm.
            </Rule>
            <Rule label="Boje:">
              Stranice zidova su bijele, vrh zidova je crven (radi lakšeg vizualnog prepoznavanja), a pod labirinta je crn.
            </Rule>
            <Note label="Napomena za natjecatelje:">
              Iako su boje standardizirane, uvjeti osvjetljenja u prostoriji mogu varirati. Roboti moraju biti otporni na promjene ambijentalnog svjetla.
            </Note>
            <Rule label="Startno polje:">
              Nalazi se u jednom od kutova labirinta. Tri zida okružuju startno polje (lijeva i stražnja strana su rubovi labirinta), a jedini izlaz vodi u labirint.
            </Rule>
            <Rule label="Cilj:">
              Cilj je kvadratna površina od 2 x 2 polja koja se nalazi u središtu labirinta.
            </Rule>
          </RuleList>
        </RuleSection>

        <RuleSection icon={Bot} title="2. Specifikacije Robota">
          <RuleList>
            <Rule label="Autonomija:">
              Robot mora biti potpuno autonoman. Nije dozvoljena upotreba daljinskih upravljača, vanjskih računala ili bilo kakve komunikacije s robotom tijekom vožnje u labirintu.
            </Rule>
            <Rule label="Veličina:">
              Robot mora maksimalno biti dimenzija 25 x 25 cm.
            </Rule>
            <Note label="Napomena:">
              Robot se ne smije odvajati ni od jednog dijela sebe tijekom kretanja kroz labirint.
            </Note>
            <Rule label="Kretanje:">
              Robot se mora kretati isključivo po podu labirinta.
            </Rule>
            <Note label="Zabranjeno je:">
              Preskakanje zidova, penjanje po zidovima, letenje ili oštećivanje labirinta.
            </Note>
            <Rule label="Izvor energije:">
              Robot mora imati vlastiti izvor napajanja (baterije). Motori s unutarnjim izgaranjem nisu dozvoljeni.
            </Rule>
            <Rule label="Sigurnost:">
              Robot ne smije ispuštati tekućine, plinove, niti koristiti ljepljive tvari na kotačima koje ostavljaju tragove u labirintu. Vakuumski ventilatori (suction fans) za povećanje trakcije su dozvoljeni.
            </Rule>
          </RuleList>
        </RuleSection>

        <RuleSection icon={Timer} title="3. Tijek Natjecanja">
          <RuleList>
            <Rule label="Vremensko ograničenje:">
              Svaki tim ima na raspolaganju ukupno 13 minuta za boravak u labirintu. Ovo se naziva &quot;vrijeme u areni&quot;.
            </Rule>
            <Rule label="Broj vožnji:">
              Unutar tog vremena, robot može odraditi neograničen broj vožnji (Runs).
            </Rule>
            <Rule label="Vrste vožnji:" nested>
              <li>
                <span className="font-medium text-foreground">Istraživanje (Exploration Run):</span>{" "}
                Robot mapira labirint kako bi pronašao cilj i izračunao najkraću putanju.
              </li>
              <li>
                <span className="font-medium text-foreground">Brza vožnja (Speed Run):</span>{" "}
                Nakon što pronađe cilj, robot se može vratiti na start i izvesti najbržu moguću vožnju poznatom putanjom.
              </li>
            </Rule>
            <Rule label="Interakcija s robotom:" nested>
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
            <Rule label="Startna procedura:">
              Prije svake vožnje, robot mora mirovati na startnom polju, a vožnja počinje izlaskom iz njega.
            </Rule>
          </RuleList>
        </RuleSection>

        <RuleSection icon={Trophy} title="4. Bodovanje i Penali">
          <RuleList>
            <Rule label="Komponente ocjenjivanja:" nested>
              <li>
                <span className="font-medium text-foreground">Vrijeme prolaska - 85%</span>
                <p>
                  Najbrže zabilježeno vrijeme. Bodovi se dodjeljuju proporcionalno na temelju brzine (npr. najbrži = 100%, ostali = postotak najbržeg vremena)*
                </p>
              </li>
              <li>
                <span className="font-medium text-foreground">Prezentacija - 15%</span>
                <p>
                  Jasnoća i organizacija prezentacije, kreativnost i inovativna rješenja. Dubina razumijevanja i kvaliteta rada demonstrirani na zadanim temama.
                </p>
              </li>
            </Rule>
            <Rule label="Mjerenje vremena:">
              Vrijeme se mjeri od trenutka kada robot napusti startno polje do trenutka kada cijelim gabaritom uđe u ciljno područje.
            </Rule>
            <Rule label="Dodirivanje robota:" nested>
              <li>
                Ako se robot zaglavi ili &quot;izgubi&quot;, natjecatelj ga može podići i vratiti na start.
              </li>
              <li>Vrijeme u areni se ne zaustavlja dok natjecatelj resetira robota.</li>
              <li>Prekinuta vožnja se ne boduje.</li>
            </Rule>
          </RuleList>
        </RuleSection>

        <RuleSection icon={FileText} title="Preuzmi Pravilnik Natjecanja">
          <p className="mt-4 text-muted leading-relaxed">
            Za detaljnije informacije i sve specifične uvjete natjecanja, preuzmite službeni PDF dokument s pravilima.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://docs.google.com/document/d/1-4x1sYGxnSvp-mOz02x_tmDTpkiNM__WcsjG2Sw7UHU/export?format=pdf"
              className={buttonStyles.primary}
              download="Pravilnik_MicroMouse_Zagreb.pdf"
            >
              <Download size={16} />
              Pravilnik (PDF)
            </a>
            <a
              href="https://docs.google.com/document/d/1_9D4XSdUI6c_gq3w7-RXWeAWdlFrlY8CkNVzqWzwu18/export?format=pdf"
              className={buttonStyles.secondary}
              download="Specifikacije_MicroMouse_Zagreb.pdf"
            >
              <Download size={16} />
              Specifikacije (PDF)
            </a>
          </div>
        </RuleSection>
      </div>
    </div>
  )
}

function RuleSection({
  icon: Icon,
  title,
  className = "mt-16",
  children,
}: {
  icon: LucideIcon
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn("border-t border-border pt-10", className)}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 shrink-0 text-accent-soft" aria-hidden="true" />
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function RuleList({ children }: { children: React.ReactNode }) {
  return <ul className="mt-6 space-y-4 pl-5 text-muted leading-relaxed">{children}</ul>
}

/** A bulleted rule. With `nested`, children are `<li>` items rendered as a sub-list. */
function Rule({
  label,
  nested = false,
  children,
}: {
  label: string
  nested?: boolean
  children: React.ReactNode
}) {
  return (
    <li className="relative before:absolute before:-left-5 before:top-[0.6rem] before:h-[5px] before:w-[5px] before:bg-accent">
      <span className="font-medium text-foreground">{label}</span>
      {nested ? (
        <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-border">{children}</ul>
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
    <li className="rounded-lg bg-surface p-4 text-sm">
      <span className="font-medium text-foreground">{label}</span> {children}
    </li>
  )
}
