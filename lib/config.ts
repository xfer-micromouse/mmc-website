export const SITE_URL = "https://micromouse.xfer.hr"

export const competitionDay = {
  date: "31. svibnja 2026.",
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
    iconType: "rocket" as const,
  },
  {
    title: "Početak radionica i predavanja",
    description:
      "Pet predavanja o različitim dijelovima dizajna i programiranja Micromousa kako bi olakšali proces i motivirali studente i sve prijavljene",
    date: "16. ožujka 2026.",
    iconType: "check" as const,
  },
  {
    title: "Rok za predaju tehničke dokumentacije za financiranje komponenti",
    description:
      "Za timove financiramo izradu tiskanih pločica i naručivanje komponenti do dogovorenog iznosa",
    date: "10. travnja 2026.",
    iconType: "clock" as const,
  },
  {
    title: "Mock natjecanje",
    description:
      "Održavanje testnog natjecanja na pravom labirintu",
    date: "svibanj 2026.",
    iconType: "clock" as const,
  },
  {
    title: "Dan natjecanja",
    description:
      "Na prostorima Sveučilišta Algebra održat će se natjecanje za sve prijavljene timove",
    date: competitionDay.date,
    iconType: "award" as const,
  },
]

// Tier styles and labels live in components/sponsors.tsx
export const sponsorsData = [
  {
    name: "DOK-ING",
    tier: "gold" as const,
    websiteLink: "https://dok-ing.hr/",
  },
  {
    name: "CoE Marble",
    tier: "silver" as const,
    websiteLink: "https://marble.eu/",
  },
  {
    name: "FER",
    tier: "community" as const,
    websiteLink: "https://www.fer.unizg.hr/",
  },
  {
    name: "Sveučilište Algebra Bernays",
    tier: "community" as const,
    websiteLink: "https://www.algebra.hr/",
  }
]

export const competitionStats = [
  {
    value: "16x16",
    label: "Veličina labirinta",
    color: "#FF9F76",
  },
  {
    value: "1000€",
    label: "Nagradni fond",
    color: "#FF5E78",
  },
  {
    value: "13min",
    label: "Vremenski limit",
    color: "#A64AF5",
  },
]
