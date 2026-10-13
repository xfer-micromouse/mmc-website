export const SITE_URL = "https://micromouse.xfer.hr"

/** The edition this site is for; Micromouse Zagreb 2026 was the first. */
export const EDITION_YEAR = 2027
export const FIRST_EDITION_YEAR = 2026

/**
 * Competition day for the current edition. Leave `date`/`startsAt` as null
 * until the date is set; the day schedule button stays hidden until then.
 */
export const competitionDay: {
  date: string | null
  /** Opening time (ISO with offset) */
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

/** Where "Postani sponzor" leads. */
export const SPONSOR_CONTACT = `mailto:micromouse@xfer.hr?subject=${encodeURIComponent(`Sponzorstvo Micromouse Zagreb ${EDITION_YEAR}`)}`

/**
 * Open sponsor places for the current edition, drawn as empty (DNP) chip
 * footprints. Put a sponsor's name in `name` when the place is taken.
 */
export const sponsorSlots: { tier: SponsorTier; name?: string; websiteLink?: string }[] = [
  { tier: "gold" },
  { tier: "silver" },
  { tier: "silver" },
  { tier: "community" },
  { tier: "community" },
]

/** Sponsors of the first edition, shown on /arhiva/2026. */
export const sponsors2026: { name: string; tier: SponsorTier; websiteLink: string }[] = [
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
  { channel: "PRIZE.POOL", value: "TBA", unit: "", label: "Nagradni fond" },
  { channel: "TIME.LIMIT", value: "13", unit: "min", label: "Vremenski limit" },
]

/** Home page sections in page order. The first JOURNEY_STOPS are unlocked by the mouse in the maze. */
export const homeSections = [
  { id: "about", designator: "U1", label: "Što je Micromouse" },
  { id: "brojke", designator: "U2", label: "Ključne brojke" },
  { id: "kako-radi", designator: "U3", label: "Kako radi" },
  { id: "timeline", designator: "U4", label: `Raspored ${EDITION_YEAR}` },
  { id: "sponsors", designator: "U5", label: `Sponzori ${EDITION_YEAR}` },
  { id: "galerija", designator: "U6", label: `Galerija ${FIRST_EDITION_YEAR}` },
  { id: "faq", designator: "U7", label: "FAQ" },
] as const

export const JOURNEY_STOPS = 5

export const faq = [
  {
    q: "Tko se može prijaviti?",
    a: "Studentski timovi do 4 člana. Robota gradite i programirate sami, od elektronike do algoritma.",
  },
  {
    q: "Trebam li već znati graditi robote?",
    a: "Ne. Prije natjecanja održavamo radionice i predavanja o dizajnu, elektronici i programiranju micromousa.",
  },
  {
    q: "Koliko košta izrada robota?",
    a: "Timovima koji na vrijeme predaju tehničku dokumentaciju financiramo izradu pločica i komponente do dogovorenog iznosa ili dajemo starter kit.",
  },
  {
    q: "Koja su pravila za robota?",
    a: "Robot mora biti potpuno autonoman i najviše 25 x 25 cm. Svaki tim ima 13 minuta u labirintu. Sve je u pravilniku.",
  },
  {
    q: "Kada su prijave?",
    a: `Datumi za ${EDITION_YEAR}. objavit ćemo uskoro. Pratite stranicu ili nam pišite na micromouse@xfer.hr.`,
  },
]

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
