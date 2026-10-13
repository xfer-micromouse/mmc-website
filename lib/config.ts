export const SITE_URL = "https://micromouse.xfer.hr"

export const competitionDay = {
  date: "31. svibnja 2026.",
  /** Opening time, used by the hero countdown */
  startsAt: "2026-05-31T14:00:00+02:00",
  location: {
    name: "Algebra sveučilište",
    mapUrl: "https://maps.app.goo.gl/PrnWBgGW7KkRxycw7",
  },
  schedule: [
    { time: "14:00", label: "Otvorenje" },
    { time: "14:30", label: "Priprema i networking" },
    { time: "15:30", label: "Početak natjecanja" },
    { time: "17:15", label: "Prezentacije" },
    { time: "17:45", label: "Proglašenje" },
  ],
}

export const timelineData = [
  {
    title: "Otvaranje prijava",
    description:
      "Prijavite svoj tim i robota za natjecanje. Maksimalno 4 člana po timu.",
    date: "20. veljače 2026.",
    /** Phase starts on this day (Europe/Zagreb) */
    startsOn: "2026-02-20",
  },
  {
    title: "Početak radionica i predavanja",
    description:
      "Pet predavanja o različitim dijelovima dizajna i programiranja Micromousa kako bi olakšali proces i motivirali studente i sve prijavljene",
    date: "16. ožujka 2026.",
    startsOn: "2026-03-16",
  },
  {
    title: "Rok za predaju tehničke dokumentacije za financiranje komponenti",
    description:
      "Za timove financiramo izradu tiskanih pločica i naručivanje komponenti do dogovorenog iznosa",
    date: "10. travnja 2026.",
    startsOn: "2026-04-10",
  },
  {
    title: "Mock natjecanje",
    description:
      "Održavanje testnog natjecanja na pravom labirintu",
    date: "svibanj 2026.",
    startsOn: "2026-05-01",
  },
  {
    title: "Dan natjecanja",
    description:
      "Na prostorima Sveučilišta Algebra održat će se natjecanje za sve prijavljene timove",
    date: competitionDay.date,
    startsOn: "2026-05-31",
  },
]

export type SponsorTier = "gold" | "silver" | "bronze" | "community"

// Tier labels and ordering live in components/sponsors.tsx
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
  { id: "timeline", designator: "U4", label: "Raspored 2026" },
  { id: "galerija", designator: "U5", label: "Galerija 2025" },
  { id: "brojke", designator: "U6", label: "Ključne brojke" },
  { id: "sponsors", designator: "U7", label: "Sponzori" },
  { id: "prijava", designator: "U8", label: "Cilj" },
] as const

export type HomeSectionId = (typeof homeSections)[number]["id"]

/** Placeholder photos until the real 2025 gallery is added (swap src for /gallery/*.jpg). */
export const gallery2025 = [
  { camera: "CAM_01", tag: "Radionica", caption: "Prvi spoj. Dim nije izašao.", src: "https://picsum.photos/seed/mmz-radionica/1200/900?grayscale" },
  { camera: "CAM_02", tag: "Labirint", caption: "256 polja, nula prečaca.", src: "https://picsum.photos/seed/mmz-labirint/1200/900?grayscale" },
  { camera: "CAM_03", tag: "Pit stop", caption: "Kalibracija senzora, pokušaj broj sedam.", src: "https://picsum.photos/seed/mmz-pitstop/1200/900?grayscale" },
  { camera: "CAM_04", tag: "Startno polje", caption: "Miš čeka. Tim ne diše.", src: "https://picsum.photos/seed/mmz-start/1200/900?grayscale" },
  { camera: "CAM_05", tag: "Speed run", caption: "Mutno namjerno. Bio je brz.", src: "https://picsum.photos/seed/mmz-speedrun/1200/900?grayscale" },
  { camera: "CAM_06", tag: "Proglašenje", caption: "Svi su pobijedili. Neki malo više.", src: "https://picsum.photos/seed/mmz-proglasenje/1200/900?grayscale" },
]
