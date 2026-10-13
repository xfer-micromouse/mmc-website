export const SITE_URL = "https://micromouse.xfer.hr"

/** The edition this site is for; Micromouse Zagreb 2026 was the first. */
export const EDITION_YEAR = 2027
export const FIRST_EDITION_YEAR = 2026

/**
 * Competition day for the current edition. Leave `date`/`startsAt` as null
 * until the date is set: the hero then says the date is coming and hides
 * the countdown; the day schedule button stays hidden too.
 */
export const competitionDay: {
  date: string | null
  /** Opening time (ISO with offset), used by the hero countdown */
  startsAt: string | null
  location: { name: string; mapUrl: string } | null
  schedule: { time: string; label: string }[]
} = {
  date: null,
  startsAt: null,
  location: null,
  schedule: [],
}

/**
 * Key dates for the current edition. `startsOn` (YYYY-MM-DD) drives the
 * "current phase" highlight; null shows the phase with a "uskoro" date.
 */
export const timelineData: { title: string; description: string; date: string | null; startsOn: string | null }[] = [
  {
    title: "Otvaranje prijava",
    description: "Prijavite svoj tim i robota za natjecanje. Maksimalno 4 člana po timu.",
    date: null,
    startsOn: null,
  },
  {
    title: "Početak radionica i predavanja",
    description:
      "Predavanja o različitim dijelovima dizajna i programiranja Micromousa kako bi olakšali proces i motivirali studente i sve prijavljene.",
    date: null,
    startsOn: null,
  },
  {
    title: "Rok za predaju tehničke dokumentacije za financiranje komponenti",
    description:
      "Za timove financiramo izradu tiskanih pločica i naručivanje komponenti do dogovorenog iznosa.",
    date: null,
    startsOn: null,
  },
  {
    title: "Mock natjecanje",
    description: "Održavanje testnog natjecanja na pravom labirintu.",
    date: null,
    startsOn: null,
  },
  {
    title: "Dan natjecanja",
    description: "Natjecanje za sve prijavljene timove.",
    date: competitionDay.date,
    startsOn: null,
  },
]

/** Sponsor tiers from the most to the least prominent; chip size on the home page follows this order. */
export const sponsorTiers = [
  { tier: "gold", label: "Zlatni sponzor" },
  { tier: "silver", label: "Srebrni sponzor" },
  { tier: "bronze", label: "Brončani sponzor" },
  { tier: "community", label: "Akademski sponzor" },
] as const

export type SponsorTier = (typeof sponsorTiers)[number]["tier"]

/**
 * Add or remove sponsors here. The home page board groups them by tier
 * (empty tiers are skipped) and wires every chip automatically.
 */
export const sponsorsData: { name: string; tier: SponsorTier; websiteLink: string }[] = [
  {
    name: "DOK-ING",
    tier: "gold",
    websiteLink: "https://dok-ing.hr/",
  },
  {
    name: "CoE Marble",
    tier: "silver",
    websiteLink: "https://marble.eu/",
  },
  {
    name: "FER",
    tier: "community",
    websiteLink: "https://www.fer.unizg.hr/",
  },
  {
    name: "Sveučilište Algebra Bernays",
    tier: "community",
    websiteLink: "https://www.algebra.hr/",
  },
]

/** Shown as instrument readouts on the home page */
export const competitionStats = [
  { channel: "MAZE.SIZE", value: "16x16", unit: "polja", label: "Veličina labirinta" },
  { channel: "PRIZE.POOL", value: "1000", unit: "€", label: "Nagradni fond" },
  { channel: "TIME.LIMIT", value: "13", unit: "min", label: "Vremenski limit" },
]

/** Home page sections in scroll order; drives the PCB trace, mini-map and labels. */
export const homeSections = [
  { id: "about", designator: "U1", label: "Što je Micromouse" },
  { id: "v1", designator: "U2", label: "Prvo izdanje" },
  { id: "kako-radi", designator: "U3", label: "Kako radi" },
  { id: "timeline", designator: "U4", label: `Raspored ${EDITION_YEAR}` },
  { id: "galerija", designator: "U5", label: `Galerija ${FIRST_EDITION_YEAR}` },
  { id: "brojke", designator: "U6", label: "Ključne brojke" },
  { id: "sponsors", designator: "U7", label: "Sponzori" },
  { id: "prijava", designator: "U8", label: "Cilj" },
] as const

export type HomeSectionId = (typeof homeSections)[number]["id"]

/** First-edition (2026) photos. Placeholders until the real ones are added (swap src for /gallery/*.jpg). */
export const firstEditionGallery = [
  { camera: "CAM_01", tag: "Radionica", caption: "Prvi spoj. Dim nije izašao.", src: "https://picsum.photos/seed/mmz-radionica/1200/900?grayscale" },
  { camera: "CAM_02", tag: "Labirint", caption: "256 polja, nula prečaca.", src: "https://picsum.photos/seed/mmz-labirint/1200/900?grayscale" },
  { camera: "CAM_03", tag: "Pit stop", caption: "Kalibracija senzora, pokušaj broj sedam.", src: "https://picsum.photos/seed/mmz-pitstop/1200/900?grayscale" },
  { camera: "CAM_04", tag: "Startno polje", caption: "Miš čeka. Tim ne diše.", src: "https://picsum.photos/seed/mmz-start/1200/900?grayscale" },
  { camera: "CAM_05", tag: "Speed run", caption: "Mutno namjerno. Bio je brz.", src: "https://picsum.photos/seed/mmz-speedrun/1200/900?grayscale" },
  { camera: "CAM_06", tag: "Proglašenje", caption: "Svi su pobijedili. Neki malo više.", src: "https://picsum.photos/seed/mmz-proglasenje/1200/900?grayscale" },
]
